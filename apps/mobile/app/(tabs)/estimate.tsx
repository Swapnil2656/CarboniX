import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';

import { colors } from '../../src/theme/colors';
import { carbonApi, referenceApi } from '../../src/services/api/endpoints';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PLATFORM_UNDERLYING_PROVIDER: Record<string, string> = {
  VERCEL: 'aws',
  NETLIFY: 'aws',
  RENDER: 'aws',
  RAILWAY: 'gcp',
  HEROKU: 'aws',
  SUPABASE: 'aws',
  DIGITALOCEAN: 'aws',
  CLOUDFLARE_WORKERS: 'aws',
  CLOUDFLARE_PAGES: 'aws',
  DENO_DEPLOY: 'gcp',
};

const PLATFORM_REGION_MAP: Record<string, Array<{ code: string, name: string, underlying: string }>> = {
  VERCEL: [
    { code: 'iad1', name: 'US East (N. Virginia)', underlying: 'us-east-1' },
    { code: 'sfo1', name: 'US West (N. California)', underlying: 'us-west-2' },
    { code: 'arn1', name: 'EU North (Stockholm)', underlying: 'eu-north-1' },
    { code: 'sin1', name: 'SE Asia (Singapore)', underlying: 'ap-southeast-1' },
  ],
  NETLIFY: [
    { code: 'us-east-1', name: 'US East (N. Virginia)', underlying: 'us-east-1' },
    { code: 'eu-central-1', name: 'EU Central (Frankfurt)', underlying: 'eu-central-1' },
  ],
  RENDER: [
    { code: 'oregon', name: 'US West (Oregon)', underlying: 'us-west-2' },
    { code: 'frankfurt', name: 'EU Central (Frankfurt)', underlying: 'eu-central-1' },
  ],
  RAILWAY: [
    { code: 'us-west1', name: 'US West (Oregon)', underlying: 'us-west1' },
    { code: 'europe-west4', name: 'Europe West (Netherlands)', underlying: 'europe-west4' },
  ],
  HEROKU: [
    { code: 'us-east-1', name: 'US East (N. Virginia)', underlying: 'us-east-1' },
    { code: 'eu-west-1', name: 'EU West (Ireland)', underlying: 'eu-west-1' }
  ],
  SUPABASE: [
    { code: 'us-east-1', name: 'US East (N. Virginia)', underlying: 'us-east-1' },
    { code: 'eu-west-2', name: 'EU West (London)', underlying: 'eu-west-2' }
  ],
  DIGITALOCEAN: [
    { code: 'nyc1', name: 'New York', underlying: 'us-east-1' },
    { code: 'sfo3', name: 'San Francisco', underlying: 'us-west-2' },
    { code: 'fra1', name: 'Frankfurt', underlying: 'eu-central-1' }
  ],
  CLOUDFLARE_WORKERS: [
    { code: 'global', name: 'Global Edge Network', underlying: 'us-east-1' }
  ],
  CLOUDFLARE_PAGES: [
    { code: 'global', name: 'Global Edge Network', underlying: 'us-east-1' }
  ],
  DENO_DEPLOY: [
    { code: 'global', name: 'Global Edge Network', underlying: 'us-central1' }
  ]
};

