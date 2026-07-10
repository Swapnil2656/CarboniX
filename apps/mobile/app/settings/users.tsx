import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { colors } from '../../src/theme/colors';
import { adminApi } from '../../src/services/api/endpoints';

export default function UsersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => adminApi.getUsers(),
  });

  const users = data?.data || [];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Users</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : isError ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Error loading users</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <View style={styles.userHeader}>
                <MaterialIcons name="person" size={20} color={colors.primary} />
                <Text style={styles.userId}>{item.id.slice(0, 8)}...{item.id.slice(-4)}</Text>
              </View>
              <View style={styles.userDetailRow}>
                <Text style={styles.detailLabel}>Device:</Text>
                <Text style={styles.detailValue}>{item.deviceInfo}</Text>
              </View>
              <View style={styles.userDetailRow}>
                <Text style={styles.detailLabel}>Provider:</Text>
                <Text style={styles.detailValue}>{item.defaultProvider}</Text>
              </View>
              <View style={styles.userDetailRow}>
                <Text style={styles.detailLabel}>Avg CO₂:</Text>
                <Text style={styles.detailValue}>{item.avgCo2Footprint} kg</Text>
              </View>
              <View style={styles.userDetailRow}>
                <Text style={styles.detailLabel}>Calculations:</Text>
                <Text style={styles.detailValue}>{item.calculationCount}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backBtn: { padding: 8, marginLeft: -8, marginRight: 8 },
  headerTitle: { fontFamily: 'Inter-Bold', fontSize: 20, color: colors.textHeader },
  loader: { marginTop: 40 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: colors.error, fontFamily: 'Inter', marginBottom: 12 },
  retryText: { color: colors.primary, fontFamily: 'Inter-Bold' },
  listContent: { padding: 20, gap: 12 },
  userCard: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  userHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  userId: { fontFamily: 'JetBrainsMono-Bold', fontSize: 14, color: colors.textHeader },
  userDetailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },
  detailValue: { fontFamily: 'JetBrains Mono', fontSize: 13, color: '#e5e2e1' },
});
