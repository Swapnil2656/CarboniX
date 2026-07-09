import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/stores/auth.store';
import { AnimatedLogoLoader } from '../src/components/AnimatedLogoLoader';

export default function AnimatedSplashScreen() {
  const router = useRouter();
  const { loadToken } = useAuthStore();

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

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedLogoLoader 
        visible={true} 
        onAnimationComplete={() => setAnimationDone(true)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  }
});
