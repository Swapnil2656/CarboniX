import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { colors } from '../../src/theme/colors';
import { GlassPanel } from '../../src/components/GlassPanel';
import { NeonButton } from '../../src/components/NeonButton';
import { carbonApi } from '../../src/services/api/endpoints';

export default function ConfigScreen() {
  const router = useRouter();
  
  const [provider, setProvider] = useState('aws');
  const [region, setRegion] = useState('us-east-1');
  const [instanceType, setInstanceType] = useState('t3.medium');
  const [instanceCount, setInstanceCount] = useState(4);
  const [hoursPerMonth, setHoursPerMonth] = useState(730);
  const [cpuUtilization, setCpuUtilization] = useState(0.4);
  const [storageGb, setStorageGb] = useState(100);
  const [loading, setLoading] = useState(false);

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
      
      const result = await carbonApi.calculate(payload);
      
      // Navigate to results passing the result data as params
      router.push({
        pathname: '/results/[id]',
        params: { id: 'latest', data: JSON.stringify(result) }
      });
    } catch (error: any) {
      Alert.alert('Calculation Failed', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Infrastructure Config</Text>
        <Text style={styles.subtitle}>Build your virtual environment to simulate carbon emissions output based on region and compute intensity.</Text>
      </View>

      <Text style={styles.label}>CLOUD PROVIDER</Text>
      <View style={styles.providerGrid}>
        {['aws', 'gcp', 'azure'].map(p => (
          <TouchableOpacity 
            key={p} 
            style={[styles.providerButton, provider === p && styles.providerActive]}
            onPress={() => setProvider(p)}
          >
            <MaterialIcons 
              name={p === 'aws' ? 'cloud' : p === 'gcp' ? 'cloud-queue' : 'filter-drama'} 
              size={32} 
              color={provider === p ? colors.primary : colors.textMuted} 
            />
            <Text style={[styles.providerText, provider === p && styles.providerTextActive]}>
              {p.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={styles.formPanel}>
        <View style={styles.formGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>REGION</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={region}
              onValueChange={setRegion}
              style={styles.picker}
              dropdownIconColor={colors.textMuted}
            >
              <Picker.Item label="us-east-1 (Virginia)" value="us-east-1" color={colors.textHeader} />
              <Picker.Item label="eu-west-1 (Ireland)" value="eu-west-1" color={colors.textHeader} />
              <Picker.Item label="ap-south-1 (Mumbai)" value="ap-south-1" color={colors.textHeader} />
              <Picker.Item label="sa-east-1 (São Paulo)" value="sa-east-1" color={colors.textHeader} />
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>INSTANCE TYPE</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={instanceType}
              onValueChange={setInstanceType}
              style={styles.picker}
              dropdownIconColor={colors.textMuted}
            >
              <Picker.Item label="t3.micro (2 vCPU, 1GB RAM)" value="t3.micro" color={colors.textHeader} />
              <Picker.Item label="t3.medium (2 vCPU, 4GB RAM)" value="t3.medium" color={colors.textHeader} />
              <Picker.Item label="m5.large (2 vCPU, 8GB RAM)" value="m5.large" color={colors.textHeader} />
              <Picker.Item label="c5.xlarge (4 vCPU, 8GB RAM)" value="c5.xlarge" color={colors.textHeader} />
            </Picker>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.stepperGroup}>
          <View>
            <Text style={styles.label}>INSTANCE COUNT</Text>
            <Text style={styles.subtext}>Active Nodes</Text>
          </View>
          <View style={styles.stepper}>
            <TouchableOpacity onPress={decrementCount} style={styles.stepBtn}>
              <MaterialIcons name="remove" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            <Text style={styles.stepValue}>{instanceCount}</Text>
            <TouchableOpacity onPress={incrementCount} style={styles.stepBtn}>
              <MaterialIcons name="add" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>UTILIZATION (HOURS/MONTH)</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{Math.round(hoursPerMonth)}h</Text>
            </View>
          </View>
          {/* @ts-ignore */}
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={744}
            value={hoursPerMonth}
            onValueChange={setHoursPerMonth}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.surfaceContainerHighest}
            thumbTintColor={colors.primary}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>1h</Text>
            <Text style={styles.sliderLabel}>100% (744h)</Text>
          </View>
        </View>
      </GlassPanel>

      <View style={styles.codeOutput}>
        <View style={styles.codeHeader}>
          <MaterialIcons name="terminal" size={16} color={colors.textMuted} />
          <Text style={styles.codeTitle}>config.yml</Text>
        </View>
        <Text style={styles.codeText}>
          <Text style={{color: colors.primary}}>infrastructure:</Text>{'\n'}
          <Text style={{color: colors.info}}>  provider:</Text> <Text style={{color: colors.success}}>"{provider}"</Text>{'\n'}
          <Text style={{color: colors.info}}>  region:</Text> <Text style={{color: colors.success}}>"{region}"</Text>{'\n'}
          <Text style={{color: colors.info}}>  instance_type:</Text> <Text style={{color: colors.success}}>"{instanceType}"</Text>{'\n'}
          <Text style={{color: colors.info}}>  count:</Text> {instanceCount}{'\n'}
          <Text style={{color: colors.info}}>  utilization_hours:</Text> {Math.round(hoursPerMonth)}
        </Text>
      </View>

      <NeonButton 
        title="Calculate Carbon" 
        icon="energy-savings-leaf"
        onPress={handleCalculate} 
        loading={loading}
        buttonStyle={styles.calculateBtn}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textHeader,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  providerButton: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  providerActive: {
    backgroundColor: 'rgba(215, 186, 255, 0.05)',
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  providerText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  providerTextActive: {
    color: colors.primary,
  },
  formPanel: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: colors.textHeader,
    height: 50,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 16,
  },
  stepperGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtext: {
    fontSize: 12,
    color: colors.textBody,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 8,
  },
  stepBtn: {
    padding: 12,
  },
  stepValue: {
    color: colors.textHeader,
    fontSize: 16,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: 'rgba(215, 186, 255, 0.1)',
    borderColor: 'rgba(215, 186, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  sliderLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  codeOutput: {
    backgroundColor: '#000',
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    paddingBottom: 8,
    marginBottom: 8,
  },
  codeTitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginLeft: 8,
  },
  codeText: {
    fontSize: 12,
    lineHeight: 20,
  },
  calculateBtn: {
    marginBottom: 40,
  }
});
