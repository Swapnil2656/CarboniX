import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { adminApi, connectApi } from '../src/services/api/endpoints';

export default function ProjectSettingsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [availablePlatforms, setAvailablePlatforms] = useState<any[]>([]);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  const [tokenValue, setTokenValue] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  // Agent State
  const [isGeneratingAgent, setIsGeneratingAgent] = useState(false);
  const [newAgentKey, setNewAgentKey] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, platRes] = await Promise.all([
        adminApi.getProjectStats(id as string),
        connectApi.getPlatforms()
      ]);

      if (projRes.success) {
        setProject(projRes.data.project);
        const activePlatforms = (projRes.data.project.platformTokens || [])
          .filter((pt: any) => pt.status === 'ACTIVE')
          .map((pt: any) => pt.platform);
        setConnectedPlatforms(activePlatforms);
      } else {
        Alert.alert('Error', projRes.error || 'Failed to fetch project');
      }

      if (platRes.success) {
        setAvailablePlatforms(platRes.data);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!selectedPlatform || !tokenValue.trim()) return;
    try {
      setIsConnecting(true);
      const payload: any = {
        projectId: id as string,
        platform: selectedPlatform,
        token: tokenValue.trim()
      };
      if (projectSlug.trim()) {
        payload.projectSlug = projectSlug.trim();
      }
      
      const res = await connectApi.connectPlatform(payload);
      if (res.success) {
        Alert.alert('Success', `Connected ${selectedPlatform} successfully.`);
        setSelectedPlatform(null);
        setTokenValue('');
        setProjectSlug('');
        fetchData(); // Refresh list
      } else {
        Alert.alert('Connection Failed', res.error || 'Unknown error');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRevoke = (platformId: string) => {
    Alert.alert(
      'Revoke Integration',
      `Are you sure you want to disconnect ${platformId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Revoke', 
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await connectApi.revokePlatform(id as string, platformId);
              if (res.success) {
                Alert.alert('Success', 'Revoked successfully.');
                fetchData();
              } else {
                Alert.alert('Error', res.error || 'Revocation failed');
              }
            } catch (e: any) {
              Alert.alert('Error', e.message);
            }
          }
        }
      ]
    );
  };

  const handleGenerateAgentKey = async () => {
    try {
      setIsGeneratingAgent(true);
      const res = await adminApi.createApiKey({
        name: `Agent Key for ${project?.name}`,
        permissions: ['agent_control'],
        expiration: 'never',
        projectId: id as string
      });
      setNewAgentKey(res.key);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate agent key');
    } finally {
      setIsGeneratingAgent(false);
    }
  };

  if (loading && !project) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textBody} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Settings</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={styles.sectionTitle}>Platform Integrations</Text>
        <Text style={styles.sectionDesc}>Connect your cloud providers to enable live carbon data collection.</Text>

        <View style={styles.platformsContainer}>
          {availablePlatforms.length === 0 ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 20 }} />
          ) : (
            availablePlatforms.map((platform) => {
              const isConnected = connectedPlatforms.includes(platform.id);
              const isSelected = selectedPlatform === platform.id;

              return (
                <View key={platform.id} style={[styles.platformCard, isSelected && styles.platformCardSelected]}>
                  <View style={styles.platformHeaderRow}>
                    <View style={styles.platformInfoRow}>
                      <View style={[styles.iconContainer, isConnected && styles.iconContainerConnected]}>
                        <MaterialCommunityIcons name={platform.icon === 'diamond' ? 'diamond-stone' : 'cloud'} size={24} color={isConnected ? colors.success : colors.textMuted} />
                      </View>
                      <View style={styles.platformTextInfo}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Text style={styles.platformName}>{platform.name}</Text>
                          {isConnected && (
                            <View style={styles.connectedBadge}>
                              <Text style={styles.connectedBadgeText}>Connected</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.platformDesc}>{platform.description}</Text>
                      </View>
                    </View>

                    {isConnected ? (
                      <TouchableOpacity style={styles.revokeButton} onPress={() => handleRevoke(platform.id)}>
                        <Text style={styles.revokeButtonText}>Revoke</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={isSelected ? styles.cancelButton : styles.connectButton} 
                        onPress={() => setSelectedPlatform(isSelected ? null : platform.id)}
                      >
                        <Text style={isSelected ? styles.cancelButtonText : styles.connectButtonText}>
                          {isSelected ? 'Cancel' : 'Connect'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {isSelected && !isConnected && (
                    <View style={styles.connectForm}>
                      <Text style={styles.inputLabel}>{platform.name} Access Token</Text>
                      <TextInput
                        style={styles.input}
                        value={tokenValue}
                        onChangeText={setTokenValue}
                        placeholder={`Paste token here`}
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry
                        autoCapitalize="none"
                      />

                      {platform.needsProjectSlug && (
                        <>
                          <Text style={[styles.inputLabel, { marginTop: 12 }]}>Project Slug (optional)</Text>
                          <TextInput
                            style={styles.input}
                            value={projectSlug}
                            onChangeText={setProjectSlug}
                            placeholder={`e.g. my-awesome-app`}
                            placeholderTextColor={colors.textMuted}
                            autoCapitalize="none"
                          />
                        </>
                      )}

                      <TouchableOpacity 
                        style={[styles.submitButton, (!tokenValue.trim() || isConnecting) && styles.submitButtonDisabled]}
                        onPress={handleConnect}
                        disabled={!tokenValue.trim() || isConnecting}
                      >
                        {isConnecting ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text style={styles.submitButtonText}>Save & Verify</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Self-Hosted Server Agent</Text>
        <Text style={styles.sectionDesc}>Hosting your own servers? Run the CarboniX agent daemon to stream live power metrics directly to this project.</Text>

        <View style={styles.agentContainer}>
          {!newAgentKey ? (
            <View>
              <Text style={styles.agentInfo}>Generate a secure API key to authenticate your server. You will use this key when starting the agent on your machine.</Text>
              <TouchableOpacity 
                style={styles.generateButton}
                onPress={handleGenerateAgentKey}
                disabled={isGeneratingAgent}
              >
                {isGeneratingAgent ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <MaterialIcons name="vpn-key" size={18} color="#fff" />
                    <Text style={styles.generateButtonText}>Generate Agent Key</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.keyGeneratedCard}>
              <View style={styles.successRow}>
                <MaterialIcons name="check-circle" size={20} color={colors.success} />
                <Text style={styles.successText}>Agent Key Generated</Text>
              </View>
              <Text style={styles.warningText}>Copy this key now. You won't be able to see it again!</Text>
              <View style={styles.keyBox}>
                <Text style={styles.keyText}>{newAgentKey}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
  },
  backButton: { marginRight: 16, padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textBody },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textBody, marginBottom: 4 },
  sectionDesc: { fontSize: 14, color: colors.textMuted, marginBottom: 20 },
  platformsContainer: { gap: 16 },
  platformCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    borderRadius: 12,
    padding: 16,
  },
  platformCardSelected: { borderColor: colors.primary, backgroundColor: `${colors.primary}05` },
  platformHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  platformInfoRow: { flexDirection: 'row', gap: 12, flex: 1, marginRight: 12 },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerConnected: { backgroundColor: `${colors.success}10`, borderColor: `${colors.success}20` },
  platformTextInfo: { flex: 1 },
  platformName: { fontSize: 16, fontWeight: '600', color: colors.textBody },
  platformDesc: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  connectedBadge: {
    backgroundColor: `${colors.success}20`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${colors.success}30`,
  },
  connectedBadgeText: { color: colors.success, fontSize: 10, fontWeight: '600' },
  connectButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  connectButtonText: { color: colors.background, fontSize: 13, fontWeight: '500' },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelButtonText: { color: colors.textBody, fontSize: 13, fontWeight: '500' },
  revokeButton: {
    backgroundColor: `${colors.error}10`,
    borderWidth: 1,
    borderColor: `${colors.error}30`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  revokeButtonText: { color: colors.error, fontSize: 13, fontWeight: '500' },
  connectForm: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
  },
  inputLabel: { fontSize: 14, fontWeight: '500', color: colors.textBody, marginBottom: 8 },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textBody,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { color: colors.background, fontSize: 14, fontWeight: '600' },
  agentContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    borderRadius: 12,
    padding: 16,
  },
  agentInfo: { fontSize: 14, color: colors.textMuted, marginBottom: 16, lineHeight: 20 },
  generateButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  generateButtonText: { color: colors.background, fontSize: 14, fontWeight: '500' },
  keyGeneratedCard: {
    backgroundColor: `${colors.success}10`,
    borderWidth: 1,
    borderColor: `${colors.success}20`,
    borderRadius: 12,
    padding: 16,
  },
  successRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  successText: { color: colors.success, fontSize: 16, fontWeight: '600' },
  warningText: { color: `${colors.success}cc`, fontSize: 13, marginBottom: 16 },
  keyBox: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    borderRadius: 8,
    padding: 12,
  },
  keyText: { color: colors.textBody, fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
});
