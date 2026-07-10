import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../../src/theme/colors';
import { carbonApi } from '../../src/services/api/endpoints';

export default function ConfigScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [provider, setProvider] = useState('aws');
  const [region, setRegion] = useState('ap-south-1');
  const [instanceType, setInstanceType] = useState('t3.medium');
  const [instanceCount, setInstanceCount] = useState(4);
  const [hoursPerMonth, setHoursPerMonth] = useState(720);
  const [cpuUtilization, setCpuUtilization] = useState(0.4);
  const [storageGb, setStorageGb] = useState(20);
  const [loading, setLoading] = useState(false);

  const PROVIDER_DATA = {
    aws: {
      regions: [
        { label: "🇮🇳 Mumbai — ap-south-1", value: "ap-south-1" },
        { label: "🇺🇸 N. Virginia — us-east-1", value: "us-east-1" },
        { label: "🇮🇪 Ireland — eu-west-1", value: "eu-west-1" }
      ],
      defaultInstance: "t3.medium"
    },
    gcp: {
      regions: [
        { label: "🇮🇳 Mumbai — asia-south1", value: "asia-south1" },
        { label: "🇺🇸 N. Virginia — us-east4", value: "us-east4" },
        { label: "🇧🇪 Belgium — europe-west1", value: "europe-west1" }
      ],
      defaultInstance: "e2-medium"
    },
    azure: {
      regions: [
        { label: "🇮🇳 Pune — centralindia", value: "centralindia" },
        { label: "🇺🇸 Virginia — eastus", value: "eastus" },
        { label: "🇮🇪 Ireland — northeurope", value: "northeurope" }
      ],
      defaultInstance: "Standard_B2s"
    }
  };

  const handleProviderChange = (p: string) => {
    setProvider(p);
    const data = PROVIDER_DATA[p as keyof typeof PROVIDER_DATA];
    setRegion(data.regions[0].value);
    setInstanceType(data.defaultInstance);
  };

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

  // --- Extract result values ---
  const emissionLevel = resultData?.co2KgMonth ? resultData.co2KgMonth.toFixed(1) : '33.8';
  const resultProvider = resultData?.provider?.toUpperCase() || provider.toUpperCase();
  const resultInstance = resultData?.instanceType || instanceType;
  const resultRegion = resultData?.region || region;
  const drivingKm = resultData?.co2KgMonth ? Math.round(resultData.co2KgMonth * 4.3) : 145;

  // ============================================================
  //  INLINE RESULTS VIEW
  // ============================================================
  if (showResults) {
    return (
      <View style={styles.container}>
        {/* TopAppBar — same as config */}
        <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
          <View style={styles.topBarLeft}>
            <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
            <Text style={styles.logo}>CarboniX</Text>
          </View>
          <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcons name="notifications" size={24} color={colors.textMuted} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* @ts-ignore */ router.push('/profile') }} style={styles.avatar}>
              <MaterialIcons name="person" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView ref={scrollRef} contentContainerStyle={styles.resultContent} showsVerticalScrollIndicator={false}>
          
          {/* Sub-Nav Header */}
          <View style={styles.subNav}>
            <TouchableOpacity style={styles.subNavLeft} onPress={handleRecalculate}>
              <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
              <Text style={styles.subNavTitle}>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="share" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Config Summary Chips */}
          <View style={styles.chipsRow}>
            <View style={styles.rChip}>
              <Text style={styles.rChipText}>{resultProvider}</Text>
            </View>
            <View style={styles.rChip}>
              <Text style={styles.rChipText}>{resultInstance}</Text>
            </View>
            <View style={styles.rChip}>
              <Text style={styles.rChipText}>{resultRegion}</Text>
            </View>
          </View>

          {/* Hero CO2 Card */}
          <View style={[styles.resultCard, styles.heroCard]}>
            <View style={styles.heroWarningBg}>
              <MaterialIcons name="warning" size={100} color="rgba(255, 180, 171, 0.1)" />
            </View>
            <Text style={styles.criticalLabel}>CRITICAL EMISSION LEVEL</Text>
            <View style={styles.emissionValueRow}>
              <Text style={styles.emissionValue}>{emissionLevel}</Text>
              <Text style={styles.emissionUnit}>kg CO₂e</Text>
            </View>

            <View style={styles.realWorldStrip}>
              <MaterialIcons name="directions-car" size={16} color={colors.textMuted} />
              <Text style={styles.realWorldText} numberOfLines={2}>
                ≈ driving {drivingKm} km in a gas-powered vehicle
              </Text>
            </View>
          </View>

          {/* Energy Breakdown Card */}
          <View style={styles.resultCard}>
            <Text style={styles.resultCardTitle}>Energy Breakdown</Text>
            <View style={styles.stackedBarContainer}>
              <View style={[styles.barSegment, { width: '60%', backgroundColor: colors.primaryContainer }]} />
              <View style={[styles.barSegment, { width: '30%', backgroundColor: '#83251b' }]} />
              <View style={[styles.barSegment, { width: '10%', backgroundColor: colors.surfaceContainerHighest }]} />
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primaryContainer }]} />
                <Text style={styles.legendText}>Compute</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#83251b' }]} />
                <Text style={styles.legendText}>Memory</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.surfaceContainerHighest }]} />
                <Text style={styles.legendText}>Storage</Text>
              </View>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Grid Int.</Text>
                <Text style={styles.statValue}>420 g/kWh</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>PUE</Text>
                <Text style={styles.statValue}>1.15</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total E</Text>
                <Text style={styles.statValue}>80 kWh</Text>
              </View>
            </View>
          </View>

          {/* Recommendation Card */}
          <View style={[styles.resultCard, styles.recommendationCard]}>
            <View style={styles.recIconWrap}>
              <MaterialIcons name="lightbulb" size={24} color={colors.primaryContainer} />
            </View>
            <View style={styles.recContent}>
              <Text style={styles.recTitle}>Optimization Available</Text>
              <Text style={styles.recDesc}>
                Switch region to <Text style={styles.recHighlight}>eu-north-1</Text> to reduce carbon footprint.
              </Text>
              <View style={styles.recBadge}>
                <Text style={styles.recBadgeText}>↓ Reduce emissions by 98%</Text>
              </View>
            </View>
          </View>

          {/* Recalculate */}
          <TouchableOpacity style={styles.ghostBtn} onPress={handleRecalculate}>
            <MaterialIcons name="undo" size={20} color={colors.primaryContainer} />
            <Text style={styles.ghostBtnText}>Recalculate</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }

  // ============================================================
  //  CONFIG FORM (your original layout, untouched)
  // ============================================================
  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcons name="notifications" size={24} color={colors.textMuted} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* @ts-ignore */ router.push('/profile') }} style={styles.avatar}>
              <MaterialIcons name="person" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <MaterialIcons name="memory" size={24} color={colors.onPrimaryContainer} />
          <Text style={styles.heroTitle}>Configure Infrastructure</Text>
        </View>

        {/* Cloud Provider Selector */}
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

        {/* Region Dropdown & Warning */}
        <View style={styles.card}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={region}
              onValueChange={setRegion}
              style={styles.picker}
              dropdownIconColor={colors.textHeader}
            >
              {PROVIDER_DATA[provider as keyof typeof PROVIDER_DATA].regions.map((r) => (
                <Picker.Item key={r.value} label={r.label} value={r.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.warningBadge}>
            <MaterialIcons name="warning" size={14} color={colors.error} />
            <Text style={styles.warningText}>High Carbon Grid</Text>
          </View>
        </View>

        {/* Instance Configuration */}
        <View style={styles.card}>
          <View style={styles.instanceSelectRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialIcons name="search" size={16} color={colors.textMuted} />
              <Text style={styles.instanceTypeText}>{instanceType}</Text>
            </View>
            <View style={styles.instanceSpecs}>
              <Text style={styles.instanceSpecsText}>2 vCPU / 4 GiB</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {['General Purpose', 'Compute', 'Memory', 'Storage'].map((type, i) => (
              <TouchableOpacity key={i} style={[styles.chip, i === 0 && styles.chipActive]}>
                <Text style={[styles.chipText, i === 0 && styles.chipTextActive]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Server Count */}
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

        {/* Sliders */}
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
              minimumTrackTintColor={colors.primaryContainer}
              maximumTrackTintColor={colors.surface}
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
              minimumTrackTintColor={colors.primaryContainer}
              maximumTrackTintColor={colors.surface}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>

        {/* Grid Inputs */}
        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>STORAGE</Text>
            <Text style={styles.gridItemValue}>20<Text style={styles.gridItemUnit}>GB</Text></Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>EXTRA RAM</Text>
            <Text style={styles.gridItemValue}>4<Text style={styles.gridItemUnit}>GB</Text></Text>
          </View>
        </View>

        {/* Primary Button */}
        <TouchableOpacity style={styles.primaryBtn} onPress={handleCalculate} activeOpacity={0.8}>
          <MaterialIcons name="bolt" size={24} color={colors.onPrimaryContainer} />
          <Text style={styles.primaryBtnText}>{loading ? 'CALCULATING...' : 'Calculate Emissions'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 12,
    backgroundColor: colors.secondary,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100,
    gap: 16,
  },
  heroBanner: {
    backgroundColor: colors.primaryContainer,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },
  providerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  providerBtn: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  providerBtnActive: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: colors.primary,
      borderRadius: 12,
  },
  providerBtnText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textHeader,
  },
  providerBtnTextActive: {
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  pickerWrapper: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    color: colors.textHeader,
    fontFamily: 'JetBrains Mono',
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#93000a', // error-container
    borderWidth: 1,
    borderColor: colors.error,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  warningText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.error,
  },
  instanceSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  instanceTypeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textHeader,
  },
  instanceSpecs: {
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  instanceSpecsText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  chipRow: {
    gap: 8,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipActive: {
    backgroundColor: colors.surfaceContainerHigh,
      borderRadius: 12,
  },
  chipText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  chipTextActive: {
    color: colors.primary,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    fontWeight: '900',
    color: colors.primary,
  },
  sliderGroup: {
    gap: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderValueText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  gridItemValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 24,
    fontWeight: '700',
    color: colors.textHeader,
  },
  gridItemUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
  },
  primaryBtn: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  primaryBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },

  // ============================================================
  //  RESULTS STYLES
  // ============================================================
  resultContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 100,
  },
  subNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    marginBottom: 8,
  },
  subNavLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subNavTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.textHeader,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  rChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surfaceContainerHigh,
  },
  rChipText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  resultCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: 16,
    gap: 16,
    borderRadius: 12,
  },
  heroCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    overflow: 'hidden',
  },
  heroWarningBg: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  criticalLabel: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.error,
    letterSpacing: 1.1,
  },
  emissionValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  emissionValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 48,
    fontWeight: '700',
    color: colors.error,
  },
  emissionUnit: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.error,
  },
  realWorldStrip: {
    marginTop: 8,
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
  },
  realWorldText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
    flexShrink: 1,
  },
  resultCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.textHeader,
  },
  stackedBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 12,
  },
  barSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    paddingBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 12,
  },
  legendText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: 8,
    borderRadius: 12,
  },
  statLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textHeader,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.primaryContainer,
    gap: 16,
      borderRadius: 12,
  },
  recIconWrap: {
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 197, 24, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  recContent: {
    flex: 1,
    gap: 8,
  },
  recTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryContainer,
  },
  recDesc: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: colors.textMuted,
  },
  recHighlight: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textHeader,
  },
  recBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(49, 227, 104, 0.1)',
    borderWidth: 1,
    borderColor: '#31e368',
    borderRadius: 12,
  },
  recBadgeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#31e368',
  },
  ghostBtn: {
    marginTop: 16,
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
  },
  ghostBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryContainer,
  },
});
