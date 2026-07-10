// Removed @react-navigation/native import
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme, View, Text } from 'react-native';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { MaterialIcons } from '@expo/vector-icons';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadAllFonts() {
      try {
        console.log('Starting font load...');
        await Font.loadAsync({
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
          'Inter': Inter_400Regular,
          'Inter-Medium': Inter_500Medium,
          'Inter-SemiBold': Inter_600SemiBold,
          'Inter-Bold': Inter_700Bold,
          'Inter-Black': Inter_900Black,
          'JetBrains Mono': JetBrainsMono_400Regular,
          'JetBrainsMono-Medium': JetBrainsMono_500Medium,
          'JetBrainsMono-Bold': JetBrainsMono_700Bold,
          'MaterialIconsCustom': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        });
        console.log('Fonts loaded successfully!');
        setLoaded(true);
      } catch (e: any) {
        console.log('Error loading fonts:', e);
        setError(e);
      }
    }
    loadAllFonts();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="results/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </QueryClientProvider>
  );
}
