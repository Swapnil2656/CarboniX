import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';

export default function CalculationResultsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse data (stubbed or using real data if available)
  let data: any = {};
  try {
    if (params.data) {
      data = JSON.parse(params.data as string);
    }
  } catch (e) {
    console.error(e);
  }

  // Assuming data structure or default to match HTML
  const emissionLevel = data.co2KgMonth ? data.co2KgMonth.toFixed(1) : '33.8';
  const provider = data.provider?.toUpperCase() || 'AWS';
  const instanceType = data.instanceType || 'c5.2xlarge';
  const region = data.region || 'us-east-1';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
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
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* Task-Specific Sub-Nav Header */}
        <View style={styles.subNav}>
          <TouchableOpacity style={styles.subNavLeft} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
            <Text style={styles.subNavTitle}>Results</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="ios-share" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Config Summary Chips */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{provider}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{instanceType}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{region}</Text>
          </View>
        </View>

        {/* Hero CO2 Card (High Rating Coral Tint) */}
        <View style={[styles.card, styles.heroCard]}>
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
            <Text style={styles.realWorldText}>≈ driving 145 km in a gas-powered vehicle</Text>
          </View>
        </View>

        {/* Energy Breakdown Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Energy Breakdown</Text>
          
          {/* Stacked Bar Chart */}
          <View style={styles.stackedBarContainer}>
            <View style={[styles.barSegment, { width: '60%', backgroundColor: colors.primaryContainer }]} />
            <View style={[styles.barSegment, { width: '30%', backgroundColor: '#83251b' }]} />
            <View style={[styles.barSegment, { width: '10%', backgroundColor: colors.surfaceContainerHighest }]} />
          </View>

          {/* Legend */}
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

          {/* 3-Column Stats Grid */}
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
        <View style={[styles.card, styles.recommendationCard]}>
          <View style={styles.recIconWrap}>
            <MaterialIcons name="lightbulb" size={24} color={colors.primaryContainer} />
          </View>
          <View style={styles.recContent}>
            <Text style={styles.recTitle}>Optimization Available</Text>
            <Text style={styles.recDesc}>
              Switch region to <Text style={styles.recHighlight}>eu-north-1</Text> to instantly reduce carbon footprint.
            </Text>
            <View style={styles.recBadge}>
              <Text style={styles.recBadgeText}>↓ Reduce emissions by 98%</Text>
            </View>
          </View>
        </View>

        {/* Ghost Button: Recalculate */}
        <TouchableOpacity style={styles.ghostBtn} onPress={() => router.back()}>
          <MaterialIcons name="undo" size={20} color={colors.primaryContainer} />
          <Text style={styles.ghostBtnText}>Recalculate</Text>
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
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 12,
    backgroundColor: colors.secondary,
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 40,
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
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surfaceContainerHigh,
  },
  chipText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  card: {
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
      borderRadius: 12,
  },
  realWorldText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  cardTitle: {
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
    flexDirection: 'column',
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
    shadowColor: colors.primaryContainer,
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
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
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
      borderRadius: 12,
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
  }
});
