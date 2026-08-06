import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions, Alert, Modal, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../src/theme/colors';
import { carbonApi, adminApi } from '../../src/services/api/endpoints';

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
  const [analyzingProjectId, setAnalyzingProjectId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async (project: any) => {
    setAnalyzingProjectId(project.id);
    try {
      const emRes = await adminApi.getEmissions('All', 'All', project.id);
      if (!emRes.records || emRes.records.length === 0) {
        Alert.alert("Not enough data yet to analyze. Wait for telemetry.");
        setAnalyzingProjectId(null);
        return;
      }
      const latest = emRes.records[0];
      const payload = {
        projectName: project.name,
        instanceType: latest.instanceType || 't3.medium',
        provider: latest.provider || project.provider || 'aws',
        region: latest.region || project.region || 'us-east-1',
        cpuUtilization: latest.cpuUtilization || 0.2,
        storageGb: 20
      };
      const res = await carbonApi.recommend(payload);
      if (res.success && res.data?.recommended) {
        setAnalysisResult({ project, currentRegion: payload.region, currentProvider: payload.provider, recommendation: res.data.recommended });
      } else {
        Alert.alert("Optimization Status", "Your environment is already optimized! No greener region found for this provider.");
      }
    } catch (e: any) {
      Alert.alert("Error", "Error fetching analysis: " + e.message);
    } finally {
      setAnalyzingProjectId(null);
    }
  };

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

  const scrollY = useRef(new Animated.Value(0)).current;

  const topBarBg = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['rgba(20, 20, 20, 0)', 'rgba(20, 20, 20, 1)'], // Fades to #141414
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      {/* TopAppBar - now absolute and animated */}
      <Animated.View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top, backgroundColor: topBarBg, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => { refetch(); Alert.alert('Reloading', 'Dashboard data has been refreshed.'); }}>
          <MaterialIcons name="refresh" size={24} color={isRefetching ? colors.primary : colors.textMuted} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView 
        contentContainerStyle={[styles.content, { paddingTop: 56 + insets.top + 24 }]} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Spotify-style top gradient fade - now inside scrollview so it scrolls up */}
        <LinearGradient
          colors={[colors.primary + '25', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280 + 56 + insets.top }}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Personal carbon footprint overview</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* Top Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <MaterialIcons name="cloud" size={16} color={colors.textMuted} />
                  <Text style={styles.statTitle}>Active Deployments</Text>
                </View>
                <Text style={styles.statValue}>{dashboard?.activeProjects?.length || 0}</Text>
              </View>
              
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <MaterialIcons name="co2" size={16} color={colors.textMuted} />
                  <Text style={styles.statTitle}>Avg CO₂ Intensity</Text>
                </View>
                <Text style={styles.statValue}>{dashboard?.avgCo2Kg || 0} g/kWh</Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <MaterialIcons name="eco" size={16} color={colors.textMuted} />
                  <Text style={styles.statTitle}>Carbon Saved</Text>
                </View>
                <Text style={styles.statValue}>
                  {dashboard?.avgCo2Kg ? (dashboard.avgCo2Kg * 0.1).toFixed(1) : '0'} kg
                </Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <MaterialIcons name="monitor-heart" size={16} color={colors.textMuted} />
                  <Text style={styles.statTitle}>System Health</Text>
                </View>
                <Text style={styles.statValue}>99.9%</Text>
              </View>
            </View>



            {/* Active Projects (Web) */}
            <View style={styles.panel}>
              <View style={styles.panelHeaderRow}>
                <MaterialIcons name="code" size={20} color={colors.primary} />
                <Text style={styles.panelTitle}>YOUR ACTIVE PROJECTS</Text>
              </View>
              
              {!dashboard?.activeProjects || dashboard.activeProjects.length === 0 ? (
                <Text style={styles.emptyText}>No active projects found.</Text>
              ) : (
                dashboard.activeProjects.map((project: any) => (
                  <View key={project.id} style={styles.configCard}>
                    <View style={styles.configHeader}>
                      <Text style={styles.configProvider}>{project.name}</Text>
                      {project.sdkConnected ? (
                        <View style={[styles.configBadge, { backgroundColor: 'rgba(80, 250, 123, 0.2)' }]}>
                          <Text style={[styles.configBadgeText, { color: '#50FA7B' }]}>SDK CONNECTED</Text>
                        </View>
                      ) : (
                        <View style={[styles.configBadge, { backgroundColor: 'rgba(245, 197, 24, 0.2)' }]}>
                          <Text style={[styles.configBadgeText, { color: '#f5c518' }]}>AWAITING SDK</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.configBody}>
                      <View>
                        <Text style={styles.configLabel}>Region</Text>
                        <Text style={styles.configValue}>{project.region || 'Not detected yet'}</Text>
                      </View>
                      <View>
                        <Text style={styles.configLabel}>Connected At</Text>
                        <Text style={[styles.configValue, { color: colors.textMuted, fontSize: 12 }]}>
                          {project.connectedAt ? new Date(project.connectedAt).toLocaleDateString() : 'N/A'}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.configLabel}>Last Ping</Text>
                        <Text style={[styles.configValue, { color: colors.textMuted, fontSize: 12 }]}>
                          {project.lastPingAt ? timeAgo(project.lastPingAt) : 'Never'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.configFooter}>
                      <TouchableOpacity 
                        style={[styles.insightBtn, { marginRight: 8 }]} 
                        onPress={() => router.push(`/project/${project.id}`)}
                      >
                        <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
                        <Text style={styles.insightBtnText}>View Project</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.insightBtn} 
                        onPress={() => handleAnalyze(project)}
                        disabled={analyzingProjectId === project.id}
                      >
                        {analyzingProjectId === project.id ? (
                          <ActivityIndicator size="small" color={colors.primary} />
                        ) : (
                          <>
                            <MaterialIcons name="auto-awesome" size={16} color={colors.primary} />
                            <Text style={styles.insightBtnText}>Analyze</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
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
      </Animated.ScrollView>

      {/* Analysis Modal */}
      <Modal visible={!!analysisResult} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <MaterialIcons name="auto-awesome" size={24} color={colors.primary} />
              <Text style={styles.modalTitle}>AI Optimization Found</Text>
            </View>
            
            {analysisResult && (
              <>
                <Text style={styles.modalSubtitle}>
                  CarboniX Agentic AI analyzed {analysisResult.project.name} and found a greener region!
                </Text>
                
                <View style={styles.modalStatsCard}>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Current Target:</Text>
                    <Text style={styles.modalStatValue}>{analysisResult.currentProvider.toUpperCase()} ({analysisResult.currentRegion})</Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Current Carbon:</Text>
                    <Text style={[styles.modalStatValue, { color: '#f5c518' }]}>
                      {(analysisResult.recommendation.co2KgMonth + analysisResult.recommendation.savingsKg).toFixed(2)} kg CO₂e / mo
                    </Text>
                  </View>
                  <View style={styles.modalDivider} />
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>Recommended:</Text>
                    <Text style={[styles.modalStatValue, { color: '#50FA7B' }]}>{analysisResult.currentProvider.toUpperCase()} ({analysisResult.recommendation.region})</Text>
                  </View>
                  <View style={styles.modalStatRow}>
                    <Text style={styles.modalStatLabel}>New Carbon:</Text>
                    <Text style={[styles.modalStatValue, { color: '#50FA7B' }]}>
                      {analysisResult.recommendation.co2KgMonth.toFixed(2)} kg CO₂e / mo
                    </Text>
                  </View>
                </View>
                
                <View style={styles.modalSavingsBox}>
                  <MaterialIcons name="eco" size={20} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalSavingsTitle}>Expected Savings</Text>
                    <Text style={styles.modalSavingsText}>
                      You can save ~{Math.round(analysisResult.recommendation.reductionPercent)}% carbon emissions ({analysisResult.recommendation.savingsKg.toFixed(2)} kg CO₂e) by making this switch.
                    </Text>
                  </View>
                </View>
              </>
            )}
            
            <TouchableOpacity 
              style={styles.modalCloseBtn}
              onPress={() => setAnalysisResult(null)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    paddingHorizontal: 20, backgroundColor: 'transparent',
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 56, height: 56, resizeMode: 'contain' },
  logo: { fontFamily: 'Inter-Bold', fontSize: 20, fontWeight: '900', color: colors.primary, letterSpacing: -0.5, marginLeft: -8 },
  iconBtn: { padding: 8, borderRadius: 12 },
  content: { paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100, gap: 16 },
  header: { gap: 4 },
  title: { fontFamily: 'Inter-Bold', fontSize: 36, color: colors.textHeader, letterSpacing: -1 },
  subtitle: { fontFamily: 'Inter', fontSize: 16, color: colors.textMuted },

  // Stats Grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1E1E1E', 
    borderWidth: 1, 
    borderColor: '#2A2A2A',
    borderRadius: 16, 
    padding: 16, 
    gap: 12,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statTitle: { fontFamily: 'Inter', fontSize: 12, color: colors.textMuted },
  statValue: { fontFamily: 'Inter-Bold', fontSize: 24, color: colors.textHeader },



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

  // Analysis Modal
  configFooter: { borderTopWidth: 1, borderTopColor: '#333', marginTop: 12, paddingTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  insightBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255, 229, 160, 0.1)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  insightBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#1E1E1E', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#2A2A2A' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  modalTitle: { fontFamily: 'Inter-Bold', fontSize: 18, color: colors.textHeader },
  modalSubtitle: { fontFamily: 'Inter', fontSize: 14, color: colors.textMuted, marginBottom: 16, lineHeight: 20 },
  modalStatsCard: { backgroundColor: '#141414', borderRadius: 12, padding: 16, gap: 8, borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 16 },
  modalStatRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalStatLabel: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },
  modalStatValue: { fontFamily: 'JetBrainsMono-Bold', fontSize: 13, color: colors.textHeader },
  modalDivider: { height: 1, backgroundColor: '#2A2A2A', marginVertical: 4 },
  modalSavingsBox: { backgroundColor: 'rgba(255, 229, 160, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 229, 160, 0.3)', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
  modalSavingsTitle: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: colors.primary, marginBottom: 2 },
  modalSavingsText: { fontFamily: 'Inter', fontSize: 12, color: colors.primary, opacity: 0.8, lineHeight: 18 },
  modalCloseBtn: { alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 10 },
  modalCloseText: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: colors.textMuted },
});
