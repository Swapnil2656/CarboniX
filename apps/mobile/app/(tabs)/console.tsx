import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { adminApi, agentsApi } from '../../src/services/api/endpoints';

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

const getAgentMeta = (type: string, status: string) => {
  if (status !== 'SUCCESS') return { icon: 'sync', color: colors.textMuted, label: 'Running...' };
  switch (type) {
    case 'COLLECTOR': return { icon: 'data-usage', color: colors.primary, label: 'Collector' };
    case 'ANALYST': return { icon: 'auto-awesome', color: '#f5c518', label: 'Analyst' };
    case 'CICD_GATE': return { icon: 'security', color: '#ff5555', label: 'Gate' };
    case 'REPORTER': return { icon: 'article', color: '#50FA7B', label: 'Reporter' };
    default: return { icon: 'smart-toy', color: colors.textMuted, label: 'Agent' };
  }
};

// Mini bar chart component for hourly API calls
function ActivityChart({ data }: { data: { hour: string; calls: number }[] }) {
  if (!data || data.length === 0) return null;
  const maxCalls = Math.max(...data.map(d => d.calls), 1);
  // Show last 12 hours for compact view
  const chartData = data.slice(-12);
  const barWidth = (CHART_WIDTH - (chartData.length - 1) * 3) / chartData.length;

  return (
    <View style={chartStyles.container}>
      <View style={chartStyles.barsRow}>
        {chartData.map((d, i) => {
          const height = Math.max((d.calls / maxCalls) * 60, 3);
          const isActive = d.calls > 0;
          return (
            <View key={i} style={chartStyles.barWrapper}>
              <View
                style={[
                  chartStyles.bar,
                  {
                    height,
                    width: barWidth,
                    backgroundColor: isActive ? colors.primary : '#2A2A2A',
                    opacity: isActive ? 0.4 + (d.calls / maxCalls) * 0.6 : 0.3,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={chartStyles.labelsRow}>
        {chartData.map((d, i) => (
          i % 3 === 0 ? (
            <Text key={i} style={[chartStyles.label, { width: barWidth * 3 + 6 }]}>{d.hour}</Text>
          ) : null
        ))}
      </View>
    </View>
  );
}

// Provider distribution bar
function ProviderBar({ data }: { data: { provider: string; percent: number }[] }) {
  if (!data || data.length === 0) return null;
  const providerColors: Record<string, string> = {
    AWS: '#FF9900',
    GCP: '#4285F4',
    Azure: '#00BCF2',
  };

  return (
    <View>
      <View style={provBarStyles.barContainer}>
        {data.map((d, i) => (
          <View
            key={i}
            style={[
              provBarStyles.segment,
              {
                flex: d.percent,
                backgroundColor: providerColors[d.provider] || colors.textMuted,
                borderTopLeftRadius: i === 0 ? 6 : 0,
                borderBottomLeftRadius: i === 0 ? 6 : 0,
                borderTopRightRadius: i === data.length - 1 ? 6 : 0,
                borderBottomRightRadius: i === data.length - 1 ? 6 : 0,
              },
            ]}
          />
        ))}
      </View>
      <View style={provBarStyles.legendRow}>
        {data.map((d, i) => (
          <View key={i} style={provBarStyles.legendItem}>
            <View style={[provBarStyles.legendDot, { backgroundColor: providerColors[d.provider] || colors.textMuted }]} />
            <Text style={provBarStyles.legendText}>{d.provider} {d.percent}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: dashboard, isLoading: dashboardLoading, refetch, isRefetching } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: adminApi.getDashboardStats,
  });

  const { data: agentData, isLoading: agentsLoading } = useQuery({
    queryKey: ['agentRuns'],
    queryFn: () => agentsApi.getAgentRuns({ limit: 5 }),
  });

  const runs = agentData?.data || [];

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
          <Text style={styles.subtitle}>Platform analytics & management</Text>
        </View>

        {dashboardLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* KPI Cards Row */}
            <View style={styles.kpiRow}>
              <View style={[styles.kpiCard, { borderLeftColor: colors.primary }]}>
                <MaterialIcons name="api" size={18} color={colors.primary} />
                <Text style={styles.kpiValue}>{dashboard?.totalApiCalls?.toLocaleString() || '0'}</Text>
                <Text style={styles.kpiLabel}>API Calls</Text>
              </View>
              <View style={[styles.kpiCard, { borderLeftColor: '#50FA7B' }]}>
                <MaterialIcons name="people" size={18} color="#50FA7B" />
                <Text style={styles.kpiValue}>{dashboard?.activeSessions?.toLocaleString() || '0'}</Text>
                <Text style={styles.kpiLabel}>Sessions</Text>
              </View>
            </View>
            <View style={styles.kpiRow}>
              <View style={[styles.kpiCard, { borderLeftColor: '#ff5555' }]}>
                <MaterialIcons name="co2" size={18} color="#ff5555" />
                <Text style={styles.kpiValue}>{dashboard?.avgCo2Kg || '0'}</Text>
                <Text style={styles.kpiLabel}>Avg CO₂ (kg)</Text>
              </View>
              <View style={[styles.kpiCard, { borderLeftColor: '#f5c518' }]}>
                <MaterialIcons name="install-mobile" size={18} color="#f5c518" />
                <Text style={styles.kpiValue}>{dashboard?.sdkInstalls?.toLocaleString() || '0'}</Text>
                <Text style={styles.kpiLabel}>SDK Installs</Text>
              </View>
            </View>

            {/* Activity Chart */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="show-chart" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>API ACTIVITY (24H)</Text>
              </View>
              <ActivityChart data={dashboard?.apiCallsOverTime || []} />
            </View>

            {/* Provider Distribution */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="cloud" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>PROVIDER DISTRIBUTION</Text>
              </View>
              <ProviderBar data={dashboard?.providerDistribution || []} />
            </View>
          </>
        )}

        {/* Quick Management Links */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="admin-panel-settings" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>MANAGEMENT</Text>
          </View>
          <TouchableOpacity style={styles.mgmtLink} onPress={() => router.push('/settings/users')}>
            <View style={[styles.mgmtIconWrap, { backgroundColor: 'rgba(255, 229, 160, 0.1)' }]}>
              <MaterialIcons name="people" size={20} color={colors.primary} />
            </View>
            <View style={styles.mgmtTextWrap}>
              <Text style={styles.mgmtLinkTitle}>Manage Users</Text>
              <Text style={styles.mgmtLinkDesc}>View and remove mobile users</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mgmtLink} onPress={() => router.push('/settings/keys')}>
            <View style={[styles.mgmtIconWrap, { backgroundColor: 'rgba(80, 250, 123, 0.1)' }]}>
              <MaterialIcons name="vpn-key" size={20} color="#50FA7B" />
            </View>
            <View style={styles.mgmtTextWrap}>
              <Text style={styles.mgmtLinkTitle}>API Keys</Text>
              <Text style={styles.mgmtLinkDesc}>Create and revoke SDK keys</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mgmtLink} onPress={() => router.push('/settings/flags')}>
            <View style={[styles.mgmtIconWrap, { backgroundColor: 'rgba(66, 133, 244, 0.1)' }]}>
              <MaterialIcons name="flag" size={20} color="#4285F4" />
            </View>
            <View style={styles.mgmtTextWrap}>
              <Text style={styles.mgmtLinkTitle}>Feature Flags</Text>
              <Text style={styles.mgmtLinkDesc}>Toggle remote config</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mgmtLink} onPress={() => router.push('/settings/brsr')}>
            <View style={[styles.mgmtIconWrap, { backgroundColor: 'rgba(245, 197, 24, 0.1)' }]}>
              <MaterialIcons name="assessment" size={20} color="#f5c518" />
            </View>
            <View style={styles.mgmtTextWrap}>
              <Text style={styles.mgmtLinkTitle}>BRSR Reports</Text>
              <Text style={styles.mgmtLinkDesc}>Monthly compliance reports</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Agent Activity Feed */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="smart-toy" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>RECENT AGENT ACTIVITY</Text>
          </View>
          {agentsLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : runs.length === 0 ? (
            <Text style={styles.emptyText}>No agent activity found.</Text>
          ) : (
            runs.map((run: any) => {
              const meta = getAgentMeta(run.agentType, run.status);
              return (
                <View key={run.id} style={styles.feedCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.agentInfo}>
                      <View style={[styles.agentDot, { backgroundColor: meta.color }]} />
                      <Text style={[styles.agentName, { color: meta.color }]}>{meta.label}</Text>
                    </View>
                    <Text style={styles.timeText}>{timeAgo(run.createdAt)}</Text>
                  </View>
                  <Text style={styles.summaryText} numberOfLines={2}>{run.summary || 'Executing tasks...'}</Text>
                </View>
              );
            })
          )}
        </View>

      </ScrollView>
    </View>
  );
}

// ─── Activity Chart Styles ───
const chartStyles = StyleSheet.create({
  container: { marginTop: 4 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', height: 64, gap: 3 },
  barWrapper: { justifyContent: 'flex-end' },
  bar: { borderRadius: 3 },
  labelsRow: { flexDirection: 'row', marginTop: 6 },
  label: { fontFamily: 'JetBrains Mono', fontSize: 9, color: colors.textMuted },
});

// ─── Provider Bar Styles ───
const provBarStyles = StyleSheet.create({
  barContainer: { flexDirection: 'row', height: 14, borderRadius: 6, overflow: 'hidden', gap: 2 },
  segment: { minWidth: 8 },
  legendRow: { flexDirection: 'row', gap: 16, marginTop: 12, flexWrap: 'wrap' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
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

  // KPI Cards
  kpiRow: { flexDirection: 'row', gap: 12 },
  kpiCard: {
    flex: 1, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A',
    borderRadius: 12, padding: 16, gap: 6,
    borderLeftWidth: 4,
  },
  kpiValue: { fontFamily: 'Inter-Bold', fontSize: 26, color: colors.textHeader },
  kpiLabel: { fontFamily: 'JetBrains Mono', fontSize: 11, color: colors.textMuted, textTransform: 'uppercase' },

  // Panels
  panel: {
    backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A',
    padding: 16, gap: 12, borderRadius: 12,
  },
  panelHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  panelTitle: { fontFamily: 'JetBrainsMono-Bold', fontSize: 13, color: colors.textHeader, letterSpacing: 1 },

  // Management Links
  mgmtLink: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#252525', borderRadius: 10, padding: 14,
  },
  mgmtIconWrap: {
    width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  mgmtTextWrap: { flex: 1 },
  mgmtLinkTitle: { fontFamily: 'Inter-SemiBold', fontSize: 15, color: colors.textHeader },
  mgmtLinkDesc: { fontFamily: 'JetBrains Mono', fontSize: 11, color: colors.textMuted, marginTop: 2 },

  // Agent Feed
  feedCard: { backgroundColor: '#252525', borderRadius: 10, padding: 14, gap: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  agentInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  agentDot: { width: 8, height: 8, borderRadius: 4 },
  agentName: { fontFamily: 'JetBrainsMono-Bold', fontSize: 11, textTransform: 'uppercase' },
  timeText: { fontFamily: 'JetBrains Mono', fontSize: 11, color: colors.textMuted },
  summaryText: { fontFamily: 'Inter', fontSize: 14, color: colors.textHeader, lineHeight: 20 },
  emptyText: { fontFamily: 'Inter', color: colors.textMuted, textAlign: 'center', paddingVertical: 20 },
});
