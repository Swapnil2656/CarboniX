import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../src/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DocsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>CarboniX Documentation</Text>
        <Text style={styles.subtitle}>Mobile Intelligence V1.1</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's New</Text>
          <Text style={styles.paragraph}>
            CarboniX Mobile now integrates with our highly resilient 49-point verified API. The AI Chat Engine natively handles network drops and gracefully degrades instead of throwing blank screens. 
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Features</Text>
          <Text style={styles.bullet}>• Live Grid Carbon Tracking</Text>
          <Text style={styles.bullet}>• AI Chat & Recommendations</Text>
          <Text style={styles.bullet}>• Fleet & Telemetry Observability</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agentic System</Text>
          <Text style={styles.paragraph}>
            The mobile app pulls directly from our autonomous backend agents. The Analyst and Collector pipelines format exact data and send push notifications on dirty deployments.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textHeader,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 32,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.surfaceLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textHeader,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  bullet: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 24,
    marginLeft: 8,
  }
});
