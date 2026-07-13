import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { colors } from '../../src/theme/colors';
import { adminApi } from '../../src/services/api/endpoints';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAuditLogs({ page: 1, pageSize: 50 });
      if (res.success) {
        setLogs(res.logs || []);
      }
    } catch (err: any) {
      console.error('Failed to fetch audit logs:', err.response?.data || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = logs.filter(item => 
    item.action?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.resource?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.actorEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => Alert.alert('Export', 'History data exported successfully as CSV.')}>
          <MaterialIcons name="ios-share" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Audit Logs</Text>
          <Text style={styles.subtitle}>History of actions and configuration changes</Text>
        </View>

        {/* Search / Filter */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search email, action, or resource..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* History List */}
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 32 }} />
          ) : filteredData.length === 0 ? (
            <Text style={styles.emptyText}>No audit logs found.</Text>
          ) : (
            filteredData.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.action.replace(/_/g, ' ')}</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.cardTitle}>{item.actorEmail}</Text>
                    <View style={styles.providerInfo}>
                      <Text style={styles.providerText}>{item.actorRole}</Text>
                      <Text style={styles.dotSeparator}>•</Text>
                      <Text style={styles.regionText}>{item.resource} {item.resourceId ? `(${item.resourceId.substring(0, 8)})` : ''}</Text>
                    </View>
                  </View>
                  
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.totalLabel}>IP ADDRESS</Text>
                    <Text style={styles.totalValue}>{item.ip || '127.0.0.1'}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.outlineVariant,
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 56, height: 56, resizeMode: 'contain' },
  logo: { fontFamily: 'Inter-Bold', fontSize: 20, fontWeight: '900', color: colors.primary, letterSpacing: -0.5, marginLeft: -8 },
  iconBtn: { padding: 8, borderRadius: 12 },
  content: { paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100, gap: 16 },
  header: { gap: 4 },
  title: { fontFamily: 'Inter-Bold', fontSize: 36, color: colors.textHeader, letterSpacing: -1 },
  subtitle: { fontFamily: 'Inter', fontSize: 16, color: colors.textMuted },
  
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, height: 48, paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontFamily: 'Inter', fontSize: 14, color: colors.textHeader, height: '100%' },
  
  listContainer: { gap: 12 },
  card: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#2A2A2A', borderLeftWidth: 4, borderLeftColor: colors.primary, padding: 16, gap: 12, borderRadius: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeText: { fontFamily: 'JetBrains Mono', fontSize: 11, color: colors.textMuted },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontFamily: 'Inter-Bold', fontSize: 16, color: colors.textHeader },
  providerInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  providerText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
  dotSeparator: { fontSize: 10, color: colors.textMuted },
  regionText: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textMuted },
  
  totalLabel: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10, color: colors.textMuted, letterSpacing: 1, marginBottom: 4, textAlign: 'right' },
  totalValue: { fontFamily: 'JetBrains Mono', fontSize: 12, color: colors.textHeader },
  
  badge: { borderWidth: 1, borderColor: '#4285F4', backgroundColor: 'rgba(66, 133, 244, 0.1)', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontFamily: 'JetBrainsMono-Bold', fontSize: 10, color: '#4285F4', letterSpacing: 1 },

  emptyText: { color: colors.textMuted, textAlign: 'center', marginTop: 32, fontFamily: 'Inter' },
});
