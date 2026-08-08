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
    let percentUsed = Math.round((totalCo2ThisMonth / budgetLimitKg) * 100);

    let webProjects: any[] = [];
    let avgGridIntensity = 0;
    let carbonSaved = 0;
    
    // Auth might be passing a User ID (from web) or MobileUser ID
    let webUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        projects: {
          include: {
            deployments: {
              orderBy: { createdAt: 'desc' },
              take: 1
            }
          }
        } 
      }
    });

    if (!webUser && mobileUser?.email) {
      webUser = await prisma.user.findUnique({
        where: { email: mobileUser.email },
        include: { 
          projects: {
            include: {
              deployments: {
                orderBy: { createdAt: 'desc' },
                take: 1
              }
            }
          } 
        }
      });
    }

    if (webUser?.projects) {
      webProjects = webUser.projects.map(p => {
        const hasDeployments = p.deployments && p.deployments.length > 0;
        const displayRegion = hasDeployments && p.deployments[0].region 
          ? p.deployments[0].region 
          : p.region;

        return {
          id: p.id,
          name: p.name,
          region: displayRegion,
          sdkConnected: p.sdkConnected,
          connectedAt: p.connectedAt,
          lastPingAt: p.lastPingAt
        };
      });

      // Fetch telemetry data for the user's projects to add to overall stats and sparkline
      const projectIds = webUser.projects.map(p => p.id);
      const telemetryRecords = await prisma.emissionRecord.findMany({
        where: {
          projectId: { in: projectIds },
          timestamp: { gte: lastMonthStart }
        }
      });

      let totalGridIntensity = 0;
      let telemetryCount = 0;

      telemetryRecords.forEach(record => {
        totalCo2AllTime += record.carbonKg;
        totalGridIntensity += record.gridIntensity;
        telemetryCount++;
        
        if (record.timestamp >= currentMonthStart) {
          totalCo2ThisMonth += record.carbonKg;
        } else if (record.timestamp >= lastMonthStart && record.timestamp < currentMonthStart) {
          totalCo2LastMonth += record.carbonKg;
        }

        if (record.timestamp >= sevenDaysAgo) {
          const dateKey = record.timestamp.toISOString().split('T')[0];
          if (weeklySparklineMap.has(dateKey)) {
            weeklySparklineMap.set(dateKey, weeklySparklineMap.get(dateKey)! + record.carbonKg);
          }
        }
      });
      
      avgGridIntensity = telemetryCount > 0 ? Math.round(totalGridIntensity / telemetryCount) : 0;
      
      const auditLogs = await prisma.auditLog.findMany({
        where: { actorId: userId, action: 'EMISSION_MIGRATE' }
      });
      
      carbonSaved = auditLogs.reduce((acc, log: any) => {
        if (log.before?.carbonKg && log.after?.carbonKg) {
           return acc + (log.before.carbonKg - log.after.carbonKg);
        }
        return acc;
      }, 0);
      
      // Recompute percentUsed and changePercent since totalCo2ThisMonth changed
      percentUsed = Math.round((totalCo2ThisMonth / budgetLimitKg) * 100);
      if (totalCo2LastMonth > 0) {
        changePercent = ((totalCo2ThisMonth - totalCo2LastMonth) / totalCo2LastMonth) * 100;
        changeDirection = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'same';
      } else if (totalCo2ThisMonth > 0) {
        changePercent = 100;
        changeDirection = 'up';
      }
    }

    // 7. Get recent alerts
    const recentAlerts = await prisma.userNotification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    let earliestRecordDate: Date | null = null;
    if (allCalculations.length > 0) {
      earliestRecordDate = allCalculations[allCalculations.length - 1].createdAt;
    }
    
    // Check if webUser is defined before checking its projects
    if (webUser?.projects) {
      // Find earliest telemetry if available
      // Note: telemetryRecords is local to the block above, so we have to do it differently, 
      // or we can just query the absolute earliest telemetry record for these projects
      const projectIds = webUser.projects.map(p => p.id);
      const earliestTelemetry = await prisma.emissionRecord.findFirst({
        where: { projectId: { in: projectIds } },
        orderBy: { timestamp: 'asc' }
      });
      if (earliestTelemetry) {
        if (!earliestRecordDate || earliestTelemetry.timestamp < earliestRecordDate) {
          earliestRecordDate = earliestTelemetry.timestamp;
        }
      }
    }

    const earliestDateKey = earliestRecordDate ? earliestRecordDate.toISOString().split('T')[0] : null;

    let weeklySparkline = Array.from(weeklySparklineMap.entries())
      .map(([date, co2Kg]) => ({
        date,
        co2Kg
      }))
      .filter(h => !earliestDateKey || h.date >= earliestDateKey);

    if (!earliestDateKey || weeklySparkline.length === 0) {
      const todayKey = now.toISOString().split('T')[0];
      weeklySparkline = [{ date: todayKey, co2Kg: 0 }];
    }

    if (weeklySparkline.length > 0 && weeklySparkline.length < 7) {
      const prevDay = new Date(weeklySparkline[0].date);
      prevDay.setDate(prevDay.getDate() - 1);
      weeklySparkline.unshift({ date: prevDay.toISOString().split('T')[0], co2Kg: 0 });
    }

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
        avgGridIntensity,
        carbonSaved: Number(carbonSaved.toFixed(1)),
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
