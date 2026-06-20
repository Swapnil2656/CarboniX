import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { carbonApi } from '../../src/services/api/endpoints';

const TREND_DATA = [30, 25, 40, 45, 60, 50, 70, 65, 80, 75, 90, 85, 100, 95];

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await carbonApi.getHistory();
        if (res.data) {
          setHistoryData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getLevelInfo = (co2: number) => {
    if (co2 > 20) return { level: 'HIGH', color: colors.error, bg: 'rgba(255, 180, 171, 0.1)' };
    if (co2 > 5) return { level: 'MED', color: colors.primary, bg: 'rgba(255, 229, 160, 0.1)' };
    return { level: 'LOW', color: '#90ff9e', bg: 'rgba(144, 255, 158, 0.1)' };
  };

  const filteredData = historyData.filter(item => 
    item.provider.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>HISTORY</Text>
          <Text style={styles.subtitle}>PAST CARBON EMISSION CALCULATIONS</Text>
        </View>

        {/* Emissions Trend (30d) */}
        <View style={styles.trendPanel}>
          <Text style={styles.trendTitle}>EMISSIONS TREND (30D)</Text>
          <View style={styles.chartContainer}>
            <View style={styles.yAxis}>
              <Text style={styles.axisLabel}>30kg</Text>
              <Text style={styles.axisLabel}>15kg</Text>
              <Text style={styles.axisLabel}>0kg</Text>
            </View>
            <View style={styles.barsArea}>
              {TREND_DATA.map((height, i) => (
                <View key={i} style={[styles.bar, { height: `${height}%` }]} />
              ))}
            </View>
          </View>
          <View style={styles.xAxis}>
            <Text style={styles.axisLabel}>30d ago</Text>
            <Text style={styles.axisLabel}>15d ago</Text>
            <Text style={styles.axisLabel}>Today</Text>
          </View>
        </View>

        {/* Search / Filter */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Filter by cluster or provider..."
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
            <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 32 }}>No calculations found.</Text>
          ) : (
            filteredData.map((item) => {
              const info = getLevelInfo(item.co2KgMonth);
              return (
                <View key={item.id} style={[styles.card, { borderLeftColor: info.color }]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleString()}</Text>
                    <TouchableOpacity>
                      <MaterialIcons name="share" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>Run #{item.id.slice(0, 8)}</Text>
                    <View style={styles.providerInfo}>
                      <MaterialIcons name="cloud" size={14} color={colors.textMuted} />
                      <Text style={styles.providerText}>{item.provider.toUpperCase()}</Text>
                      <Text style={styles.dotSeparator}>•</Text>
                      <Text style={styles.regionText}>{item.region}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.totalLabel}>TOTAL CO2E</Text>
                      <Text style={[styles.totalValue, { color: info.color }]}>{item.co2KgMonth.toFixed(2)} kg</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: info.bg, borderColor: info.color }]}>
                      <Text style={[styles.badgeText, { color: info.color }]}>{info.level}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingTop: 8, 
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    marginLeft: -15,
  },
  logoImage: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
    marginLeft: -6,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100, 
    gap: 16,
  },
  header: {
    gap: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: colors.textHeader,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    color: colors.textMuted,
    letterSpacing: 0.7,
  },
  trendPanel: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  trendTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 1.1,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 128,
    alignItems: 'flex-end',
  },
  yAxis: {
    height: '100%',
    justifyContent: 'space-between',
    paddingRight: 8,
    width: 32,
  },
  axisLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: colors.textMuted,
  },
  barsArea: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#2A2A2A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  bar: {
    width: 12,
    backgroundColor: 'rgba(255, 229, 160, 0.3)', // primary with opacity
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    borderRadius: 12,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textHeader,
    height: '100%',
  },
  listContainer: {
    gap: 8,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderLeftWidth: 4,
    padding: 16,
    gap: 12,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  cardBody: {
    gap: 4,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textHeader,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  providerText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  dotSeparator: {
    fontSize: 10,
    color: colors.textMuted,
  },
  regionText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 12,
  },
  totalLabel: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  totalValue: {
    fontFamily: 'JetBrains Mono',
    fontSize: 20,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
    letterSpacing: 1.1,
  },
});
