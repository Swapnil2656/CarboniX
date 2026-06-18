import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { useAuthStore } from '../src/stores/auth.store';
import { NeonButton } from '../src/components/NeonButton';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <MaterialIcons name="person" size={48} color={colors.textMuted} />
          </View>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Not logged in'}</Text>

          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>PRO TIER</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
              <Text style={[styles.badgeText, { color: colors.textMuted }]}>VERIFIED</Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <MaterialIcons name="cloud-queue" size={24} color={colors.primaryContainer} />
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>ACTIVE NODES</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialIcons name="eco" size={24} color="#50FA7B" />
            <Text style={styles.statValue}>28%</Text>
            <Text style={styles.statLabel}>CO₂ REDUCTION</Text>
          </View>
        </View>

        {/* Account Details List */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>
          
          <View style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <MaterialIcons name="badge" size={20} color={colors.textMuted} />
              <Text style={styles.listText}>Account ID</Text>
            </View>
            <Text style={styles.listValue}>{user?.id || '---'}</Text>
          </View>

          <View style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <MaterialIcons name="security" size={20} color={colors.textMuted} />
              <Text style={styles.listText}>Security Protocol</Text>
            </View>
            <Text style={styles.listValue}>Strict</Text>
          </View>

          <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
            <View style={styles.listItemLeft}>
              <MaterialIcons name="data-usage" size={20} color={colors.textMuted} />
              <Text style={styles.listText}>Data Region</Text>
            </View>
            <Text style={styles.listValue}>us-east-1</Text>
          </View>
        </View>

        <NeonButton
          title="Log Out"
          icon="logout"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          textStyle={styles.logoutText}
          iconColor={colors.error}
        />
        
        {/* Bottom Decorative Trace */}
        <View style={styles.bottomTrace}>
          <Text style={styles.traceText}>CARBONIX_SYS_OP</Text>
          <View style={styles.traceLine} />
        </View>
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
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingTop: 8,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    color: colors.textHeader,
  },
  content: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: colors.onPrimaryContainer,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontFamily: 'JetBrains Mono',
    fontSize: 24,
    fontWeight: '700',
    color: colors.textHeader,
  },
  statLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  listContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.primaryContainer,
    marginBottom: 16,
    letterSpacing: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: colors.textHeader,
  },
  listValue: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textMuted,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 12,
    marginTop: 8,
    shadowOpacity: 0,
    elevation: 0,
  },
  logoutText: {
    color: colors.error,
  },
  bottomTrace: {
    marginTop: 32,
    alignItems: 'center',
    opacity: 0.2,
  },
  traceText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: colors.outlineVariant,
    marginBottom: 4,
  },
  traceLine: {
    width: 64,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
});
