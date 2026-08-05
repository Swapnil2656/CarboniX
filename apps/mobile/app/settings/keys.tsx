import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { colors } from '../../src/theme/colors';
import { adminApi } from '../../src/services/api/endpoints';

export default function ApiKeysScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [newKeyName, setNewKeyName] = React.useState('');
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminApiKeys'],
    queryFn: () => adminApi.getApiKeys(),
  });

  const keys = data?.data || [];
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await adminApi.createApiKey({ name });
      return res;
    },
    onSuccess: () => {
      setNewKeyName('');
      queryClient.invalidateQueries({ queryKey: ['adminApiKeys'] });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (id: string) => adminApi.revokeApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminApiKeys'] });
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>API Keys</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : isError ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Error loading keys</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.createRow}>
            <TextInput
              style={styles.input}
              placeholder="New API Key Name..."
              placeholderTextColor={colors.textMuted}
              value={newKeyName}
              onChangeText={setNewKeyName}
            />
            <TouchableOpacity 
              style={[styles.createBtn, !newKeyName && { opacity: 0.5 }]} 
              disabled={!newKeyName || createMutation.isPending}
              onPress={() => createMutation.mutate(newKeyName)}
            >
              {createMutation.isPending ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.createBtnText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
          <FlatList
            data={keys}
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.keyCard}>
              <View style={styles.keyHeader}>
                <View style={styles.keyTitleRow}>
                  <MaterialIcons name="vpn-key" size={20} color={colors.primary} />
                  <Text style={styles.keyName}>{item.name}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'ACTIVE' ? 'rgba(144, 255, 158, 0.1)' : 'rgba(255, 85, 85, 0.1)' }]}>
                  <Text style={[styles.statusText, { color: item.status === 'ACTIVE' ? '#90ff9e' : '#ff5555' }]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.keyValue}>{item.keyPreview}</Text>
              
              <View style={styles.keyDetailRow}>
                <Text style={styles.detailLabel}>Last Used:</Text>
                <Text style={styles.detailValue}>{item.lastUsed ? new Date(item.lastUsed).toLocaleDateString() : 'Never'}</Text>
              </View>
              <View style={styles.keyDetailRow}>
                <Text style={styles.detailLabel}>Created By:</Text>
                <Text style={styles.detailValue}>{item.createdBy}</Text>
              </View>
              {item.status === 'ACTIVE' && (
                <TouchableOpacity 
                  style={styles.revokeBtn}
                  disabled={revokeMutation.isPending}
                  onPress={() => revokeMutation.mutate(item.id)}
                >
                  <Text style={styles.revokeBtnText}>Revoke Key</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
        </View>
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
  keyCard: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  keyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  keyTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  keyName: { fontFamily: 'Inter-Bold', fontSize: 16, color: colors.textHeader },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A' },
  statusText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10 },
  keyValue: { fontFamily: 'JetBrains Mono', fontSize: 14, color: '#90ff9e', backgroundColor: '#0A0A0A', padding: 8, borderRadius: 8, overflow: 'hidden' },
  keyDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  detailLabel: { fontFamily: 'Inter', fontSize: 13, color: colors.textMuted },
  detailValue: { fontFamily: 'JetBrains Mono', fontSize: 13, color: '#e5e2e1' },
  createRow: { flexDirection: 'row', padding: 20, paddingBottom: 0, gap: 12 },
  input: { flex: 1, backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 8, paddingHorizontal: 16, color: colors.textHeader, fontFamily: 'Inter' },
  createBtn: { backgroundColor: colors.primary, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  createBtnText: { fontFamily: 'Inter-Bold', color: '#000' },
  revokeBtn: { marginTop: 16, backgroundColor: 'rgba(255, 85, 85, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 85, 85, 0.3)', padding: 12, borderRadius: 8, alignItems: 'center' },
  revokeBtnText: { color: '#ff5555', fontFamily: 'Inter-Bold', fontSize: 13 },
});
