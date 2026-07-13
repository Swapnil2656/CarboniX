import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../src/theme/colors';
import { carbonApi, referenceApi } from '../../src/services/api/endpoints';

export default function CompareProvidersScreen() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [provider, setProvider] = useState('aws');
  const [region, setRegion] = useState('us-east-1');
  const [regions, setRegions] = useState<any[]>([]);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchRegions();
  }, [provider]);

  const fetchRegions = async () => {
    try {
      const res = await referenceApi.getRegionsRanked(provider);
      if (res.data) {
        setRegions(res.data);
        setRegion(res.data[0]?.code || '');
      }
    } catch (e) {
      console.log('Error fetching regions', e);
    }
  };

  const handleCompare = async () => {
    setLoading(true);
    try {
      const payload = {
        provider,
        region,
        cpuCores: 8,
        memoryGb: 32,
        storageGb: 500,
        durationHours: 730
      };
      const res = await carbonApi.compare(payload);
      setData(res.data);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.error('Failed to compare:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Compare</Text>
          <Text style={styles.subtitle}>Cross-cloud footprint analysis</Text>
        </View>

        {/* Configuration Form */}
        <View style={styles.configCard}>
          <View style={styles.configRow}>
            <View style={styles.configCol}>
              <Text style={styles.label}>BASE PROVIDER</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={provider} onValueChange={setProvider} style={styles.picker} dropdownIconColor={colors.textHeader}>
                  <Picker.Item label="AWS" value="aws" />
                  <Picker.Item label="GCP" value="gcp" />
                  <Picker.Item label="Azure" value="azure" />
                </Picker>
              </View>
            </View>
            <View style={styles.configCol}>
              <Text style={styles.label}>REGION</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={region} onValueChange={setRegion} style={styles.picker} dropdownIconColor={colors.textHeader}>
                  {regions.map((r: any) => (
                    <Picker.Item key={r.code} label={r.name || r.code} value={r.code} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          
          <View style={styles.workloadBadge}>
            <MaterialIcons name="dns" size={16} color={colors.primary} />
            <Text style={styles.workloadText}>Standard Workload (8 vCPU, 32GB RAM)</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleCompare} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={colors.background} size="small" />
            ) : (
              <Text style={styles.primaryBtnText}>Run Comparison</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Results Area */}
        {data && data.options && (
          <View style={styles.resultsArea}>
            <Text style={styles.resultsTitle}>COMPARISON RESULTS</Text>
            
            {(() => {
              const allResults = [data.base, ...data.options].sort((a, b) => a.co2KgMonth - b.co2KgMonth);
              const best = allResults[0];
              const worst = allResults[allResults.length - 1];
              const multiplier = worst.co2KgMonth / best.co2KgMonth;
              const savedPct = (100 - (best.co2KgMonth / worst.co2KgMonth) * 100).toFixed(0);

              return (
                <>
                  {/* Insight Banner */}
                  <View style={styles.insightBanner}>
                    <MaterialIcons name="savings" size={28} color="#f5c518" />
                    <View style={styles.insightTextCol}>
                      <Text style={styles.insightTitle}>Potential Savings: {savedPct}% CO₂</Text>
                      <Text style={styles.insightDesc}>
                        Switching to <Text style={{ color: '#fff', fontFamily: 'Inter-Bold' }}>{best.provider.toUpperCase()} {best.region}</Text> reduces emissions significantly. Estimated cost savings: $42/mo.
                      </Text>
                    </View>
                  </View>

                  {/* Provider Cards Container */}
                  <View style={styles.cardsContainer}>
                    {allResults.map((res: any, index: number) => {
                      const isWinner = index === 0;
                      const isWorst = index === allResults.length - 1;
                      
                      let cardStyle = styles.cardAws;
                      if (res.provider === 'gcp') cardStyle = styles.cardGcp;
                      if (res.provider === 'azure') cardStyle = styles.cardAzure;

                      return (
                        <View key={`${res.provider}-${res.region}`} style={[styles.card, cardStyle]}>
                          <View>
                            <View style={styles.gcpTitleRow}>
                              <Text style={[styles.providerName, isWinner && { color: '#50FA7B' }]}>{res.provider.toUpperCase()}</Text>
                              {isWinner && (
                                <View style={styles.gcpBadge}>
                                  <Text style={styles.gcpBadgeText}>BEST</Text>
                                </View>
                              )}
                            </View>
                            <Text style={styles.providerRegion}>{res.region}</Text>
                          </View>
                          <View style={styles.providerStats}>
                            <View style={styles.emissionRow}>
                              <Text style={[styles.emissionVal, isWinner ? { color: '#50FA7B' } : { color: colors.textHeader }]}>{res.co2KgMonth.toFixed(1)}</Text>
                              <Text style={[styles.emissionUnit, isWinner && { color: 'rgba(80, 250, 123, 0.7)' }]}>kg</Text>
                            </View>
                            {isWorst && (
                              <View style={styles.awsBadge}>
                                <Text style={styles.awsBadgeText}>{multiplier.toFixed(1)}× higher</Text>
                              </View>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>

                  {/* Bar Chart Card */}
                  <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>EMISSION GAP</Text>
                    <View style={styles.chartRows}>
                      {allResults.map((res: any, index: number) => {
                        const isWinner = index === 0;
                        const widthPct = Math.max(2, (res.co2KgMonth / worst.co2KgMonth) * 100);

                        return (
                          <View key={`chart-${res.provider}-${res.region}`} style={styles.barGroup}>
                            <View style={styles.barHeader}>
                              <Text style={[styles.barProvider, isWinner && { color: '#50FA7B' }]}>{res.provider.toUpperCase()}</Text>
                              <Text style={[styles.barVal, isWinner ? { color: '#50FA7B' } : { color: colors.textHeader }]}>{res.co2KgMonth.toFixed(1)}</Text>
                            </View>
                            <View style={styles.barTrack}>
                              <View style={[
                                styles.barFill, 
                                { width: `${widthPct}%` },
                                isWinner 
                                  ? { backgroundColor: '#50FA7B' }
                                  : { backgroundColor: colors.textMuted }
                              ]} />
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </>
              );
            })()}
          </View>
        )}
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
  topBarLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 56, height: 56, resizeMode: 'contain' },
  logo: { fontFamily: 'Inter-Bold', fontSize: 20, fontWeight: '900', color: colors.primary, letterSpacing: -0.5, marginLeft: -8 },
  iconBtn: { padding: 8, borderRadius: 12 },
  main: { paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100, gap: 16 },
  header: { gap: 4 },
  title: { fontFamily: 'Inter-Bold', fontSize: 36, color: colors.textHeader, letterSpacing: -1 },
  subtitle: { fontFamily: 'Inter', fontSize: 16, color: colors.textMuted },
  
  configCard: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, padding: 16, gap: 16 },
  configRow: { flexDirection: 'row', gap: 12 },
  configCol: { flex: 1, gap: 4 },
  label: { fontFamily: 'JetBrainsMono-Bold', fontSize: 11, color: colors.textMuted, letterSpacing: 1 },
  pickerWrapper: { backgroundColor: '#252525', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 10, overflow: 'hidden' },
  picker: { color: colors.textHeader, fontFamily: 'JetBrains Mono', minHeight: 52 },
  workloadBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255, 229, 160, 0.1)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255, 229, 160, 0.2)' },
  workloadText: { fontFamily: 'Inter-SemiBold', fontSize: 12, color: colors.primary },
  primaryBtn: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  primaryBtnText: { fontFamily: 'Inter-Bold', fontSize: 16, color: colors.background },

  resultsArea: { gap: 16, marginTop: 8 },
  resultsTitle: { fontFamily: 'JetBrainsMono-Bold', fontSize: 13, color: colors.textMuted, letterSpacing: 1 },

  insightBanner: { backgroundColor: '#1E1E1E', padding: 16, borderWidth: 1, borderColor: '#f5c518', flexDirection: 'row', alignItems: 'center', gap: 16, borderRadius: 12 },
  insightTextCol: { flex: 1 },
  insightTitle: { fontFamily: 'Inter-Bold', fontSize: 16, color: '#f5c518' },
  insightDesc: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted, marginTop: 4, lineHeight: 20 },
  
  cardsContainer: { gap: 8 },
  card: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12 },
  cardAws: { borderLeftWidth: 4, borderLeftColor: colors.textMuted },
  cardAzure: { borderLeftWidth: 4, borderLeftColor: colors.textMuted },
  cardGcp: { borderLeftWidth: 4, borderLeftColor: '#50FA7B', borderColor: '#50FA7B', backgroundColor: 'rgba(80, 250, 123, 0.05)' },
  providerName: { fontFamily: 'Inter-Bold', fontSize: 20, color: colors.textHeader },
  providerRegion: { fontFamily: 'JetBrains Mono', fontSize: 14, color: colors.textMuted, marginTop: 4 },
  providerStats: { alignItems: 'flex-end' },
  emissionRow: { flexDirection: 'row', alignItems: 'baseline' },
  emissionVal: { fontFamily: 'Inter-Bold', fontSize: 32, letterSpacing: -1 },
  emissionUnit: { fontFamily: 'Inter-Bold', fontSize: 16, color: colors.textMuted, marginLeft: 4 },
  awsBadge: { backgroundColor: '#ff555520', paddingHorizontal: 8, paddingVertical: 4, marginTop: 4, borderRadius: 8 },
  awsBadgeText: { fontFamily: 'JetBrains Mono', fontSize: 11, color: '#ff5555' },
  gcpTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gcpBadge: { backgroundColor: '#50FA7B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  gcpBadgeText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10, color: '#003912' },
  
  chartCard: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', padding: 16, gap: 16, borderRadius: 12 },
  chartTitle: { fontFamily: 'JetBrainsMono-Bold', fontSize: 12, color: colors.textMuted, letterSpacing: 1 },
  chartRows: { gap: 12 },
  barGroup: { gap: 4 },
  barHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  barProvider: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textHeader },
  barVal: { fontFamily: 'JetBrains Mono', fontSize: 12 },
  barTrack: { height: 16, backgroundColor: '#252525', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 8, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 8 }
});
