import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { FormInput } from '../../src/components/FormInput';
import { NeonButton } from '../../src/components/NeonButton';
import { SocialButton } from '../../src/components/SocialButton';
import { LOGO_SIZE, LOGO_GAP } from '../../src/constants/layout';

import { useAuthStore } from '../../src/stores/auth.store';

export default function LoginScreen() {
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setAuth({ id: '1', email, name: email.split('@')[0], type: 'user' }, 'mock-token');
      setIsLoading(false);
      // Navigate to main app
      router.replace('/(tabs)/config');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background Decor */}
      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBitSBnKxkLqhvcE5MZUUE4HctuFSrGWVdMI_HTSm3Rn7VJU9do9nWxcTA9TXUS4R5zTt4dsiMh2fCk9WIiBUhu5PX70pEvrjGYFzwjI78EJMOxn9Q5bqctnb06G69jDLzIc3SY_c9UqBKgoZagFH7HNkkh-s9t53cLGuaQmYEgu8jd-cL0NeijO7v-wL4Ja77sK7a1bt3cLI8yTwoAl97n-94S5Jm25mykUcDhsRd0SrT3NnkhL_Qq_qBjI1soOImQ0vFHei1VG3PIXtM' }}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Welcome to CarboniX</Text>
            <Text style={styles.subtitle}>Log in to access your carbon intelligence console.</Text>
          </View>

          <View style={styles.formContainer}>
            <FormInput
              label="Email Address"
              icon="alternate-email"
              placeholder="dev@carbonix.io"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={error.includes('email') || error.includes('all') ? error : undefined}
            />

            <FormInput
              label="Password"
              icon="lock"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={error.includes('all') ? error : undefined}
              rightElement={
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              }
            />

            <NeonButton
              title="Log In"
              icon="arrow-forward"
              onPress={handleLogin}
              loading={isLoading}
              buttonStyle={styles.loginButton}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <SocialButton provider="github" title="GitHub" />
              <View style={{ width: 16 }} />
              <SocialButton provider="google" title="Google" />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')} activeOpacity={0.7}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.globalFooter}>
            <View style={styles.nodeStatus}>
              <View style={styles.nodeStatusDot} />
              <Text style={styles.nodeStatusText}>NODE STATUS: OPERATIONAL</Text>
            </View>
            <Text style={styles.versionText}>© 2024 CARBONIX ENGINE  V2.4.0-STABLE</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgGlow1: {
    position: 'absolute',
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primaryContainer,
    opacity: 0.05,
    transform: [{ scale: 1.5 }],
  },
  bgGlow2: {
    position: 'absolute',
    bottom: -100,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.info,
    opacity: 0.03,
    transform: [{ scale: 1.5 }],
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 24,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logo: {
    height: LOGO_SIZE.height,
    width: LOGO_SIZE.width,
    marginBottom: LOGO_GAP,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 36,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 320,
  },
  formContainer: {
    width: '100%',
    marginBottom: 12,
  },
  forgotPassword: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.primaryContainer,
    letterSpacing: -0.5,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  dividerText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: 'rgba(209, 197, 172, 0.5)',
    textTransform: 'uppercase',
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: colors.textMuted,
  },
  signUpText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primaryContainer,
  },
  globalFooter: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(78, 70, 51, 0.3)',
    paddingTop: 12,
  },
  nodeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nodeStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  nodeStatusText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: 'rgba(209, 197, 172, 0.6)',
    letterSpacing: 1,
  },
  versionText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: 'rgba(209, 197, 172, 0.6)',
    letterSpacing: 1,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#1C2333',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A3441',
  },
  button: {
    backgroundColor: '#BD93F9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#0A0F1C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#8BE9FD',
  }
});
