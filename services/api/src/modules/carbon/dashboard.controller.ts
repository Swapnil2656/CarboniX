import { Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { logger } from '../../lib/logger';
import { getCarbonRating } from './carbon.engine';

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    
    // 1. Get all calculations for userId
    const allCalculations = await prisma.calculation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    // 2. Compute total CO2 this month vs last month
    let totalCo2ThisMonth = 0;
    let totalCo2LastMonth = 0;
    let calculationsThisMonth = 0;
    let totalCo2AllTime = 0;
    
    // 4. Group calculations by unique config (Active Configurations)
    const activeConfigsMap = new Map<string, any>();
    
    // 6. Weekly sparkline data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const weeklySparklineMap = new Map<string, number>();
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      weeklySparklineMap.set(d.toISOString().split('T')[0], 0);
    }

    allCalculations.forEach(calc => {
      totalCo2AllTime += calc.co2KgMonth;
      
      // Monthly stats
      if (calc.createdAt >= currentMonthStart) {
        totalCo2ThisMonth += calc.co2KgMonth;
        calculationsThisMonth++;
      } else if (calc.createdAt >= lastMonthStart && calc.createdAt < currentMonthStart) {
        totalCo2LastMonth += calc.co2KgMonth;
      }
      
      // Sparkline stats
      if (calc.createdAt >= sevenDaysAgo) {
        const dateKey = calc.createdAt.toISOString().split('T')[0];
        if (weeklySparklineMap.has(dateKey)) {
          weeklySparklineMap.set(dateKey, weeklySparklineMap.get(dateKey)! + calc.co2KgMonth);
        }
      }
      
      // Active configurations (keep most recent for each combo)
      const configKey = `${calc.provider}-${calc.region}-${calc.instanceType}`;
      if (!activeConfigsMap.has(configKey)) {
        activeConfigsMap.set(configKey, {
          provider: calc.provider,
          region: calc.region,
          instanceType: calc.instanceType,
          lastCo2Kg: calc.co2KgMonth,
          lastCalculatedAt: calc.createdAt,
          calculationId: calc.id,
          rating: calc.rating
        });
      }
    });

    // 3. Compute carbon rating
    const avgCo2Kg = allCalculations.length > 0 ? totalCo2AllTime / allCalculations.length : 0;
    const carbonRatingInfo = getCarbonRating(avgCo2Kg);

    // Percentage change
    let changePercent = 0;
    let changeDirection = 'same';
    if (totalCo2LastMonth > 0) {
      changePercent = ((totalCo2ThisMonth - totalCo2LastMonth) / totalCo2LastMonth) * 100;
      changeDirection = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'same';
    } else if (totalCo2ThisMonth > 0) {
      changePercent = 100;
      changeDirection = 'up';
    }

    // 5. Get budget info and active web projects
    const mobileUser = await prisma.mobileUser.findUnique({ where: { id: userId } });
    const budgetLimitKg = mobileUser?.carbonBudgetKg || 100;
    const percentUsed = Math.round((totalCo2ThisMonth / budgetLimitKg) * 100);

    let webProjects: any[] = [];
    
    // Auth might be passing a User ID (from web) or MobileUser ID
    let webUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { projects: true } // or filter active ones
    });

    if (!webUser && mobileUser?.email) {
      webUser = await prisma.user.findUnique({
        where: { email: mobileUser.email },
        include: { projects: true }
      });
    }

    if (webUser?.projects) {
      webProjects = webUser.projects.map(p => ({
        id: p.id,
        name: p.name,
        region: p.region,
        sdkConnected: p.sdkConnected,
        connectedAt: p.connectedAt,
        lastPingAt: p.lastPingAt
      }));
    }

    // 7. Get recent alerts
    const recentAlerts = await prisma.userNotification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    const weeklySparkline = Array.from(weeklySparklineMap.entries()).map(([date, co2Kg]) => ({
      date,
      co2Kg
    }));

    res.json({
      success: true,
      data: {
        totalCo2ThisMonth: Number(totalCo2ThisMonth.toFixed(1)),
        totalCo2LastMonth: Number(totalCo2LastMonth.toFixed(1)),
        changePercent: Number(Math.abs(changePercent).toFixed(1)),
        changeDirection,
        calculationsThisMonth,
        avgCo2Kg: Number(avgCo2Kg.toFixed(1)),
        carbonRating: { 
          rating: carbonRatingInfo.rating, 
          color: carbonRatingInfo.color, 
          label: carbonRatingInfo.rating === 'LOW' ? 'A' : carbonRatingInfo.rating === 'MEDIUM' ? 'B' : carbonRatingInfo.rating === 'HIGH' ? 'C' : 'F' 
        },
        budget: {
          limitKg: budgetLimitKg,
          usedKg: Number(totalCo2ThisMonth.toFixed(1)),
          percentUsed,
          isOverBudget: percentUsed > 100
        },
        activeProjects: webProjects,
        activeConfigurations: Array.from(activeConfigsMap.values()),
        weeklySparkline,
        recentAlerts
      }
    });
  } catch (error: any) {
    logger.error('Error fetching dashboard:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
