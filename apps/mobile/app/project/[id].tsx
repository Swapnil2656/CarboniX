import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { adminApi } from '../../src/services/api/endpoints';
import { LineChart } from 'react-native-chart-kit';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartDays, setChartDays] = useState<'7d' | '30d'>('7d');
  
  const [confirmNameDisconnect, setConfirmNameDisconnect] = useState('');
  const [confirmNameDelete, setConfirmNameDelete] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getProjectStats(id as string);
        if (res.success) {
          setData(res.data);
        } else {
          Alert.alert('Error', res.error || 'Failed to fetch project stats');
        }
      } catch (err: any) {
        Alert.alert('Error', err.message || 'Internal error');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchStats();
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirmNameDelete !== data?.project?.name) {
      Alert.alert('Validation Error', 'Project name does not match.');
      return;
    }
    try {
      setIsDeleting(true);
      await adminApi.deleteProject(id as string);
      router.back();
    } catch (e: any) {
      Alert.alert('Delete failed', e.message);
      setIsDeleting(false);
    }
  };

  const handleDisconnect = async () => {
    if (confirmNameDisconnect !== data?.project?.name) {
      Alert.alert('Validation Error', 'Project name does not match.');
      return;
    }
    try {
      setIsDisconnecting(true);
      await adminApi.disconnectProject(id as string);
      router.back();
    } catch (e: any) {
      Alert.alert('Disconnect failed', e.message);
      setIsDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data?.project) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textBody} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={{ color: colors.error, padding: 20 }}>Project not found.</Text>
      </View>
    );
  }

  const { project, idleInstances, oversizedInstances, carbonTrend, history7d, history30d, totalMonthKg, apiKeys, greenerRegion, isStale, instances } = data;
  const chartData = chartDays === '7d' ? history7d : history30d;

  const getEquivalent = (kg: number) => {
    const kmDriven = (kg * 4.3).toFixed(1);
    const phoneCharges = Math.round(kg * 121);
    const netflixHours = Math.round(kg * 600);
    if (kg > 20) return `≈ driving ${kmDriven} km in a car`;
    if (kg > 5) return `≈ streaming ${netflixHours} hours of 4K Netflix`;
    return `≈ charging your phone ${phoneCharges.toLocaleString()} times`;
  };

  const trendValue = carbonTrend?.trendPercent ? Math.round(Math.abs(carbonTrend.trendPercent)) : 0;
  const trendDir = carbonTrend?.trendPercent >= 0 ? 'up' : 'down';
  const isNew = carbonTrend?.isNew;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textBody} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>{project.name}</Text>
          <View style={styles.statusRow}>
            {project.isDeployed ? (
              <View style={[styles.badge, { backgroundColor: 'rgba(80, 250, 123, 0.2)' }]}>
                <Text style={[styles.badgeText, { color: '#50FA7B' }]}>DEPLOYED</Text>
              </View>
            ) : (
              <View style={[styles.badge, { backgroundColor: 'rgba(245, 197, 24, 0.2)' }]}>
                <Text style={[styles.badgeText, { color: '#f5c518' }]}>NOT DEPLOYED</Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitle}>Created: {new Date(project.createdAt).toLocaleDateString()}</Text>
        </View>

        <View style={styles.panel}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={styles.panelTitle}>Carbon Budget</Text>
            <Text style={{ color: colors.textBody, fontSize: 12 }}>
              {totalMonthKg?.toFixed(1) || 0} / {project.carbonBudgetKg || 100} kg
            </Text>
          </View>
          <View style={{ height: 10, backgroundColor: colors.surfaceContainer, borderRadius: 5, overflow: 'hidden' }}>
            <View style={{ 
              height: 10, 
              backgroundColor: totalMonthKg > (project.carbonBudgetKg || 100) ? colors.error : colors.primary, 
              width: `${Math.min(((totalMonthKg || 0) / (project.carbonBudgetKg || 100)) * 100, 100)}%` 
            }} />
          </View>
        </View>

        {!project.isDeployed ? (
          <View>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Estimate Assumptions</Text>
              <Text style={styles.panelText}>Based on:</Text>
              <Text style={{ color: colors.textBody }}>• Instance Type: t3.medium</Text>
              <Text style={{ color: colors.textBody }}>• CPU Utilization: 15%</Text>
              <Text style={{ color: colors.textBody }}>• Running Hours: 730 hrs/month</Text>
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Launch Checklist</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                <MaterialIcons name="check-circle" size={18} color={colors.primary} />
                <Text style={{ color: colors.textBody, marginLeft: 8 }}>Project Created</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                <MaterialIcons name="check-circle" size={18} color={colors.primary} />
                <Text style={{ color: colors.textBody, marginLeft: 8 }}>API Key Generated</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, opacity: 0.5 }}>
                <MaterialIcons name="radio-button-unchecked" size={18} color={colors.textBody} />
                <Text style={{ color: colors.textBody, marginLeft: 8 }}>SDK Installed</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, opacity: 0.5 }}>
                <MaterialIcons name="radio-button-unchecked" size={18} color={colors.textBody} />
                <Text style={{ color: colors.textBody, marginLeft: 8 }}>Config Initialized</Text>
              </View>
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Top Recommended Regions</Text>
              <View style={{ backgroundColor: colors.surfaceContainer, padding: 10, borderRadius: 8, marginBottom: 8 }}>
                <Text style={{ color: colors.textBody, fontWeight: 'bold' }}>europe-west6 (AWS)</Text>
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>Grid Intensity: 12 gCO2/kWh • Renewable: 89%</Text>
                <Text style={{ color: colors.primary, marginTop: 4 }}>~0.4 kg CO2/mo ($15.50/mo)</Text>
              </View>
              <View style={{ backgroundColor: colors.surfaceContainer, padding: 10, borderRadius: 8 }}>
                <Text style={{ color: colors.textBody, fontWeight: 'bold' }}>eu-north-1 (GCP)</Text>
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>Grid Intensity: 15 gCO2/kWh • Renewable: 85%</Text>
                <Text style={{ color: colors.primary, marginTop: 4 }}>~0.5 kg CO2/mo ($16.20/mo)</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialIcons name="co2" size={16} color={colors.textMuted} />
                <Text style={styles.statTitle}>Today's Carbon</Text>
              </View>
              <Text style={styles.statValue}>{Number(carbonTrend?.todayKg || 0).toFixed(2)} kg</Text>
              {!isNew && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <MaterialIcons name={trendDir === 'up' ? 'trending-up' : 'trending-down'} size={14} color={trendDir === 'up' ? colors.error : colors.primary} />
                  <Text style={{ color: trendDir === 'up' ? colors.error : colors.primary, fontSize: 12, marginLeft: 4 }}>{trendValue}%</Text>
                </View>
              )}
              {isNew && <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>New</Text>}
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialIcons name="payments" size={16} color={colors.textMuted} />
                <Text style={styles.statTitle}>Est. Daily Cost</Text>
              </View>
              <Text style={styles.statValue}>${(history30d && history30d[history30d.length - 1]?.costUsd || 0).toFixed(2)}</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialIcons name="snooze" size={16} color={colors.textMuted} />
                <Text style={styles.statTitle}>Idle / Oversized</Text>
              </View>
              <Text style={styles.statValue}>{idleInstances} / {oversizedInstances}</Text>
            </View>

            <View style={[styles.statCard, isStale && { borderColor: colors.error, borderWidth: 1 }]}>
              <View style={styles.statHeader}>
                <MaterialIcons name="wifi" size={16} color={colors.textMuted} />
                <Text style={styles.statTitle}>SDK Status</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: isStale ? colors.error : colors.primary, marginRight: 6 }} />
                <Text style={styles.statValue} numberOfLines={1}>{isStale ? 'Stale' : 'Healthy'}</Text>
              </View>
            </View>
          </View>
        )}

        {project.isDeployed && chartData?.length > 0 && (
          <View style={styles.panel}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.panelTitle}>Carbon Trend</Text>
              <View style={{ flexDirection: 'row', backgroundColor: colors.surfaceContainer, borderRadius: 8, padding: 2 }}>
                <TouchableOpacity onPress={() => setChartDays('7d')} style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: chartDays === '7d' ? colors.surface : 'transparent', borderRadius: 6 }}>
                  <Text style={{ color: colors.textBody, fontSize: 12 }}>7d</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChartDays('30d')} style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: chartDays === '30d' ? colors.surface : 'transparent', borderRadius: 6 }}>
                  <Text style={{ color: colors.textBody, fontSize: 12 }}>30d</Text>
                </TouchableOpacity>
              </View>
            </View>
            <LineChart
              data={{
                labels: chartData.map((d: any, i: number) => (i % (chartDays === '30d' ? 5 : 1) === 0 ? d.date.substring(5) : '')),
                datasets: [{ data: chartData.map((d: any) => d.carbonKg) }]
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              yAxisSuffix="kg"
              chartConfig={{
                backgroundColor: colors.surface,
                backgroundGradientFrom: colors.surface,
                backgroundGradientTo: colors.surface,
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(80, 250, 123, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "4", strokeWidth: "2", stroke: colors.surface }
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
            <Text style={{ color: colors.textMuted, fontSize: 12, textAlign: 'center', fontStyle: 'italic', marginTop: 8 }}>
              {getEquivalent(totalMonthKg || 0)}
            </Text>
          </View>
        )}

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Associated API Keys</Text>
          {apiKeys?.length > 0 ? (
            apiKeys.map((key: any) => (
              <View key={key.id} style={{ backgroundColor: colors.surfaceContainer, padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ color: colors.textBody, fontWeight: 'bold' }}>{key.name}</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12 }}>Prefix: {key.prefix}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'rgba(248,113,113,0.1)', padding: 6, borderRadius: 6 }}>
                  <Text style={{ color: colors.error, fontSize: 12 }}>Revoke</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={{ color: colors.textMuted, fontSize: 14 }}>No associated API keys found.</Text>
          )}
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <View style={styles.dangerHeader}>
            <MaterialIcons name="warning" size={20} color={colors.error} />
            <Text style={styles.dangerTitle}>Danger Zone</Text>
          </View>

          <View style={styles.dangerContent}>
            <Text style={styles.dangerItemTitle}>Disconnect Project</Text>
            <Text style={styles.dangerItemText}>Disconnecting will stop new telemetry but preserve historical data.</Text>
            <TextInput
              style={styles.input}
              placeholder="Type project name to confirm"
              placeholderTextColor={colors.textMuted}
              value={confirmNameDisconnect}
              onChangeText={setConfirmNameDisconnect}
            />
            <TouchableOpacity 
              style={[styles.dangerBtn, { backgroundColor: '#f5c518' }, (isDisconnecting || confirmNameDisconnect !== project.name) && styles.disabledBtn]}
              onPress={handleDisconnect}
              disabled={isDisconnecting || confirmNameDisconnect !== project.name}
            >
              <Text style={styles.dangerBtnText}>{isDisconnecting ? 'Disconnecting...' : 'Disconnect'}</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.dangerItemTitle}>Delete Project</Text>
            <Text style={styles.dangerItemText}>Permanently delete this project and all of its telemetry history.</Text>
            <TextInput
              style={styles.input}
              placeholder="Type project name to confirm"
              placeholderTextColor={colors.textMuted}
              value={confirmNameDelete}
              onChangeText={setConfirmNameDelete}
            />
            <TouchableOpacity 
              style={[styles.dangerBtn, (isDeleting || confirmNameDelete !== project.name) && styles.disabledBtn]}
              onPress={handleDelete}
              disabled={isDeleting || confirmNameDelete !== project.name}
            >
              <Text style={styles.dangerBtnText}>{isDeleting ? 'Deleting...' : 'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.surfaceContainer },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: colors.textBody, marginLeft: 4, fontSize: 16 },
  content: { padding: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.textBody, marginBottom: 8 },
  statusRow: { flexDirection: 'row', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: colors.textMuted },
  panel: { backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: colors.surfaceContainer },
  panelTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textBody, marginBottom: 8 },
  panelText: { fontSize: 14, color: colors.textBody, marginBottom: 16 },
  analyzeBtn: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
  analyzeBtnText: { color: colors.background, fontWeight: 'bold' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  statCard: { width: '48%', backgroundColor: colors.surface, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.surfaceContainer },
  statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statTitle: { fontSize: 12, color: colors.textMuted, marginLeft: 6 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: colors.textBody },
  dangerZone: { marginTop: 24, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(248, 113, 113, 0.3)' },
  dangerHeader: { backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(248, 113, 113, 0.2)' },
  dangerTitle: { color: colors.error, fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  dangerContent: { backgroundColor: 'rgba(248, 113, 113, 0.05)', padding: 16 },
  dangerItemTitle: { color: colors.textBody, fontWeight: 'bold', marginBottom: 4 },
  dangerItemText: { color: colors.textMuted, fontSize: 12, marginBottom: 12 },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.surfaceContainer, borderRadius: 8, padding: 12, color: colors.textBody, marginBottom: 12 },
  dangerBtn: { backgroundColor: colors.error, padding: 12, borderRadius: 8, alignItems: 'center' },
  dangerBtnText: { color: '#fff', fontWeight: 'bold' },
  disabledBtn: { opacity: 0.5 },
  divider: { height: 1, backgroundColor: 'rgba(248, 113, 113, 0.1)', marginVertical: 20 }
});
