import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { colors } from '../../src/theme/colors';
import { adminApi } from '../../src/services/api/endpoints';

export default function FeatureFlagsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['adminFeatureFlags'],
    queryFn: () => adminApi.getFeatureFlags(),
  });

  const flags = data?.data || [];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feature Flags</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : isError ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Error loading flags</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={flags}
          keyExtractor={(item: any) => item.key}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.flagCard}>
              <View style={styles.flagInfo}>
                <Text style={styles.flagKey}>{item.key}</Text>
                <Text style={styles.flagDesc}>{item.description}</Text>
              </View>
              <Switch
                value={item.enabled}
                onValueChange={() => {}} // Read-only for now
                trackColor={{ false: '#2A2A2A', true: 'rgba(255, 229, 160, 0.4)' }}
                thumbColor={item.enabled ? colors.primary : colors.textMuted}
              />
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
  flagCard: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagInfo: { flex: 1, paddingRight: 16 },
  flagKey: { fontFamily: 'JetBrainsMono-Bold', fontSize: 14, color: colors.textHeader, marginBottom: 4 },
  flagDesc: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },
});
