import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image, Alert, Linking, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

import { colors } from '../../src/theme/colors';
import { useAuthStore } from '../../src/store/authStore';
import { authApi } from '../../src/services/api/endpoints';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [profile, setProfile] = useState<any>(null);

  // Notification Preferences
  const [highEmissionAlerts, setHighEmissionAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [greenTips, setGreenTips] = useState(true);

  // Defaults
  const [defaultProvider, setDefaultProvider] = useState('aws');
  const [defaultRegion, setDefaultRegion] = useState('us-east-1');
  const [budgetLimit, setBudgetLimit] = useState('100');

  // Display
  const [useLbs, setUseLbs] = useState(false);

  useEffect(() => {
    loadSettings();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authApi.getProfile();
      if (res.success) {
        setProfile(res.data);
      }
    } catch (e) {
      console.log('Error fetching profile', e);
    }
  };

  const loadSettings = async () => {
    try {
      const savedProvider = await SecureStore.getItemAsync('defaultProvider');
      const savedRegion = await SecureStore.getItemAsync('defaultRegion');
      const savedBudget = await SecureStore.getItemAsync('budgetLimit');
      const savedLbs = await SecureStore.getItemAsync('useLbs');
      
      if (savedProvider) setDefaultProvider(savedProvider);
      if (savedRegion) setDefaultRegion(savedRegion);
      if (savedBudget) setBudgetLimit(savedBudget);
      if (savedLbs) setUseLbs(savedLbs === 'true');
    } catch (e) {
      console.log('Error loading settings', e);
    }
  };

  const handleSignOut = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.log('Logout API error', e);
    } finally {
      await logout();
      router.replace('/login');
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.log('Error saving setting', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ME'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
            <Text style={styles.profileDate}>Member since June 2026</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{profile?.carbonRating || 'A'}</Text>
          </View>
        </View>

        {/* Push Notification Settings */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>NOTIFICATIONS</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>High Emission Alerts</Text>
              <Text style={styles.settingDesc}>Notify when calculation exceeds 50 kg CO₂</Text>
            </View>
            <Switch
              value={highEmissionAlerts}
              onValueChange={setHighEmissionAlerts}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={highEmissionAlerts ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Weekly Summary</Text>
              <Text style={styles.settingDesc}>Receive a carbon footprint digest every Monday</Text>
            </View>
            <Switch
              value={weeklySummary}
              onValueChange={setWeeklySummary}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={weeklySummary ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Budget Alerts</Text>
              <Text style={styles.settingDesc}>Notify when monthly carbon budget reaches 80%</Text>
            </View>
            <Switch
              value={budgetAlerts}
              onValueChange={setBudgetAlerts}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={budgetAlerts ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Green Region Tips</Text>
              <Text style={styles.settingDesc}>Get notified about cleaner region alternatives</Text>
            </View>
            <Switch
              value={greenTips}
              onValueChange={setGreenTips}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={greenTips ? colors.primary : colors.textMuted}
            />
          </View>
        </View>

        {/* Default Configuration */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="settings-applications" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>DEFAULTS</Text>
          </View>
          
          <View style={styles.settingRowCol}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.settingLabel}>Default Cloud Provider</Text>
            </View>
            <View style={styles.pickerWrapperFull}>
              <Picker
                selectedValue={defaultProvider}
                onValueChange={(val) => { setDefaultProvider(val); saveSetting('defaultProvider', val); }}
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
            </View>
            <View style={styles.pickerWrapperFull}>
              <Picker
                selectedValue={defaultRegion}
                onValueChange={(val) => { setDefaultRegion(val); saveSetting('defaultRegion', val); }}
                style={styles.picker}
                dropdownIconColor={colors.textMuted}
              >
                <Picker.Item label="us-east-1" value="us-east-1" />
                <Picker.Item label="eu-west-1" value="eu-west-1" />
                <Picker.Item label="ap-south-1" value="ap-south-1" />
                <Picker.Item label="eu-north-1" value="eu-north-1" />
              </Picker>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRowCol}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.settingLabel}>Carbon Budget (kg CO₂/mo)</Text>
            </View>
            <TextInput
              style={styles.input}
              value={budgetLimit}
              onChangeText={(val) => { setBudgetLimit(val); saveSetting('budgetLimit', val); }}
              keyboardType="numeric"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        {/* Appearance */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="palette" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>DISPLAY</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Use Imperial Units (lbs)</Text>
              <Text style={styles.settingDesc}>Display CO₂ in pounds instead of kilograms</Text>
            </View>
            <Switch
              value={useLbs}
              onValueChange={(val) => { setUseLbs(val); saveSetting('useLbs', val ? 'true' : 'false'); }}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={useLbs ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Light Theme</Text>
              <Text style={styles.settingDesc}>Coming soon</Text>
            </View>
            <Switch
              value={false}
              disabled
              trackColor={{ false: '#1A1A1A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={'#333'}
            />
          </View>
        </View>

        {/* About & Support */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="info" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>ABOUT</Text>
          </View>

          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL('https://carbonix.example.com/docs')}>
            <Text style={styles.linkText}>View Documentation</Text>
            <MaterialIcons name="open-in-new" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL('mailto:support@carbonix.example.com')}>
            <Text style={styles.linkText}>Report a Bug</Text>
            <MaterialIcons name="mail-outline" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Rate the App</Text>
            <MaterialIcons name="star-rate" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <MaterialIcons name="logout" size={20} color="#ff5555" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>CarboniX Mobile v1.2.4</Text>
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
    gap: 4,
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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100, 
    gap: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textHeader,
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 4,
  },
  profileDate: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    color: '#888',
  },
  ratingBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(80, 250, 123, 0.1)',
    borderWidth: 1,
    borderColor: '#50FA7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#50FA7B',
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
  input: {
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textHeader,
    fontFamily: 'JetBrains Mono',
    fontSize: 16,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  linkText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: colors.textHeader,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 85, 85, 0.1)',
    borderWidth: 1,
    borderColor: '#ff5555',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    gap: 8,
  },
  signOutText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#ff5555',
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
