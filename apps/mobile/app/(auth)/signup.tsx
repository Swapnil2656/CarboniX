import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { FormInput } from '../../src/components/FormInput';
import { SocialButton } from '../../src/components/SocialButton';
import { MaterialIcons } from '@expo/vector-icons';
import { LOGO_SIZE, LOGO_GAP } from '../../src/constants/layout';

import { useAuthStore } from '../../src/stores/auth.store';

export default function SignupScreen() {
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getEntropyState = () => {
    const len = password.length;
    if (len === 0) return { text: 'Entropy check...', colors: [colors.primaryContainer + '33', colors.primaryContainer + '33', colors.primaryContainer + '33'] };
    if (len < 6) return { text: 'WEAK_ENTROPY', colors: [colors.error, colors.primaryContainer + '33', colors.primaryContainer + '33'] };
    if (len < 10) return { text: 'MODERATE_SECURITY', colors: [colors.primaryContainer, colors.primaryContainer, colors.primaryContainer + '33'] };
    return { text: 'SECURE_VECTORS_ARMED', colors: ['#31e368', '#31e368', '#31e368'] };
  };

  const entropy = getEntropyState();

  const handleSignup = () => {
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setAuth({ id: '2', email, name, type: 'user' }, 'mock-token');
      setIsLoading(false);
      router.replace('/(tabs)/config');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.abstractGlow} />

      <View style={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <View style={styles.brandingSection}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaePQOZta2HolrIdrsKoXDYVbDJHIIAXBJ-GQGjpbLgMH5kncWg57srUT-_LZNy4hl6E6jJ2tPOf7hw8Ls8P1YmmwyHUebY39KLS_2dQsL6XHxqvsIxJ5pWkS19j4Q223WC4SN3lDBm3bCdjD0gUPU564liFQr61Fy_eZR6mGCVAoh241x2TIyKbMS7WrqV9yo0UMbbN0qnSwBL4_2DCsWlaGVgdzHvW4fU2KEd26-bqlWw23k_NCrpL9bBCFA_PFhuqPhY7iu-ZAQGgs' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Join CarboniX</Text>
            <Text style={styles.subtitle}>Start monitoring your carbon footprint with developer-first tools.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.dataTag}>
              <Text style={styles.dataTagText}>REG_v4.02</Text>
            </View>

            <FormInput
              label="Full Name"
              icon="person"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              variant="brutalist"
              autoCapitalize="words"
              containerStyle={{ marginBottom: 8 }}
            />

            <FormInput
              label="Work Email"
              icon="alternate-email"
              placeholder="dev@company.com"
              value={email}
              onChangeText={setEmail}
              variant="brutalist"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={{ marginBottom: 8 }}
              error={error && error.includes('email') ? error : undefined}
            />

            <View style={styles.passwordContainer}>
              <FormInput
                label="Password"
                icon="terminal"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                variant="brutalist"
                secureTextEntry
                containerStyle={{ marginBottom: 4 }}
                error={(error && error.includes('Password') || error.includes('fields')) ? error : undefined}
              />
              <View style={styles.entropyContainer}>
                <View style={[styles.entropyBar, { backgroundColor: entropy.colors[0] }]} />
                <View style={[styles.entropyBar, { backgroundColor: entropy.colors[1] }]} />
                <View style={[styles.entropyBar, { backgroundColor: entropy.colors[2] }]} />
                <Text style={styles.entropyText}>{entropy.text}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.onPrimaryContainer} />
              ) : (
                <>
                  <Text style={styles.submitText}>Create Account</Text>
                  <MaterialIcons name="arrow-forward" size={20} color={colors.onPrimaryContainer} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR AUTH VIA</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <SocialButton provider="google" title="Google" variant="brutalist" />
              <View style={{ width: 16 }} />
              <SocialButton provider="github" title="GitHub" variant="brutalist" />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomTrace}>
            <Text style={styles.traceText}>SECURED BY CARBONIX_SHIELD</Text>
            <View style={styles.traceLine} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingVertical: 16,
  },
  abstractGlow: {
    position: 'absolute',
    top: 0,
    width: '150%',
    height: 400,
    backgroundColor: 'rgba(255, 229, 160, 0.05)',
    borderRadius: 200,
    transform: [{ translateY: -150 }],
  },
  innerContainer: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
    zIndex: 10,
  },
  brandingSection: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    height: LOGO_SIZE.height,
    width: LOGO_SIZE.width,
    marginBottom: LOGO_GAP,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 320,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: 12,
    position: 'relative',
  },
  dataTag: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dataTagText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: colors.onPrimaryContainer,
  },
  passwordContainer: {
    marginBottom: 4,
  },
  entropyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  entropyBar: {
    height: 4,
    width: 32,
    marginRight: 4,
  },
  entropyText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.outlineVariant,
    marginLeft: 4,
  },
  submitButton: {
    width: '100%',
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginTop: 4,
  },
  submitText: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(78, 70, 51, 0.3)',
  },
  dividerText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.outlineVariant,
    marginHorizontal: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: colors.textMuted,
  },
  loginText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primaryContainer,
    textDecorationLine: 'underline',
  },
  bottomTrace: {
    marginTop: 8,
    alignItems: 'center',
    opacity: 0.2,
  },
  traceText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: colors.outlineVariant,
    marginBottom: 4,
  },
  traceLine: {
    width: 64,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
});