export default function EstimateScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [mode, setMode] = useState<'calculate' | 'compare'>('calculate');
  const [deployType, setDeployType] = useState<'platform' | 'raw'>('platform');
  const [provider, setProvider] = useState('VERCEL');
  const [region, setRegion] = useState('iad1');

  const [instanceType, setInstanceType] = useState('t3.medium');
  const [instanceCount, setInstanceCount] = useState(1);
  const [hoursPerMonth, setHoursPerMonth] = useState(720);
  const [cpuUtilization, setCpuUtilization] = useState(0.4);
  const [storageGb, setStorageGb] = useState(20);

  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const scrollRef = useRef<ScrollView>(null);

  // When deployType changes, reset provider
  useEffect(() => {
    if (deployType === 'platform') {
      setProvider('VERCEL');
    } else {
      setProvider('aws');
    }
  }, [deployType]);

  const handleProviderChange = (p: string) => {
    setProvider(p);
    if (deployType === 'raw') {
      if (p === 'aws') setInstanceType('t3.medium');
      else if (p === 'gcp') setInstanceType('e2-medium');
      else if (p === 'azure') setInstanceType('Standard_B2s');
    }
  };

  const activeUnderlyingProvider = deployType === 'platform' ? PLATFORM_UNDERLYING_PROVIDER[provider] : provider;

  const { data: rankedRegionsRes, isLoading: regionsLoading } = useQuery({
    queryKey: ['rankedRegions', activeUnderlyingProvider],
    queryFn: () => referenceApi.getRegionsRanked(activeUnderlyingProvider),
  });

  const { data: instancesRes } = useQuery({
    queryKey: ['instances', activeUnderlyingProvider],
    queryFn: () => referenceApi.getInstances(activeUnderlyingProvider),
  });

  const availableInstances = instancesRes?.data || [];

  const underlyingRegions = rankedRegionsRes?.data || [];

  // Map back to platform regions or use raw
  let displayRegions: any[] = [];
  if (deployType === 'platform') {
    const pMap = PLATFORM_REGION_MAP[provider] || [];
    displayRegions = pMap.map(pr => {
      const uRegion = underlyingRegions.find((r: any) => r.code === pr.underlying);
      return {
        ...uRegion,
        code: pr.code,
        name: pr.name,
        gridIntensity: uRegion?.gridIntensity || 0,
        category: uRegion?.category || 'red'
      };
    });
  } else {
    displayRegions = underlyingRegions;
  }

  useEffect(() => {
    if (displayRegions.length > 0 && !displayRegions.find((r: any) => r.code === region)) {
      setRegion(displayRegions[0].code);
    }
  }, [displayRegions, provider]);

  useEffect(() => {
    if (availableInstances.length > 0 && !availableInstances.find((i: any) => i.name === instanceType)) {
      setInstanceType(availableInstances[0].name);
    }
  }, [availableInstances, provider]);

  const handleRun = async () => {
    setLoading(true);
    try {
      const payload = {
        provider: deployType === 'platform' ? provider : provider.toUpperCase(),
        region,
        instanceType,
        instanceCount,
        hoursPerMonth: Math.round(hoursPerMonth),
        cpuUtilization,
        storageGb,
        cpuCores: 8,
        memoryGb: 32,
        durationHours: 730
      };

      if (mode === 'calculate') {
        const response = await carbonApi.calculate(payload);
        setResultData(response.data || response);
      } else {
        const res = await carbonApi.compare(payload);
        setResultData(res.data);
      }
      setShowResults(true);
      setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: true }), 100);
    } catch (error: any) {
      console.error('Run Failed:', error);
      Alert.alert('Action Failed', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setResultData(null);
    setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: true }), 100);
  };

  const getRatingColor = (category: string) => {
    if (category === 'green' || category === 'A') return '#50FA7B';
    if (category === 'yellow' || category === 'B' || category === 'C') return '#f5c518';
    if (category === 'red' || category === 'D' || category === 'F') return '#ff5555';
    return colors.textMuted;
  };

  const renderCalculateResults = () => {
    const emissionLevel = resultData?.co2KgMonth ? resultData.co2KgMonth.toFixed(1) : '0.0';
    const drivingKm = resultData?.co2KgMonth ? Math.round(resultData.co2KgMonth * 4.3) : 0;
    
    return (
      <View style={styles.resultCard}>
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
          <Text style={styles.realWorldText}>≈ driving {drivingKm} km in a gas-powered vehicle</Text>
        </View>
      </View>
    );
  };

  const renderCompareResults = () => {
    if (!resultData?.options) return null;
    const allResults = [resultData.base, ...resultData.options].sort((a, b) => a.co2KgMonth - b.co2KgMonth);
    const best = allResults[0];
    const worst = allResults[allResults.length - 1];
    const savedPct = (100 - (best.co2KgMonth / worst.co2KgMonth) * 100).toFixed(0);

    return (
      <View style={styles.compareContainer}>
        <View style={styles.insightBanner}>
          <MaterialIcons name="savings" size={28} color="#f5c518" />
          <View style={styles.insightTextCol}>
            <Text style={styles.insightTitle}>Potential Savings: {savedPct}% CO₂</Text>
            <Text style={styles.insightDesc}>
              Switching to <Text style={{ color: '#fff', fontFamily: 'Inter-Bold' }}>{best.provider.toUpperCase()} {best.region}</Text> reduces emissions significantly.
            </Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {allResults.map((res: any, index: number) => {
            const isWinner = index === 0;
            const isWorst = index === allResults.length - 1;
            let cardStyle = styles.cardAws;
            if (res.provider.toLowerCase() === 'gcp') cardStyle = styles.cardGcp;
            if (res.provider.toLowerCase() === 'azure') cardStyle = styles.cardAzure;
            
            return (
              <View key={`${res.provider}-${res.region}`} style={[styles.providerCard, cardStyle]}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={[styles.providerName, isWinner && { color: '#50FA7B' }]}>{res.provider.toUpperCase()}</Text>
                    {isWinner && (
                      <View style={{ backgroundColor: '#50FA7B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                        <Text style={{ fontFamily: 'JetBrainsMono-Bold', fontSize: 10, color: '#003912' }}>BEST</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.providerRegion}>{res.region}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={styles.emissionValueRow}>
                    <Text style={[styles.emissionValue, { fontSize: 24 }, isWinner ? { color: '#50FA7B' } : { color: colors.textHeader }]}>{res.co2KgMonth.toFixed(1)}</Text>
                    <Text style={[styles.emissionUnit, isWinner && { color: 'rgba(80, 250, 123, 0.7)' }]}>kg</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const topBarBg = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['rgba(20, 20, 20, 0)', 'rgba(20, 20, 20, 1)'],
    extrapolate: 'clamp'
  });

  if (showResults) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top, backgroundColor: topBarBg, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, borderBottomWidth: 0 }]}>
          <View style={styles.topBarLeft}>
            <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
            <Text style={styles.logo}>CarboniX</Text>
          </View>
        </Animated.View>

        <Animated.ScrollView ref={scrollRef} contentContainerStyle={[styles.resultContent, { paddingTop: 56 + insets.top + 24 }]} showsVerticalScrollIndicator={false} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })} scrollEventThrottle={16}>
          <View style={styles.subNav}>
            <TouchableOpacity style={styles.subNavLeft} onPress={handleReset}>
              <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
              <Text style={styles.subNavTitle}>Results</Text>
            </TouchableOpacity>
          </View>

          {mode === 'calculate' ? renderCalculateResults() : renderCompareResults()}

          <TouchableOpacity style={styles.primaryBtn} onPress={handleReset}>
            <MaterialIcons name="refresh" size={24} color={colors.background} />
            <Text style={[styles.primaryBtnText, { color: colors.background }]}>New Estimate</Text>
          </TouchableOpacity>
        </Animated.ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top, backgroundColor: topBarBg, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, borderBottomWidth: 0 }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        </Animated.View>

      <Animated.ScrollView 
        ref={scrollRef} 
        contentContainerStyle={[styles.content, { paddingTop: 56 + insets.top + 24 }]} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={[colors.primary + '25', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280 + 56 + insets.top }}
        />
        
        {/* Mode Toggle */}
        <View style={styles.segmentControl}>
          <TouchableOpacity 
            style={[styles.segmentBtn, mode === 'calculate' && styles.segmentBtnActive]} 
            onPress={() => setMode('calculate')}
          >
            <Text style={[styles.segmentBtnText, mode === 'calculate' && styles.segmentBtnTextActive]}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.segmentBtn, mode === 'compare' && styles.segmentBtnActive]} 
            onPress={() => setMode('compare')}
          >
            <Text style={[styles.segmentBtnText, mode === 'compare' && styles.segmentBtnTextActive]}>Compare</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{mode === 'calculate' ? 'Calculate' : 'Compare'}</Text>
          <Text style={styles.subtitle}>{mode === 'calculate' ? 'Estimate compute emissions' : 'Cross-cloud footprint analysis'}</Text>
        </View>

        <View style={styles.card}>
          {mode === 'compare' && (
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
              <Text style={{ fontFamily: 'Inter', fontSize: 13, color: colors.textMuted, lineHeight: 20 }}>
                <Text style={{ fontFamily: 'Inter-Bold', color: colors.textHeader }}>How it works:</Text> Select your current or planned configuration below. CarboniX will automatically run this setup against optimal regions in AWS, GCP, and Azure to find the greenest alternative.
              </Text>
            </View>
          )}

          <Text style={styles.label}>HOW DO YOU DEPLOY?</Text>
          <View style={styles.deployTypeRow}>
            <TouchableOpacity 
              style={[styles.deployBtn, deployType === 'platform' && styles.deployBtnActive]}
              onPress={() => setDeployType('platform')}
            >
              <MaterialIcons name="rocket-launch" size={20} color={deployType === 'platform' ? colors.primary : colors.textMuted} />
              <Text style={[styles.deployBtnText, deployType === 'platform' && styles.deployBtnTextActive]}>Platform (PaaS)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.deployBtn, deployType === 'raw' && styles.deployBtnActive]}
              onPress={() => setDeployType('raw')}
            >
              <MaterialIcons name="cloud" size={20} color={deployType === 'raw' ? colors.primary : colors.textMuted} />
              <Text style={[styles.deployBtnText, deployType === 'raw' && styles.deployBtnTextActive]}>Raw Cloud</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.providerRow}>
          {(deployType === 'platform' ? ['VERCEL', 'RENDER', 'RAILWAY', 'NETLIFY', 'HEROKU', 'SUPABASE', 'DIGITALOCEAN', 'CLOUDFLARE_WORKERS', 'CLOUDFLARE_PAGES', 'DENO_DEPLOY'] : ['aws', 'gcp', 'azure']).map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.providerBtn, provider === p && styles.providerBtnActive]}
              onPress={() => handleProviderChange(p)}
            >
              <Text style={[styles.providerBtnText, provider === p && styles.providerBtnTextActive]}>
                {p.replace('_', ' ').toUpperCase()}
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
              {displayRegions.map((r: any) => {
                const color = getRatingColor(r.category);
                return (
                  <TouchableOpacity 
                    key={r.code} 
                    style={[styles.regionCard, region === r.code && { borderColor: color, backgroundColor: color + '15' }]}
                    onPress={() => setRegion(r.code)}
                  >
                    <View style={styles.regionLeft}>
                      <View style={[styles.regionDot, { backgroundColor: color }]} />
                      <View>
                        <Text style={[styles.regionName, region === r.code && { color: colors.textHeader }]}>{r.code}</Text>
                        {r.name && <Text style={[styles.regionName, { fontSize: 10, color: colors.textMuted, marginTop: 2 }]}>{r.name}</Text>}
                      </View>
                    </View>
                    <View style={styles.regionRight}>
                      <Text style={styles.regionCo2}>{r.gridIntensity?.toFixed(0) || 'N/A'} g/kWh</Text>
                      <View style={[styles.regionBadge, { backgroundColor: color + '30', borderColor: color }]}>
                        <Text style={[styles.regionBadgeText, { color }]}>{r.category ? r.category.charAt(0).toUpperCase() : 'N/A'}</Text>
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
          <View style={[styles.instanceSelectRow, { padding: 0, paddingLeft: 8 }]}>
            <Picker
              selectedValue={instanceType}
              onValueChange={(val) => setInstanceType(val)}
              dropdownIconColor={colors.textMuted}
              style={{ color: colors.textHeader, backgroundColor: 'transparent', width: '100%' }}
            >
              {availableInstances.map((inst: any) => (
                <Picker.Item 
                  key={inst.id} 
                  label={`${inst.name} (${inst.vcpu} vCPU, ${inst.memoryGb}GB)`} 
                  value={inst.name} 
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <Text style={styles.label}>INSTANCES</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <TouchableOpacity style={styles.stepperBtn} onPress={() => setInstanceCount(c => Math.max(1, c - 1))}>
                  <MaterialIcons name="remove" size={18} color={colors.textMuted} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 24, color: colors.primary }}>{instanceCount}</Text>
                <TouchableOpacity style={styles.stepperBtn} onPress={() => setInstanceCount(c => c + 1)}>
                  <MaterialIcons name="add" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.label}>UPTIME</Text>
                  <Text style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: colors.primary }}>{hoursPerMonth}h / mo</Text>
                </View>
                {/* @ts-ignore */}
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={1} maximumValue={720}
                  value={hoursPerMonth} onValueChange={(val: number) => setHoursPerMonth(Math.round(val))}
                  minimumTrackTintColor={colors.primary} maximumTrackTintColor={'#2A2A2A'} thumbTintColor={colors.primary}
                />
              </View>
              <View style={{ gap: 8, marginTop: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.label}>AVG CPU UTIL</Text>
                  <Text style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: colors.primary }}>{Math.round(cpuUtilization * 100)}%</Text>
                </View>
                {/* @ts-ignore */}
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0} maximumValue={1}
                  value={cpuUtilization} onValueChange={setCpuUtilization}
                  minimumTrackTintColor={colors.primary} maximumTrackTintColor={'#2A2A2A'} thumbTintColor={colors.primary}
                />
              </View>
            </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleRun} activeOpacity={0.8}>
          <MaterialIcons name="bolt" size={24} color={colors.background} />
          <Text style={[styles.primaryBtnText, { color: colors.background }]}>
            {loading ? 'RUNNING...' : (mode === 'calculate' ? 'Calculate Emissions' : 'Run Comparison')}
          </Text>
        </TouchableOpacity>

      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, backgroundColor: 'transparent',
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 56, height: 56, resizeMode: 'contain' },
  logo: { fontFamily: 'Inter-Bold', fontSize: 20, fontWeight: '900', color: colors.primary, letterSpacing: -0.5, marginLeft: -8 },
  content: { paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100, gap: 16 },
  header: { gap: 4 },
  title: { fontFamily: 'Inter-Bold', fontSize: 36, color: colors.textHeader, letterSpacing: -1 },
  subtitle: { fontFamily: 'Inter', fontSize: 16, color: colors.textMuted },
  
  segmentControl: { flexDirection: 'row', backgroundColor: '#1E1E1E', borderRadius: 12, padding: 4, borderWidth: 1, borderColor: '#2A2A2A' },
  segmentBtn: { width: '50%', paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  segmentBtnActive: { backgroundColor: '#2A2A2A' },
  segmentBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: colors.textMuted },
  segmentBtnTextActive: { color: colors.textHeader },

  deployTypeRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  deployBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#252525', paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#2A2A2A' },
  deployBtnActive: { backgroundColor: 'rgba(255, 229, 160, 0.1)', borderColor: colors.primary },
  deployBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: colors.textMuted },
  deployBtnTextActive: { color: colors.primary },
  
  providerRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  providerBtn: { flex: 1, minWidth: '48%', backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  providerBtnActive: { backgroundColor: 'rgba(255, 229, 160, 0.1)', borderColor: colors.primary },
  providerBtnText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 14, color: colors.textMuted },
  providerBtnTextActive: { color: colors.primary },

  card: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, padding: 16, gap: 16 },
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
  stepperBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#252525', alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 8 },
  primaryBtnText: { fontFamily: 'Inter-Bold', fontSize: 18 },

  resultContent: { paddingHorizontal: 20, paddingVertical: 24, gap: 16, paddingBottom: 100 },
  subNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A2A', marginBottom: 8 },
  subNavLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subNavTitle: { fontFamily: 'Inter-Bold', fontSize: 20, color: colors.textHeader },
  
  resultCard: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', padding: 16, gap: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: colors.primary, overflow: 'hidden' },
  heroWarningBg: { position: 'absolute', top: 16, right: 16 },
  criticalLabel: { fontFamily: 'JetBrainsMono-Medium', fontSize: 12, color: colors.textMuted, letterSpacing: 1.1 },
  emissionValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  emissionValue: { fontFamily: 'Inter-Bold', fontSize: 48, color: colors.textHeader, letterSpacing: -2 },
  emissionUnit: { fontFamily: 'JetBrains Mono', fontSize: 14, color: colors.textMuted },
  realWorldStrip: { marginTop: 8, backgroundColor: '#252525', paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 10 },
  realWorldText: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },

  compareContainer: { gap: 16 },
  insightBanner: { backgroundColor: '#1E1E1E', padding: 16, borderWidth: 1, borderColor: '#f5c518', flexDirection: 'row', alignItems: 'center', gap: 16, borderRadius: 12 },
  insightTextCol: { flex: 1 },
  insightTitle: { fontFamily: 'Inter-Bold', fontSize: 16, color: '#f5c518' },
  insightDesc: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted, marginTop: 4, lineHeight: 20 },
  cardsContainer: { gap: 8 },
  providerCard: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12 },
  cardAws: { borderLeftWidth: 4, borderLeftColor: colors.textMuted },
  cardAzure: { borderLeftWidth: 4, borderLeftColor: colors.textMuted },
  cardGcp: { borderLeftWidth: 4, borderLeftColor: '#50FA7B', borderColor: '#50FA7B', backgroundColor: 'rgba(80, 250, 123, 0.05)' },
  providerName: { fontFamily: 'Inter-Bold', fontSize: 20, color: colors.textHeader },
  providerRegion: { fontFamily: 'JetBrains Mono', fontSize: 14, color: colors.textMuted, marginTop: 4 },
});
