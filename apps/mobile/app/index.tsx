import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';
import { useAuthStore } from '../src/stores/auth.store';

export default function AnimatedSplashScreen() {
  const router = useRouter();
  const { loadToken } = useAuthStore();

  const [percent, setPercent] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Track when both animation AND token loading are complete
  const [animationDone, setAnimationDone] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  // Navigate only when BOTH animation finishes AND token is loaded
  const navigateWhenReady = useCallback(() => {
    if (!animationDone || !tokenLoaded) return;

    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      router.replace('/(tabs)/config');
    } else {
      router.replace('/(auth)/login');
    }
  }, [animationDone, tokenLoaded, router]);

  useEffect(() => {
    navigateWhenReady();
  }, [navigateWhenReady]);

  useEffect(() => {
    // 1. Load auth token in the background, then mark as loaded
    let isMounted = true;
    loadToken().then(() => {
      if (isMounted) setTokenLoaded(true);
    }).catch(() => {
      if (isMounted) setTokenLoaded(true); // Still mark loaded on error so we proceed to login
    });

    // 2. Animate the progress bar width
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.bezier(0.65, 0, 0.35, 1),
      useNativeDriver: false,
    }).start();

    // 3. Pulse the text opacity
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 4. Update the percentage text
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 5) + 1;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(interval);

        // Wait a beat then mark animation done
        setTimeout(() => {
          setAnimationDone(true);
        }, 500);
      }
      setPercent(currentPercent);
    }, 100);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.main}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/carbonix-logo.png')} style={styles.logoImage} />
        </View>

        {/* Brand Identity */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>CARBONIX</Text>
        </View>

        {/* System Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
          <View style={styles.progressRow}>
            <Animated.Text style={[styles.progressLabel, { opacity: opacityAnim }]}>
              INITIALIZING...
            </Animated.Text>
            <Text style={styles.progressValue}>{percent}%</Text>
          </View>
        </View>
      </View>

      {/* Technical Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTopRow}>
          <View style={styles.statusIndicatorRow}>
            <Animated.View style={[styles.statusDot, { opacity: opacityAnim }]} />
            <Text style={styles.statusText}>SYSTEM_INIT_SUCCESS</Text>
          </View>
          <View style={styles.versionRow}>
            <Text style={styles.versionText}>v2.4.0-stable</Text>
            <Text style={styles.syncingText}>SYNCING LEDGER DATA...</Text>
          </View>
        </View>

        <View style={styles.footerBottomRow}>
          <Text style={styles.footerInfoText}>Status: Online</Text>
          <Text style={styles.footerInfoText}>Build: Production</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 384,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  logoContainer: {
    width: 140,
    height: 140,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  brandContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  brandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.primaryContainer,
    textTransform: 'uppercase',
    letterSpacing: -1.2,
  },
  progressSection: {
    width: 240,
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 2,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  progressLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#31e368',
    textTransform: 'uppercase',
  },
  progressValue: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 48,
    opacity: 0.8,
    zIndex: 50,
  },
  footerTopRow: {
    alignItems: 'center',
  },
  statusIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38e86c',
  },
  statusText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#90ff9e',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  versionRow: {
    flexDirection: 'row',
    gap: 24,
  },
  versionText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#90ff9e',
    opacity: 0.6,
  },
  syncingText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: -0.5,
  },
  footerBottomRow: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(78, 70, 51, 0.1)',
    paddingTop: 16,
  },
  footerInfoText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.outline,
  },
});
