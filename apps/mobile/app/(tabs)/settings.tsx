import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { adminApi } from '../../src/services/api/endpoints';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [autoReport, setAutoReport] = useState(false);
  const [defaultRegion, setDefaultRegion] = useState('us-east-1');
  const [defaultProvider, setDefaultProvider] = useState('aws');

  const { data: dashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: adminApi.getDashboardStats,
  });

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

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>SETTINGS</Text>
          <Text style={styles.subtitle}>MANAGE CARBONIX PREFERENCES</Text>
        </View>

        {/* Admin Dashboard */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="dashboard" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>ADMIN DASHBOARD</Text>
          </View>
          
          {dashboardLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>API CALLS</Text>
                <Text style={styles.statValue}>{dashboard?.totalApiCalls?.toLocaleString() || 0}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>SESSIONS</Text>
                <Text style={styles.statValue}>{dashboard?.activeSessions?.toLocaleString() || 0}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>AVG CO₂ (kg)</Text>
                <Text style={styles.statValue}>{dashboard?.avgCo2Kg || 0}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>INSTALLS</Text>
                <Text style={styles.statValue}>{dashboard?.sdkInstalls?.toLocaleString() || 0}</Text>
              </View>
            </View>
          )}

          {/* Quick links to Management screens */}
          <View style={styles.divider} />
          <View style={styles.adminLinks}>
            <TouchableOpacity style={styles.adminLinkBtn} onPress={() => router.push('/settings/users')}>
              <MaterialIcons name="people" size={18} color={colors.textHeader} />
              <Text style={styles.adminLinkText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adminLinkBtn} onPress={() => router.push('/settings/keys')}>
              <MaterialIcons name="vpn-key" size={18} color={colors.textHeader} />
              <Text style={styles.adminLinkText}>API Keys</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adminLinkBtn} onPress={() => router.push('/settings/flags')}>
              <MaterialIcons name="flag" size={18} color={colors.textHeader} />
              <Text style={styles.adminLinkText}>Feature Flags</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adminLinkBtn} onPress={() => router.push('/settings/brsr')}>
              <MaterialIcons name="assessment" size={18} color={colors.textHeader} />
              <Text style={styles.adminLinkText}>BRSR Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Global Defaults */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="public" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>GLOBAL DEFAULTS</Text>
          </View>
          
          <View style={styles.settingRowCol}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.settingLabel}>Default Provider</Text>
              <Text style={styles.settingDesc}>Fallback cloud provider</Text>
            </View>
            <View style={styles.pickerWrapperFull}>
              <Picker
                selectedValue={defaultProvider}
                onValueChange={setDefaultProvider}
                style={styles.picker}
                dropdownIconColor={colors.textMuted}
              >
                <Picker.Item label="AWS" value="aws" />
                <Picker.Item label="GCP" value="gcp" />
                <Picker.Item label="Azure" value="azure" />
              </Picker>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRowCol}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.settingLabel}>Default Region</Text>
              <Text style={styles.settingDesc}>Fallback data center region</Text>
            </View>
            <View style={styles.pickerWrapperFull}>
              <Picker
                selectedValue={defaultRegion}
                onValueChange={setDefaultRegion}
                style={styles.picker}
                dropdownIconColor={colors.textMuted}
              >
                <Picker.Item label="us-east-1" value="us-east-1" />
                <Picker.Item label="eu-west-1" value="eu-west-1" />
                <Picker.Item label="ap-south-1" value="ap-south-1" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Notifications & Automation */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>NOTIFICATIONS & AUTOMATION</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>High Emission Alerts</Text>
              <Text style={styles.settingDesc}>Notify when compute exceeds 50kg CO2e.</Text>
            </View>
            <Switch
              value={alertsEnabled}
              onValueChange={setAlertsEnabled}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={alertsEnabled ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Auto-Generate Reports</Text>
              <Text style={styles.settingDesc}>Export usage analytics automatically.</Text>
            </View>
            <Switch
              value={autoReport}
              onValueChange={setAutoReport}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={autoReport ? colors.primary : colors.textMuted}
            />
          </View>
        </View>

        {/* Footer info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>CarbonSDK Version 1.2.4</Text>
          <Text style={styles.footerText}>Tech-Brutalism Theme Active</Text>
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
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
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
  panel: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 16,
    gap: 16,
    borderRadius: 12,
  },
  panelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  panelTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: colors.textHeader,
    letterSpacing: 1.1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  statLabel: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.textHeader,
  },
  adminLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  adminLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  adminLinkText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: colors.textHeader,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textHeader,
    marginBottom: 4,
  },
  settingDesc: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
  },
  settingRowCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  pickerWrapperFull: {
    width: '100%',
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    color: colors.textHeader,
    fontFamily: 'JetBrains Mono',
    height: 52,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    color: colors.textMuted,
    opacity: 0.5,
    marginBottom: 4,
  },
});
