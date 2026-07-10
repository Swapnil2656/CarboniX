import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { colors } from '../../src/theme/colors';
import { agentsApi } from '../../src/services/api/endpoints';

// Helper to format time ago
function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

// Map agent types to icons and colors
const getAgentMeta = (type: string, status: string) => {
  if (status !== 'SUCCESS') return { icon: 'sync', color: colors.textMuted, label: 'Running...' };
  switch (type) {
    case 'COLLECTOR':
      return { icon: 'data-usage', color: colors.primary, label: 'Collector Agent' };
    case 'ANALYST':
      return { icon: 'auto-awesome', color: '#f5c518', label: 'Analyst Agent' }; // Yellow
    case 'CICD_GATE':
      return { icon: 'security', color: '#ff5555', label: 'Gate Agent' };
    case 'REPORTER':
      return { icon: 'article', color: '#50FA7B', label: 'Reporter Agent' };
    default:
      return { icon: 'smart-toy', color: colors.textMuted, label: 'Unknown Agent' };
  }
};

export default function AgentFeedScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['agentRuns'],
    queryFn: () => agentsApi.getAgentRuns({ limit: 20 }),
  });

  const runs = data?.data || [];

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={[styles.topBar, { paddingTop: insets.top, height: 56 + insets.top }]}>
        <View style={styles.topBarLeft}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
          <Text style={styles.logo}>CarboniX</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => refetch()}>
          <MaterialIcons name="refresh" size={24} color={isRefetching ? colors.primary : colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Agent Feed</Text>
          <Text style={styles.subtitle}>Real-time automated orchestration logs</Text>
        </View>

        {/* Feed List */}
        <View style={styles.feedContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
          ) : isError ? (
            <View style={styles.errorBox}>
              <MaterialIcons name="error-outline" size={24} color={colors.error} />
              <Text style={styles.errorText}>Failed to load feed: {(error as any)?.message}</Text>
              <TouchableOpacity onPress={() => refetch()} style={styles.retryBtn}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : runs.length === 0 ? (
            <Text style={styles.emptyText}>No agent activity found.</Text>
          ) : (
            runs.map((run: any) => {
              const meta = getAgentMeta(run.agentType, run.status);
              const isExpanded = expandedId === run.id;
              
              return (
                <TouchableOpacity 
                  key={run.id} 
                  style={[styles.feedCard, isExpanded && styles.feedCardExpanded]}
                  activeOpacity={0.8}
                  onPress={() => setExpandedId(isExpanded ? null : run.id)}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.agentInfo}>
                      <MaterialIcons name={meta.icon as any} size={18} color={meta.color} />
                      <Text style={[styles.agentName, { color: meta.color }]}>{meta.label}</Text>
                    </View>
                    <Text style={styles.timeText}>{timeAgo(run.createdAt)}</Text>
                  </View>
                  
                  <Text style={styles.summaryText}>{run.summary || 'Executing tasks...'}</Text>
                  
                  {isExpanded && run.details && (
                    <View style={styles.expandedDetails}>
                      <View style={styles.divider} />
                      
                      {run.agentType === 'ANALYST' && run.details.recommendations?.map((rec: any, idx: number) => (
                        <View key={idx} style={styles.detailBlock}>
                          <Text style={styles.detailTitle}>🎯 Recommendation for {rec.instanceName || rec.instanceId}</Text>
                          <Text style={styles.detailText}>{rec.reasoning}</Text>
                          <TouchableOpacity style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>Apply Fix</Text>
                          </TouchableOpacity>
                        </View>
                      ))}

                      {run.agentType === 'CICD_GATE' && (
                        <View style={styles.detailBlock}>
                          <Text style={styles.detailTitle}>Gate Status: {run.details.passed ? 'PASSED ✅' : 'FAILED ❌'}</Text>
                          <Text style={styles.detailText}>Delta: {run.details.deltaKgPerDay} kg CO₂/day (Budget: {run.details.budgetKgPerDay} kg)</Text>
                        </View>
                      )}

                      {run.agentType === 'COLLECTOR' && (
                        <View style={styles.detailBlock}>
                          <Text style={styles.detailTitle}>Collection Results</Text>
                          <Text style={styles.detailText}>Processed {run.details.instanceCount} instances.</Text>
                          <Text style={styles.detailText}>Total footprint: {run.details.totalCarbonKg?.toFixed(2)} kg CO₂</Text>
                        </View>
                      )}
                    </View>
                  )}
                  
                  {!isExpanded && run.details?.recommendations?.length > 0 && (
                    <View style={styles.tapToReview}>
                      <Text style={styles.tapToReviewText}>Tap to review {run.details.recommendations.length} recommendation(s) →</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
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
    color: colors.textHeader,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: colors.textMuted,
  },
  feedContainer: {
    gap: 16,
  },
  feedCard: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  feedCardExpanded: {
    borderColor: colors.outlineVariant,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentName: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  timeText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  summaryText: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: colors.textHeader,
    lineHeight: 22,
    marginTop: 4,
  },
  tapToReview: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  tapToReviewText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: colors.primary,
  },
  expandedDetails: {
    marginTop: 8,
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 4,
  },
  detailBlock: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  detailTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.textHeader,
  },
  detailText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
  },
  actionBtn: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  actionBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.onPrimaryContainer,
  },
  emptyText: {
    fontFamily: 'Inter',
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
  errorBox: {
    backgroundColor: colors.errorContainer,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  errorText: {
    color: colors.onErrorContainer,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
  }
});
