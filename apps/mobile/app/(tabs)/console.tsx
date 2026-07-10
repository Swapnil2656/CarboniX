import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { colors } from '../../src/theme/colors';
import { carbonApi } from '../../src/services/api/endpoints';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 72; // padding + panel padding

// Helper to format time ago
function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const getRatingColor = (rating: string) => {
  switch (rating) {
    case 'LOW': return '#50FA7B';
    case 'MEDIUM': return '#f5c518';
    case 'HIGH': return '#ff5555';
    default: return colors.textMuted;
  }
};

const getProviderIcon = (provider: string) => {
  switch (provider?.toLowerCase()) {
    case 'aws': return 'aws';
    case 'gcp': return 'google';
    case 'azure': return 'microsoft';
    default: return 'cloud';
  }
};

function WeeklySparkline({ data }: { data: { date: string; co2Kg: number }[] }) {
  if (!data || data.length === 0) return null;
  const maxCo2 = Math.max(...data.map(d => d.co2Kg), 1);
  const barWidth = (CHART_WIDTH - (data.length - 1) * 4) / data.length;

  return (
    <View style={sparklineStyles.container}>
      <View style={sparklineStyles.barsRow}>
        {data.map((d, i) => {
          const height = Math.max((d.co2Kg / maxCo2) * 60, 3);
          const isActive = d.co2Kg > 0;
          return (
            <View key={i} style={sparklineStyles.barWrapper}>
              <View
                style={[
                  sparklineStyles.bar,
                  {
                    height,
                    width: barWidth,
                    backgroundColor: isActive ? colors.primary : '#2A2A2A',
                    opacity: isActive ? 0.6 + (d.co2Kg / maxCo2) * 0.4 : 0.3,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={sparklineStyles.labelsRow}>
        {data.map((d, i) => (
          <Text key={i} style={[sparklineStyles.label, { width: barWidth, textAlign: 'center' }]}>
            {new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [useLbs, setUseLbs] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      SecureStore.getItemAsync('useLbs').then((val) => {
        setUseLbs(val === 'true');
      });
    }, [])
  );

  const { data: response, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['carbonDashboard'],
    queryFn: carbonApi.getDashboard,
  });

  const dashboard = response?.data;
  
  const formatCo2 = (kg: number) => {
    if (!kg) return '0.0';
    if (useLbs) return (kg * 2.20462).toFixed(1);
    return kg.toFixed(1);
  };
  const unit = useLbs ? 'lbs CO₂' : 'kg CO₂';

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => refetch()}>
          <MaterialIcons name="refresh" size={24} color={isRefetching ? colors.primary : colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Personal carbon footprint overview</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* Personal Carbon Summary Card */}
            <View style={styles.heroCard}>
              <View style={styles.heroHeader}>
                <Text style={styles.heroTitle}>Your Total Carbon Footprint</Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>{dashboard?.carbonRating?.label || 'A'}</Text>
                </View>
              </View>
              <Text style={styles.heroValue}>{formatCo2(dashboard?.totalCo2ThisMonth)} <Text style={styles.heroUnit}>{unit}</Text></Text>
              
              <View style={styles.heroFooter}>
                <Text style={styles.heroDate}>This Month</Text>
                <View style={styles.trendBadge}>
                  <MaterialIcons 
                    name={dashboard?.changeDirection === 'up' ? 'arrow-upward' : dashboard?.changeDirection === 'down' ? 'arrow-downward' : 'remove'} 
                    size={14} 
                    color={dashboard?.changeDirection === 'up' ? '#ff5555' : dashboard?.changeDirection === 'down' ? '#50FA7B' : colors.textMuted} 
                  />
                  <Text style={[styles.trendText, { color: dashboard?.changeDirection === 'up' ? '#ff5555' : dashboard?.changeDirection === 'down' ? '#50FA7B' : colors.textMuted }]}>
                    {dashboard?.changePercent}% vs last month
                  </Text>
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsRow}>
              <TouchableOpacity style={styles.quickActionBtn} onPress={() => router.push('/config')}>
                <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(255, 229, 160, 0.1)' }]}>
                  <MaterialIcons name="calculate" size={24} color={colors.primary} />
                </View>
                <Text style={styles.quickActionText}>Calculate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionBtn} onPress={() => router.push('/compare')}>
                <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(66, 133, 244, 0.1)' }]}>
                  <MaterialIcons name="compare-arrows" size={24} color="#4285F4" />
                </View>
                <Text style={styles.quickActionText}>Compare</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionBtn} onPress={() => router.push('/history')}>
                <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(80, 250, 123, 0.1)' }]}>
                  <MaterialIcons name="history" size={24} color="#50FA7B" />
                </View>
                <Text style={styles.quickActionText}>History</Text>
              </TouchableOpacity>
            </View>

            {/* Carbon Budget Tracker */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>MONTHLY BUDGET</Text>
              </View>
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetText}>{formatCo2(dashboard?.budget?.usedKg)} / {formatCo2(dashboard?.budget?.limitKg)} {unit}</Text>
                <Text style={styles.budgetPercent}>{dashboard?.budget?.percentUsed}%</Text>
              </View>
              <View style={styles.budgetBarContainer}>
                <View 
                  style={[
                    styles.budgetBarFill, 
                    { 
                      width: `${Math.min(dashboard?.budget?.percentUsed || 0, 100)}%`,
                      backgroundColor: dashboard?.budget?.isOverBudget ? '#ff5555' : (dashboard?.budget?.percentUsed > 80 ? '#f5c518' : '#50FA7B')
                    }
                  ]} 
                />
              </View>
              {dashboard?.budget?.isOverBudget ? (
                <Text style={[styles.budgetStatus, { color: '#ff5555' }]}>Over budget by {formatCo2((dashboard?.budget?.usedKg || 0) - (dashboard?.budget?.limitKg || 0))} {unit}</Text>
              ) : (
                <Text style={styles.budgetStatus}>{formatCo2((dashboard?.budget?.limitKg || 0) - (dashboard?.budget?.usedKg || 0))} {unit} remaining</Text>
              )}
            </View>

            {/* Active Configurations */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="dns" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>YOUR MONITORED INFRASTRUCTURE</Text>
              </View>
              
              {!dashboard?.activeConfigurations || dashboard.activeConfigurations.length === 0 ? (
                <Text style={styles.emptyText}>No active configurations.</Text>
              ) : (
                dashboard.activeConfigurations.map((config: any, index: number) => (
                  <TouchableOpacity key={index} style={styles.configCard} onPress={() => router.push('/history')}>
                    <View style={styles.configHeader}>
                      <FontAwesome5 name={getProviderIcon(config.provider)} size={18} color={colors.textHeader} />
                      <Text style={styles.configProvider}>{config.provider.toUpperCase()}</Text>
                      <View style={[styles.configBadge, { backgroundColor: getRatingColor(config.rating) + '20' }]}>
                        <Text style={[styles.configBadgeText, { color: getRatingColor(config.rating) }]}>{config.rating}</Text>
                      </View>
                    </View>
                    <View style={styles.configBody}>
                      <View>
                        <Text style={styles.configLabel}>Region</Text>
                        <Text style={styles.configValue}>{config.region}</Text>
                      </View>
                      <View>
                        <Text style={styles.configLabel}>Instance</Text>
                        <Text style={styles.configValue}>{config.instanceType}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.configLabel}>Emissions</Text>
                        <Text style={[styles.configValue, { color: colors.primary }]}>{formatCo2(config.lastCo2Kg)}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>

            {/* Weekly Sparkline */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="insights" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>WEEKLY TREND</Text>
              </View>
              <WeeklySparkline data={dashboard?.weeklySparkline || []} />
            </View>

            {/* Real-Time Alerts */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>RECENT ALERTS</Text>
              </View>
              
              {!dashboard?.recentAlerts || dashboard.recentAlerts.length === 0 ? (
                <Text style={styles.emptyText}>No recent alerts.</Text>
              ) : (
                dashboard.recentAlerts.map((alert: any) => (
                  <View key={alert.id} style={styles.alertCard}>
                    <View style={styles.alertIcon}>
                      <MaterialIcons 
                        name={alert.type === 'HIGH_EMISSION' ? 'warning' : alert.type === 'BUDGET_ALERT' ? 'account-balance-wallet' : 'lightbulb'} 
                        size={20} 
                        color={alert.type === 'HIGH_EMISSION' ? '#ff5555' : alert.type === 'BUDGET_ALERT' ? '#f5c518' : '#50FA7B'} 
                      />
                    </View>
                    <View style={styles.alertContent}>
                      <View style={styles.alertHeader}>
                        <Text style={styles.alertTitle}>{alert.title}</Text>
                        <Text style={styles.alertTime}>{timeAgo(alert.createdAt)}</Text>
                      </View>
                      <Text style={styles.alertBody}>{alert.body}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>

          </>
        )}
      </ScrollView>
    </View>
  );
}

// ─── Sparkline Styles ───
const sparklineStyles = StyleSheet.create({
  container: { marginTop: 4 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', height: 64, gap: 4, justifyContent: 'space-between' },
  barWrapper: { justifyContent: 'flex-end' },
  bar: { borderRadius: 4 },
  labelsRow: { flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' },
  label: { fontFamily: 'JetBrains Mono', fontSize: 10, color: colors.textMuted },
});

// ─── Main Styles ───
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.outlineVariant,
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  logoImage: { width: 40, height: 40, resizeMode: 'contain' },
  logo: { fontFamily: 'Inter-Bold', fontSize: 20, fontWeight: '900', color: colors.primary, letterSpacing: -0.5 },
  iconBtn: { padding: 8, borderRadius: 12 },
  content: { paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100, gap: 16 },
  header: { gap: 4 },
  title: { fontFamily: 'Inter-Bold', fontSize: 36, color: colors.textHeader, letterSpacing: -1 },
  subtitle: { fontFamily: 'Inter', fontSize: 16, color: colors.textMuted },

  // Hero Card
  heroCard: {
    backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 16, padding: 20, gap: 12,
  },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroTitle: { fontFamily: 'JetBrainsMono-Bold', fontSize: 12, color: colors.textMuted, textTransform: 'uppercase' },
  ratingBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255, 229, 160, 0.1)', justifyContent: 'center', alignItems: 'center' },
  ratingText: { fontFamily: 'Inter-Bold', fontSize: 16, color: colors.primary },
  heroValue: { fontFamily: 'Inter-Bold', fontSize: 42, color: colors.textHeader, letterSpacing: -1 },
  heroUnit: { fontFamily: 'Inter-SemiBold', fontSize: 16, color: colors.textMuted },
  heroFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  heroDate: { fontFamily: 'Inter', fontSize: 14, color: colors.textMuted },
  trendBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#252525', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  trendText: { fontFamily: 'Inter-SemiBold', fontSize: 12 },

  // Quick Actions
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  quickActionBtn: { flex: 1, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 8 },
  quickActionIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  quickActionText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: colors.textHeader },

  // Panels
  panel: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', padding: 16, gap: 16, borderRadius: 12 },
  panelHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  panelTitle: { fontFamily: 'JetBrainsMono-Bold', fontSize: 13, color: colors.textHeader, letterSpacing: 1 },

  // Budget
  budgetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  budgetText: { fontFamily: 'Inter-SemiBold', fontSize: 16, color: colors.textHeader },
  budgetPercent: { fontFamily: 'JetBrains Mono', fontSize: 14, color: colors.textMuted },
  budgetBarContainer: { height: 8, backgroundColor: '#2A2A2A', borderRadius: 4, overflow: 'hidden' },
  budgetBarFill: { height: '100%', borderRadius: 4 },
  budgetStatus: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },

  // Active Configs
  configCard: { backgroundColor: '#252525', borderRadius: 10, padding: 16, gap: 12 },
  configHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  configProvider: { fontFamily: 'Inter-Bold', fontSize: 15, color: colors.textHeader, flex: 1 },
  configBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  configBadgeText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10 },
  configBody: { flexDirection: 'row', justifyContent: 'space-between' },
  configLabel: { fontFamily: 'JetBrains Mono', fontSize: 11, color: colors.textMuted, marginBottom: 4 },
  configValue: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: colors.textHeader },

  // Alerts
  alertCard: { flexDirection: 'row', gap: 12, backgroundColor: '#252525', borderRadius: 10, padding: 12 },
  alertIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center' },
  alertContent: { flex: 1, gap: 4 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertTitle: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: colors.textHeader },
  alertTime: { fontFamily: 'JetBrains Mono', fontSize: 10, color: colors.textMuted },
  alertBody: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted, lineHeight: 18 },

  emptyText: { fontFamily: 'Inter', color: colors.textMuted, textAlign: 'center', paddingVertical: 20 },
});
