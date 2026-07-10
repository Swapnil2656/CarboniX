import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import { colors } from '../../src/theme/colors';
import { carbonApi } from '../../src/services/api/endpoints';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('All Time'); // Today, This Week, This Month, All Time
  
  const [useLbs, setUseLbs] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('useLbs').then(val => {
      setUseLbs(val === 'true');
    });
    fetchHistory();
  }, [timeFilter]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      let from: Date | undefined;
      const now = new Date();
      if (timeFilter === 'Today') {
        from = new Date(now.setHours(0, 0, 0, 0));
      } else if (timeFilter === 'This Week') {
        from = new Date(now.setDate(now.getDate() - 7));
      } else if (timeFilter === 'This Month') {
        from = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      
      const params = from ? { from: from.toISOString() } : undefined;
      const res = await carbonApi.getHistory(params);
      
      if (res.success) {
        setHistoryData(res.data);
        setSummary(res.summary);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCo2 = (kg: number) => {
    if (!kg) return '0.0';
    if (useLbs) return (kg * 2.20462).toFixed(2);
    return kg.toFixed(2);
  };
  const unit = useLbs ? 'lbs' : 'kg';

  const getLevelInfo = (co2: number) => {
    if (co2 > 50) return { level: 'HIGH', color: '#ff5555', bg: 'rgba(255, 85, 85, 0.1)' };
    if (co2 > 20) return { level: 'MED', color: '#f5c518', bg: 'rgba(245, 197, 24, 0.1)' };
    return { level: 'LOW', color: '#50FA7B', bg: 'rgba(80, 250, 123, 0.1)' };
  };

  const getProviderIcon = (provider: string) => {
    switch (provider?.toLowerCase()) {
      case 'aws': return 'aws';
      case 'gcp': return 'google';
      case 'azure': return 'microsoft';
      default: return 'cloud';
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Calculation', 'Are you sure you want to delete this record?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await carbonApi.deleteHistory(id);
            fetchHistory();
          } catch (e) {
            console.error('Failed to delete', e);
          }
        } 
      }
    ]);
  };

  const handleRecalculate = (item: any) => {
    // Navigate to Home tab with pre-filled params
    router.push({
      pathname: '/',
      params: { 
        recalc: 'true',
        provider: item.provider,
        region: item.region,
        instanceType: item.instanceType,
        count: item.instanceCount,
        uptime: item.uptimeHours,
        cpu: item.cpuUtilization,
        storage: item.storageSizeGb
      }
    });
  };

  const renderRightActions = (item: any) => (
    <TouchableOpacity style={styles.deleteAction} onPress={() => handleDelete(item.id)}>
      <MaterialIcons name="delete" size={24} color="#fff" />
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (item: any) => (
    <TouchableOpacity style={styles.recalcAction} onPress={() => handleRecalculate(item)}>
      <MaterialIcons name="refresh" size={24} color="#fff" />
      <Text style={styles.actionText}>Recalculate</Text>
    </TouchableOpacity>
  );

  const filteredData = historyData.filter(item => 
    item.provider.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.instanceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Month name
  const monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="ios-share" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Your footprint log & insights</Text>
        </View>

        {/* AI Insight Card */}
        {summary && summary.topRegion && summary.avgCo2Kg > 0 && (
          <View style={styles.insightCard}>
            <View style={styles.insightHeaderRow}>
              <MaterialIcons name="auto-awesome" size={18} color="#f5c518" />
              <Text style={styles.insightTitle}>AI INSIGHT</Text>
            </View>
            <Text style={styles.insightText}>
              Your most frequent region is <Text style={{ color: colors.textHeader }}>{summary.topRegion}</Text>. 
              Switching some workloads could reduce your {formatCo2(summary.avgCo2Kg)} {unit} average significantly!
            </Text>
          </View>
        )}

        {/* Time Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          {['Today', 'This Week', 'This Month', 'All Time'].map(filter => (
            <TouchableOpacity 
              key={filter} 
              style={[styles.chip, timeFilter === filter && styles.chipActive]}
              onPress={() => setTimeFilter(filter)}
            >
              <Text style={[styles.chipText, timeFilter === filter && styles.chipTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Monthly Emissions Summary Bar */}
        {summary && (
          <View style={styles.summaryBar}>
            <Text style={styles.summaryBarText}>
              <Text style={{ color: colors.textHeader }}>{timeFilter === 'This Month' ? monthName : timeFilter}</Text> · {summary.totalCalculations} runs · {formatCo2(summary.totalCo2Kg)} {unit} total
            </Text>
          </View>
        )}

        {/* Search / Filter */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search provider, region, instance..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* History List */}
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 32 }} />
          ) : filteredData.length === 0 ? (
            <Text style={styles.emptyText}>No calculations found in this period.</Text>
          ) : (
            filteredData.map((item) => {
              const info = getLevelInfo(item.co2KgMonth);
              return (
                <Swipeable
                  key={item.id}
                  renderRightActions={() => renderRightActions(item)}
                  renderLeftActions={() => renderLeftActions(item)}
                  overshootRight={false}
                  overshootLeft={false}
                >
                  <View style={[styles.card, { borderLeftColor: info.color }]}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                      <View style={[styles.badge, { backgroundColor: info.bg, borderColor: info.color }]}>
                        <Text style={[styles.badgeText, { color: info.color }]}>{info.level}</Text>
                      </View>
                    </View>

                    <View style={styles.cardBody}>
                      <View style={{ flex: 1, gap: 4 }}>
                        <Text style={styles.cardTitle}>{item.instanceType}</Text>
                        <View style={styles.providerInfo}>
                          <FontAwesome5 name={getProviderIcon(item.provider)} size={12} color={colors.textMuted} />
                          <Text style={styles.providerText}>{item.provider.toUpperCase()}</Text>
                          <Text style={styles.dotSeparator}>•</Text>
                          <Text style={styles.regionText}>{item.region}</Text>
                        </View>
                      </View>
                      
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.totalLabel}>EMISSIONS</Text>
                        <Text style={[styles.totalValue, { color: info.color }]}>{formatCo2(item.co2KgMonth)} <Text style={styles.totalUnit}>{unit}</Text></Text>
                      </View>
                    </View>
                  </View>
                </Swipeable>
              );
            })
          )}
        </View>

      </ScrollView>
    </View>
  );
}

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
  
  insightCard: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#f5c518', borderRadius: 12, padding: 16, gap: 8 },
  insightHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  insightTitle: { fontFamily: 'JetBrainsMono-Bold', fontSize: 12, color: '#f5c518' },
  insightText: { fontFamily: 'Inter', fontSize: 14, color: colors.textMuted, lineHeight: 20 },

  chipsContainer: { flexDirection: 'row', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#252525', borderWidth: 1, borderColor: '#2A2A2A' },
  chipActive: { backgroundColor: 'rgba(255, 229, 160, 0.1)', borderColor: colors.primary },
  chipText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: colors.textMuted },
  chipTextActive: { color: colors.primary },

  summaryBar: { backgroundColor: '#1E1E1E', padding: 12, borderRadius: 8, alignItems: 'center' },
  summaryBarText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, height: 48, paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontFamily: 'Inter', fontSize: 14, color: colors.textHeader, height: '100%' },
  
  listContainer: { gap: 12 },
  card: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderLeftWidth: 4, padding: 16, gap: 12, borderRadius: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeText: { fontFamily: 'JetBrains Mono', fontSize: 11, color: colors.textMuted },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontFamily: 'Inter-Bold', fontSize: 16, color: colors.textHeader },
  providerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  providerText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
  dotSeparator: { fontSize: 10, color: colors.textMuted },
  regionText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
  
  totalLabel: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10, color: colors.textMuted, letterSpacing: 1, marginBottom: 4, textAlign: 'right' },
  totalValue: { fontFamily: 'Inter-Bold', fontSize: 20 },
  totalUnit: { fontFamily: 'Inter-SemiBold', fontSize: 12, color: colors.textMuted },
  
  badge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10, letterSpacing: 1 },

  deleteAction: { backgroundColor: '#ff5555', justifyContent: 'center', alignItems: 'center', width: 80, borderRadius: 12, marginVertical: 1, marginLeft: 8 },
  recalcAction: { backgroundColor: '#4285F4', justifyContent: 'center', alignItems: 'center', width: 90, borderRadius: 12, marginVertical: 1, marginRight: 8 },
  actionText: { fontFamily: 'Inter-SemiBold', color: '#fff', fontSize: 12, marginTop: 4 },
  emptyText: { color: colors.textMuted, textAlign: 'center', marginTop: 32, fontFamily: 'Inter' },
});
