import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { NeonButton } from '../../src/components/NeonButton';

export default function ResultsScreen() {
  const { id, data } = useLocalSearchParams<{ id: string; data: string }>();
  const router = useRouter();

  let resultData: any = {};
  try {
    if (data) resultData = JSON.parse(data);
  } catch (e) {}

  const rating = resultData.rating || 'LOW';
  const getRatingColor = () => {
    switch (rating) {
      case 'LOW': return colors.success;
      case 'MEDIUM': return colors.warning;
      case 'HIGH':
      case 'CRITICAL': return colors.error;
      default: return colors.success;
    }
  };

  const ratingColor = getRatingColor();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
        </TouchableOpacity>
        <Text style={styles.title}>Calculation Results</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.resultCard, { borderColor: ratingColor }]}>
        <View style={[styles.ratingBadge, { backgroundColor: `${ratingColor}33`, borderColor: ratingColor }]}>
          <Text style={[styles.ratingText, { color: ratingColor }]}>● {rating}</Text>
        </View>

        <Text style={[styles.mainNumber, { color: ratingColor }]}>
          {resultData.co2KgMonth?.toFixed(2) || '0.00'}
        </Text>
        <Text style={styles.unitText}>kg CO₂ / month</Text>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.detailLabel}>GRAMS / HOUR</Text>
            <Text style={styles.detailValue}>{resultData.co2GramsHour?.toFixed(1) || '0.0'} g</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>ENERGY</Text>
            <Text style={styles.detailValue}>{resultData.totalEnergyKwh?.toFixed(1) || '0.0'} kWh</Text>
          </View>
        </View>
      </View>

      <View style={styles.equivalentCard}>
        <MaterialIcons name="directions-car" size={24} color={colors.textMuted} />
        <Text style={styles.equivalentText}>{resultData.equivalentString || '≈ driving 0 km'}</Text>
      </View>

      {resultData.recommendation && (
        <View style={styles.recommendationCard}>
          <View style={styles.recHeader}>
            <MaterialIcons name="lightbulb" size={20} color={colors.warning} />
            <Text style={styles.recTitle}>Optimization Found</Text>
          </View>
          <Text style={styles.recText}>{resultData.recommendation}</Text>
          <Text style={styles.recSubtext}>Potential saving: {resultData.reductionPercent}%</Text>
        </View>
      )}

      <NeonButton 
        title="Compare Providers" 
        icon="compare-arrows"
        onPress={() => router.push('/(tabs)/compare')} 
        buttonStyle={styles.actionBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textHeader,
  },
  resultCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderLeftWidth: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  mainNumber: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 4,
  },
  unitText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.borderSubtle,
    marginVertical: 24,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 4,
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 16,
    color: colors.textHeader,
  },
  equivalentCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  equivalentText: {
    color: colors.textBody,
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  recommendationCard: {
    backgroundColor: 'rgba(255, 184, 108, 0.1)',
    borderColor: colors.warning,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recTitle: {
    color: colors.warning,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  recText: {
    color: colors.textHeader,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  recSubtext: {
    color: colors.warning,
    fontSize: 13,
  },
  actionBtn: {
    marginTop: 'auto',
  }
});
