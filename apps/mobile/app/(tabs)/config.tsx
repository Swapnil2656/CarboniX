import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

import { colors } from '../../src/theme/colors';
import { carbonApi, referenceApi } from '../../src/services/api/endpoints';

export default function ConfigScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [provider, setProvider] = useState('aws');
  const [region, setRegion] = useState('ap-south-1');
  const [instanceType, setInstanceType] = useState('t3.medium');
  const [instanceCount, setInstanceCount] = useState(1);
  const [hoursPerMonth, setHoursPerMonth] = useState(720);
  const [cpuUtilization, setCpuUtilization] = useState(0.4);
  const [storageGb, setStorageGb] = useState(20);
  const [loading, setLoading] = useState(false);

  // Initialize from params if recalculating
  useEffect(() => {
    if (params.recalc === 'true') {
      if (params.provider) setProvider(params.provider as string);
      if (params.region) setRegion(params.region as string);
      if (params.instanceType) setInstanceType(params.instanceType as string);
      if (params.count) setInstanceCount(Number(params.count));
      if (params.uptime) setHoursPerMonth(Number(params.uptime));
      if (params.cpu) setCpuUtilization(Number(params.cpu));
      if (params.storage) setStorageGb(Number(params.storage));
    }
  }, [params]);

  // Fetch Ranked Regions
  const { data: rankedRegionsRes, isLoading: regionsLoading } = useQuery({
    queryKey: ['rankedRegions', provider],
    queryFn: () => referenceApi.getRegionsRanked(provider),
  });
  
  const regions = rankedRegionsRes?.data || [];

  const handleProviderChange = (p: string) => {
    setProvider(p);
    if (p === 'aws') setInstanceType('t3.medium');
    else if (p === 'gcp') setInstanceType('e2-medium');
    else if (p === 'azure') setInstanceType('Standard_B2s');
  };

  useEffect(() => {
    // Select first region automatically when regions load
    if (regions.length > 0 && !regions.find((r: any) => r.regionName === region)) {
      setRegion(regions[0].regionName);
    }
  }, [regions]);

  // Inline results state
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const scrollRef = useRef<ScrollView>(null);

  const incrementCount = () => setInstanceCount(c => c + 1);
  const decrementCount = () => setInstanceCount(c => Math.max(1, c - 1));

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const payload = {
        provider,
        region,
        instanceType,
        instanceCount,
        hoursPerMonth: Math.round(hoursPerMonth),
        cpuUtilization,
        storageGb
      };

      const response = await carbonApi.calculate(payload);
      const data = response.data || response;
      setResultData(data);
      setShowResults(true);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
    } catch (error: any) {
      Alert.alert('Calculation Failed', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = () => {
    setShowResults(false);
    setResultData(null);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  const emissionLevel = resultData?.co2KgMonth ? resultData.co2KgMonth.toFixed(1) : '0.0';
  const resultProvider = resultData?.provider?.toUpperCase() || provider.toUpperCase();
  const resultInstance = resultData?.instanceType || instanceType;
  const resultRegion = resultData?.region || region;
  const drivingKm = resultData?.co2KgMonth ? Math.round(resultData.co2KgMonth * 4.3) : 0;
  
  const getRatingColor = (rating: string) => {
    if (rating === 'A') return '#50FA7B';
    if (rating === 'B') return '#90ff9e';
    if (rating === 'C') return '#f5c518';
    if (rating === 'D') return '#ffb86c';
    if (rating === 'F') return '#ff5555';
    return colors.textMuted;
  };

  if (showResults) {
    return (
      <View style={styles.container}>
        <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
          <View style={styles.topBarLeft}>
            <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
            <Text style={styles.logo}>CarboniX</Text>
          </View>
        </View>

        <ScrollView ref={scrollRef} contentContainerStyle={styles.resultContent} showsVerticalScrollIndicator={false}>
          <View style={styles.subNav}>
            <TouchableOpacity style={styles.subNavLeft} onPress={handleRecalculate}>
              <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
              <Text style={styles.subNavTitle}>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="share" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.chipsRow}>
            <View style={styles.rChip}><Text style={styles.rChipText}>{resultProvider}</Text></View>
            <View style={styles.rChip}><Text style={styles.rChipText}>{resultInstance}</Text></View>
            <View style={styles.rChip}><Text style={styles.rChipText}>{resultRegion}</Text></View>
          </View>

          <View style={[styles.resultCard, styles.heroCard]}>
            <View style={styles.heroWarningBg}>
              <MaterialIcons name="cloud-queue" size={100} color="rgba(255, 255, 255, 0.05)" />
            </View>
            <Text style={styles.criticalLabel}>CALCULATED EMISSION</Text>
            <View style={styles.emissionValueRow}>
              <Text style={styles.emissionValue}>{emissionLevel}</Text>
              <Text style={styles.emissionUnit}>kg CO₂e</Text>
            </View>
            <View style={styles.realWorldStrip}>
              <MaterialIcons name="directions-car" size={16} color={colors.textMuted} />
              <Text style={styles.realWorldText}>
                ≈ driving {drivingKm} km in a gas-powered vehicle
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleRecalculate}>
            <MaterialIcons name="refresh" size={24} color={colors.background} />
            <Text style={[styles.primaryBtnText, { color: colors.background }]}>Recalculate</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Calculate</Text>
          <Text style={styles.subtitle}>Estimate compute emissions</Text>
        </View>

        <View style={styles.providerRow}>
          {['aws', 'gcp', 'azure'].map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.providerBtn, provider === p && styles.providerBtnActive]}
              onPress={() => handleProviderChange(p)}
            >
              <Text style={[styles.providerBtnText, provider === p && styles.providerBtnTextActive]}>
                {p.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>REGION HEATMAP</Text>
          {regionsLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <View style={styles.regionList}>
              {regions.map((r: any) => {
                const color = getRatingColor(r.rating);
                return (
                  <TouchableOpacity 
                    key={r.regionName} 
                    style={[styles.regionCard, region === r.regionName && { borderColor: color, backgroundColor: color + '15' }]}
                    onPress={() => setRegion(r.regionName)}
                  >
                    <View style={styles.regionLeft}>
                      <View style={[styles.regionDot, { backgroundColor: color }]} />
                      <Text style={[styles.regionName, region === r.regionName && { color: colors.textHeader }]}>{r.regionName}</Text>
                    </View>
                    <View style={styles.regionRight}>
                      <Text style={styles.regionCo2}>{r.gridCarbonIntensity.toFixed(0)} g/kWh</Text>
                      <View style={[styles.regionBadge, { backgroundColor: color + '30', borderColor: color }]}>
                        <Text style={[styles.regionBadgeText, { color }]}>{r.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>INSTANCE TYPE</Text>
          <View style={styles.instanceSelectRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialIcons name="search" size={16} color={colors.textMuted} />
              <Text style={styles.instanceTypeText}>{instanceType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.label}>INSTANCES</Text>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepperBtn} onPress={decrementCount}>
              <MaterialIcons name="remove" size={18} color={colors.textMuted} />
            </TouchableOpacity>
            <Text style={styles.stepperValue}>{instanceCount}</Text>
            <TouchableOpacity style={styles.stepperBtn} onPress={incrementCount}>
              <MaterialIcons name="add" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sliderGroup}>
            <View style={styles.sliderHeader}>
              <Text style={styles.label}>UPTIME</Text>
              <Text style={styles.sliderValueText}>{hoursPerMonth}h / mo</Text>
            </View>
            {/* @ts-ignore */}
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={720}
              value={hoursPerMonth}
              onValueChange={(val: number) => setHoursPerMonth(Math.round(val))}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={'#2A2A2A'}
              thumbTintColor={colors.primary}
            />
          </View>

          <View style={[styles.sliderGroup, { marginTop: 16 }]}>
            <View style={styles.sliderHeader}>
              <Text style={styles.label}>AVG CPU UTIL</Text>
              <Text style={styles.sliderValueText}>{Math.round(cpuUtilization * 100)}%</Text>
            </View>
            {/* @ts-ignore */}
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={cpuUtilization}
              onValueChange={setCpuUtilization}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={'#2A2A2A'}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleCalculate} activeOpacity={0.8}>
          <MaterialIcons name="bolt" size={24} color={colors.background} />
          <Text style={[styles.primaryBtnText, { color: colors.background }]}>{loading ? 'CALCULATING...' : 'Calculate Emissions'}</Text>
        </TouchableOpacity>

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
  content: { paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100, gap: 16 },
  header: { gap: 4 },
  title: { fontFamily: 'Inter-Bold', fontSize: 36, color: colors.textHeader, letterSpacing: -1 },
  subtitle: { fontFamily: 'Inter', fontSize: 16, color: colors.textMuted },
  
  providerRow: { flexDirection: 'row', gap: 8 },
  providerBtn: { flex: 1, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  providerBtnActive: { backgroundColor: 'rgba(255, 229, 160, 0.1)', borderColor: colors.primary },
  providerBtnText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 14, color: colors.textMuted },
  providerBtnTextActive: { color: colors.primary },

  card: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, padding: 16, gap: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, padding: 16 },
  
  label: { fontFamily: 'JetBrainsMono-Medium', fontSize: 13, color: colors.textMuted, letterSpacing: 1 },
  
  regionList: { gap: 8 },
  regionCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#252525', borderWidth: 1, borderColor: '#2A2A2A', padding: 12, borderRadius: 10 },
  regionLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  regionDot: { width: 10, height: 10, borderRadius: 5 },
  regionName: { fontFamily: 'JetBrains Mono', fontSize: 13, color: colors.textMuted },
  regionRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  regionCo2: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
  regionBadge: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  regionBadgeText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 12 },

  instanceSelectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#252525', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12 },
  instanceTypeText: { fontFamily: 'JetBrains Mono', fontSize: 14, color: colors.textHeader },

  stepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stepperBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#252525', alignItems: 'center', justifyContent: 'center' },
  stepperValue: { fontFamily: 'Inter-Bold', fontSize: 24, color: colors.primary },

  sliderGroup: { gap: 8 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderValueText: { fontFamily: 'JetBrains Mono', fontSize: 13, color: colors.primary },
  slider: { width: '100%', height: 40 },

  primaryBtn: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 8 },
  primaryBtnText: { fontFamily: 'Inter-Bold', fontSize: 18 },

  resultContent: { paddingHorizontal: 20, paddingVertical: 24, gap: 16, paddingBottom: 100 },
  subNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A2A', marginBottom: 8 },
  subNavLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subNavTitle: { fontFamily: 'Inter-Bold', fontSize: 20, color: colors.textHeader },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  rChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', backgroundColor: '#1E1E1E' },
  rChipText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
  resultCard: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', padding: 16, gap: 16, borderRadius: 12 },
  heroCard: { borderLeftWidth: 4, borderLeftColor: colors.primary, overflow: 'hidden' },
  heroWarningBg: { position: 'absolute', top: 16, right: 16 },
  criticalLabel: { fontFamily: 'JetBrainsMono-Medium', fontSize: 12, color: colors.textMuted, letterSpacing: 1.1 },
  emissionValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  emissionValue: { fontFamily: 'Inter-Bold', fontSize: 48, color: colors.textHeader, letterSpacing: -2 },
  emissionUnit: { fontFamily: 'JetBrains Mono', fontSize: 14, color: colors.textMuted },
  realWorldStrip: { marginTop: 8, backgroundColor: '#252525', paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 10 },
  realWorldText: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },
});
