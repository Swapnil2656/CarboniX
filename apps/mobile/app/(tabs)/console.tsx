import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';

export default function ConsoleScreen() {
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
            https://api.carbonix.io/v1/calculate
          </Text>
          <TouchableOpacity style={styles.fireBtn}>
            <MaterialIcons name="play-arrow" size={20} color={colors.onPrimaryContainer} />
            <Text style={styles.fireBtnText}>Fire Request</Text>
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
                <Text style={styles.punct}>{'{'}</Text>{'\n'}
                <Text style={styles.key}>  "facility_id"</Text><Text style={styles.punct}>: </Text><Text style={styles.string}>"FAC-84729"</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>  "timestamp"</Text><Text style={styles.punct}>: </Text><Text style={styles.string}>"2023-10-27T14:32:00Z"</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>  "metrics"</Text><Text style={styles.punct}>: {'{'}</Text>{'\n'}
                <Text style={styles.key}>    "power_usage_kwh"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>1450.5</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>    "cooling_water_liters"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>8200</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>    "generator_fuel_liters"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>0</Text>{'\n'}
                <Text style={styles.punct}>  {'},'}</Text>{'\n'}
                <Text style={styles.key}>  "grid_mix"</Text><Text style={styles.punct}>: {'{'}</Text>{'\n'}
                <Text style={styles.key}>    "solar_pct"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>25</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>    "wind_pct"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>15</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>    "fossil_pct"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>60</Text>{'\n'}
                <Text style={styles.punct}>  {'}'}</Text>{'\n'}
                <Text style={styles.punct}>{'}'}</Text>
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
            <View style={styles.responseTags}>
              <View style={styles.tagSuccess}>
                <MaterialIcons name="check" size={12} color="#002108" />
                <Text style={styles.tagSuccessText}>200 OK</Text>
              </View>
              <View style={styles.tagTime}>
                <Text style={styles.tagTimeText}>234ms</Text>
              </View>
            </View>
          </View>
          <View style={styles.codeBlock}>
            <ScrollView horizontal>
              <Text style={styles.codeText}>
                <Text style={styles.punct}>{'{'}</Text>{'\n'}
                <Text style={styles.key}>  "status"</Text><Text style={styles.punct}>: </Text><Text style={styles.string}>"success"</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>  "calculation_id"</Text><Text style={styles.punct}>: </Text><Text style={styles.string}>"CALC-993821"</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>  "data"</Text><Text style={styles.punct}>: {'{'}</Text>{'\n'}
                <Text style={styles.key}>    "total_emissions_kgco2e"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>684.2</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>    "breakdown"</Text><Text style={styles.punct}>: {'{'}</Text>{'\n'}
                <Text style={styles.key}>      "scope_2"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>684.2</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>      "scope_1"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>0</Text>{'\n'}
                <Text style={styles.punct}>    {'},'}</Text>{'\n'}
                <Text style={styles.key}>    "intensity_factor"</Text><Text style={styles.punct}>: </Text><Text style={styles.number}>0.471</Text><Text style={styles.punct}>,</Text>{'\n'}
                <Text style={styles.key}>    "rating"</Text><Text style={styles.punct}>: </Text><Text style={styles.string}>"B"</Text>{'\n'}
                <Text style={styles.punct}>  {'}'}</Text>{'\n'}
                <Text style={styles.punct}>{'}'}</Text>
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
