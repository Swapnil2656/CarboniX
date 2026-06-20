import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { carbonApi } from '../../src/services/api/endpoints';

const INITIAL_PAYLOAD = {
  provider: "aws",
  region: "us-east-1",
  cpuCores: 8,
  memoryGb: 32,
  storageGb: 500,
  durationHours: 730
};

export default function ConsoleScreen() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [timeMs, setTimeMs] = useState(0);

  const handleFire = async () => {
    setLoading(true);
    setResponse(null);
    const start = Date.now();
    try {
      const res = await carbonApi.calculate(INITIAL_PAYLOAD);
      setResponse(res);
    } catch (err: any) {
      setResponse({ error: err.message || 'Failed' });
    } finally {
      setTimeMs(Date.now() - start);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>API Console</Text>
          <Text style={styles.subtitle}>Live environment for testing calculation endpoints.</Text>
        </View>

        {/* Endpoint Selector */}
        <View style={styles.endpointSelector}>
          <View style={styles.methodBadge}>
            <Text style={styles.methodText}>POST</Text>
          </View>
          <Text style={styles.endpointUrl} numberOfLines={1}>
            /api/v1/carbon/calculate
          </Text>
          <TouchableOpacity style={styles.fireBtn} onPress={handleFire} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#695200" />
            ) : (
              <>
                <MaterialIcons name="play-arrow" size={20} color={colors.onPrimaryContainer} />
                <Text style={styles.fireBtnText}>Fire Request</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Editor Grid: Request Body */}
        <View style={styles.editorSection}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>REQUEST BODY</Text>
            <Text style={styles.editorMeta}>JSON</Text>
          </View>
          <View style={styles.codeBlock}>
            <ScrollView horizontal>
              <Text style={styles.codeText}>
                {JSON.stringify(INITIAL_PAYLOAD, null, 2)}
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.copyBtn}>
              <MaterialIcons name="content-copy" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Editor Grid: Response Block */}
        <View style={styles.editorSection}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>RESPONSE</Text>
            {response && !response.error && (
              <View style={styles.responseTags}>
                <View style={styles.tagSuccess}>
                  <MaterialIcons name="check" size={12} color="#002108" />
                  <Text style={styles.tagSuccessText}>200 OK</Text>
                </View>
                <View style={styles.tagTime}>
                  <Text style={styles.tagTimeText}>{timeMs}ms</Text>
                </View>
              </View>
            )}
            {response && response.error && (
              <View style={styles.responseTags}>
                <View style={[styles.tagSuccess, { backgroundColor: colors.errorContainer }]}>
                  <MaterialIcons name="error" size={12} color={colors.onErrorContainer} />
                  <Text style={[styles.tagSuccessText, { color: colors.onErrorContainer }]}>ERROR</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.codeBlock}>
            <ScrollView horizontal>
              <Text style={styles.codeText}>
                {response ? JSON.stringify(response, null, 2) : '// Click Fire Request to see response...'}
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.copyBtn}>
              <MaterialIcons name="content-copy" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
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
    height: 56,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingTop: 8,
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
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
    marginLeft: -6,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100,
    gap: 24,
  },
  header: {
    gap: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    fontWeight: '900',
    color: colors.textHeader,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: colors.textMuted,
  },
  endpointSelector: {
    backgroundColor: '#2A2A2A', // surface-container-high
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'column',
    gap: 16,
  },
  methodBadge: {
    backgroundColor: '#90ff9e', // tertiary
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  methodText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#003912',
    textTransform: 'uppercase',
  },
  endpointUrl: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: '#e5e2e1',
  },
  fireBtn: {
    backgroundColor: '#f5c518', // primary-container
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  fireBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#695200', // on-primary-container
  },
  editorSection: {
    gap: 8,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  editorTitle: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textMuted,
    letterSpacing: 1.1,
  },
  editorMeta: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
    opacity: 0.5,
  },
  responseTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31e368', // tertiary-fixed-dim
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  tagSuccessText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#002108',
  },
  tagTime: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagTimeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#e5e2e1',
  },
  codeBlock: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    height: 300,
    position: 'relative',
  },
  codeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    lineHeight: 24,
  },
  copyBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2A2A2A',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  // Syntax highlighting colors
  key: { color: '#b48ead' }, // Purple
  string: { color: '#a3be8c' }, // Green/Yellow
  number: { color: '#d08770' }, // Orange
  punct: { color: '#8fbcbb' }, // Cyan
});
