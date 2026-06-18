import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '../../src/stores/auth.store';

export default function AuthLayout() {
  // AUTH GUARD: If already authenticated, redirect away from auth screens
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);

  // While loading token, don't redirect yet
  if (isLoading) return null;

  // If already logged in, go straight to Home
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/config" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify" />
    </Stack>
  );
}
