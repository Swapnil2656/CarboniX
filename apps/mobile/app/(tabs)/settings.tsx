import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image, Alert, Linking, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

import { colors } from '../../src/theme/colors';
import { useAuthStore } from '../../src/stores/auth.store';
import { authApi } from '../../src/services/api/endpoints';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const [profile, setProfile] = useState<any>(null);

  // Notification Preferences
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [thresholdAlerts, setThresholdAlerts] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authApi.getProfile();
      if (res.success) {
        setProfile(res.data);
        setEmailAlerts(res.data.emailAlerts ?? true);
        setPushAlerts(res.data.pushAlerts ?? false);
        setThresholdAlerts(res.data.thresholdAlerts ?? true);
      }
    } catch (e) {
      console.error('Error fetching profile', e);
    }
  };

  const updateSetting = async (key: string, value: boolean) => {
    try {
      if (key === 'emailAlerts') setEmailAlerts(value);
      if (key === 'pushAlerts') setPushAlerts(value);
      if (key === 'thresholdAlerts') setThresholdAlerts(value);

      await authApi.updateProfile({ [key]: value });
    } catch (e) {
      console.error('Error loading settings', e);
    }
  };

  const handleSignOut = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error('Logout API error', e);
    } finally {
      await clearAuth();
      router.replace('/(auth)/login');
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Error saving setting', e);
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
              {profile?.name ? profile.name.substring(0, 2).toUpperCase() : (user?.name ? user.name.substring(0, 2).toUpperCase() : 'ME')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.name || user?.name || 'User Name'}</Text>
            <Text style={styles.profileEmail}>{profile?.email || user?.email || 'user@example.com'}</Text>
            <Text style={styles.profileDate}>
              Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'June 2026'}
            </Text>
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
              <Text style={styles.settingLabel}>Email Alerts</Text>
              <Text style={styles.settingDesc}>Receive important notifications via email</Text>
            </View>
            <Switch
              value={emailAlerts}
              onValueChange={(val) => updateSetting('emailAlerts', val)}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={emailAlerts ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Push Alerts</Text>
              <Text style={styles.settingDesc}>Receive real-time push notifications on this device</Text>
            </View>
            <Switch
              value={pushAlerts}
              onValueChange={(val) => updateSetting('pushAlerts', val)}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={pushAlerts ? colors.primary : colors.textMuted}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={styles.settingLabel}>Threshold Alerts</Text>
              <Text style={styles.settingDesc}>Notify when approaching carbon budgets</Text>
            </View>
            <Switch
              value={thresholdAlerts}
              onValueChange={(val) => updateSetting('thresholdAlerts', val)}
              trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
              thumbColor={thresholdAlerts ? colors.primary : colors.textMuted}
            />
          </View>
        </View>



        {/* About & Support */}
        <View style={styles.panel}>
          <View style={styles.panelHeaderRow}>
            <MaterialIcons name="info" size={20} color={colors.primary} />
            <Text style={styles.panelTitle}>ABOUT</Text>
          </View>

          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL('http://10.0.2.2:3000/docs')}>
            <Text style={styles.linkText}>View Documentation</Text>
            <MaterialIcons name="open-in-new" size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL('mailto:swapnilsen2656@gmail.com')}>
            <Text style={styles.linkText}>Report a Bug</Text>
            <MaterialIcons name="mail-outline" size={16} color={colors.textMuted} />
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
    alignItems: 'center'
  },
  logoImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
    marginLeft: -8
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
