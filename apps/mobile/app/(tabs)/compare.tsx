import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';

export default function CompareProvidersScreen() {
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

      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>COMPARE PROVIDERS</Text>
          <Text style={styles.subtitle}>REAL-TIME CARBON EMISSION RANKING</Text>
        </View>

        {/* Insight Banner */}
        <View style={styles.insightBanner}>
          <MaterialIcons name="info" size={24} color={colors.onPrimaryContainer} />
          <View style={styles.insightTextCol}>
            <Text style={styles.insightTitle}>GCP eu-north-1 emits 98% less</Text>
            <Text style={styles.insightDesc}>Based on isolated 1hr compute simulation vs AWS equivalent.</Text>
          </View>
        </View>

        {/* Provider Cards Container */}
        <View style={styles.cardsContainer}>
          
          {/* Card 1: AWS */}
          <View style={[styles.card, styles.cardAws]}>
            <View>
              <Text style={styles.providerName}>AWS</Text>
              <Text style={styles.providerRegion}>eu-west-1</Text>
            </View>
            <View style={styles.providerStats}>
              <View style={styles.emissionRow}>
                <Text style={[styles.emissionVal, { color: colors.error }]}>33.8</Text>
                <Text style={styles.emissionUnit}>kg</Text>
              </View>
              <View style={styles.awsBadge}>
                <Text style={styles.awsBadgeText}>↑ 51× vs GCP</Text>
              </View>
            </View>
          </View>

          {/* Card 2: GCP (Winner) */}
          <View style={[styles.card, styles.cardGcp]}>
            <View>
              <View style={styles.gcpTitleRow}>
                <Text style={[styles.providerName, { color: '#90ff9e' }]}>GCP</Text>
                <View style={styles.gcpBadge}>
                  <Text style={styles.gcpBadgeText}>🏆 LOWEST</Text>
                </View>
              </View>
              <Text style={styles.providerRegion}>eu-north-1</Text>
            </View>
            <View style={styles.providerStats}>
              <View style={styles.emissionRow}>
                <Text style={[styles.emissionVal, { color: '#90ff9e' }]}>0.67</Text>
                <Text style={[styles.emissionUnit, { color: 'rgba(144,255,158,0.7)' }]}>kg</Text>
              </View>
            </View>
          </View>

          {/* Card 3: Azure */}
          <View style={[styles.card, styles.cardAzure]}>
            <View>
              <Text style={styles.providerName}>Azure</Text>
              <Text style={styles.providerRegion}>northeurope</Text>
            </View>
            <View style={styles.providerStats}>
              <View style={styles.emissionRow}>
                <Text style={[styles.emissionVal, { color: colors.error }]}>28.1</Text>
                <Text style={styles.emissionUnit}>kg</Text>
              </View>
            </View>
          </View>

        </View>

        {/* Bar Chart Card */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>CO₂ EMISSION COMPARISON (kg)</Text>
          <View style={styles.chartRows}>
            
            {/* AWS Bar */}
            <View style={styles.barGroup}>
              <View style={styles.barHeader}>
                <Text style={styles.barProvider}>AWS</Text>
                <Text style={[styles.barVal, { color: colors.error }]}>33.8</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '100%', backgroundColor: colors.error }]} />
              </View>
            </View>

            {/* Azure Bar */}
            <View style={styles.barGroup}>
              <View style={styles.barHeader}>
                <Text style={styles.barProvider}>Azure</Text>
                <Text style={[styles.barVal, { color: colors.error }]}>28.1</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '83%', backgroundColor: colors.error }]} />
              </View>
            </View>

            {/* GCP Bar */}
            <View style={styles.barGroup}>
              <View style={styles.barHeader}>
                <Text style={[styles.barProvider, { color: '#90ff9e' }]}>GCP</Text>
                <Text style={[styles.barVal, { color: '#90ff9e' }]}>0.67</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '2%', minWidth: 4, backgroundColor: '#90ff9e', shadowColor: '#90ff9e', shadowOpacity: 0.5, shadowRadius: 10, elevation: 4 }]} />
              </View>
            </View>

          </View>
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
    paddingTop: 8, // Safety for status bar
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
  main: {
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
    fontWeight: '900',
    color: colors.textHeader,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
    letterSpacing: 0.7,
  },
  insightBanner: {
    backgroundColor: colors.primaryContainer,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0c110', // primary-fixed-dim
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
      borderRadius: 12,
  },
  insightTextCol: {
    flex: 1,
  },
  insightTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },
  insightDesc: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.onPrimaryContainer,
    opacity: 0.8,
    marginTop: 4,
  },
  cardsContainer: {
    gap: 8,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#1E1E1E', // layer-1
    borderWidth: 1,
    borderColor: '#2A2A2A', // tech-border
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
      borderRadius: 12,
  },
  cardAws: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  cardAzure: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  cardGcp: {
    borderLeftWidth: 4,
    borderLeftColor: '#90ff9e',
    borderColor: '#90ff9e',
    backgroundColor: 'rgba(144,255,158,0.05)',
      borderRadius: 12,
  },
  providerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.textHeader,
  },
  providerRegion: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  providerStats: {
    alignItems: 'flex-end',
  },
  emissionRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  emissionVal: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  emissionUnit: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.textMuted,
    marginLeft: 4,
  },
  awsBadge: {
    borderWidth: 1,
    borderColor: 'rgba(255,180,171,0.3)',
    backgroundColor: 'rgba(255,180,171,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
      borderRadius: 12,
  },
  awsBadgeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.error,
    letterSpacing: 1.1,
  },
  gcpTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gcpBadge: {
    backgroundColor: '#90ff9e',
    paddingHorizontal: 8,
    paddingVertical: 4,
      borderRadius: 12,
  },
  gcpBadgeText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#003912', // on-tertiary
    letterSpacing: 1.1,
  },
  chartCard: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 16,
    gap: 16,
    marginTop: 8,
      borderRadius: 12,
  },
  chartTitle: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textMuted,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
    paddingBottom: 8,
  },
  chartRows: {
    gap: 8,
  },
  barGroup: {
    gap: 4,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barProvider: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textHeader,
  },
  barVal: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
  },
  barTrack: {
    height: 24,
    backgroundColor: '#252525', // layer-2
    borderWidth: 1,
    borderColor: '#2A2A2A',
      borderRadius: 12,
  },
  barFill: {
    height: '100%',
  }
});
