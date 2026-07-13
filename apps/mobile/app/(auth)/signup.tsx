import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { FormInput } from '../../src/components/FormInput';
import { MaterialIcons } from '@expo/vector-icons';
import { LOGO_SIZE, LOGO_GAP } from '../../src/constants/layout';

import { useAuthStore } from '../../src/stores/auth.store';
import { authApi } from '../../src/services/api/endpoints';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
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

  const handleSignup = async () => {
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

    try {
      const response = await authApi.signup({ name, email, password });
      if (response.success && response.data) {
        const { user, token } = response.data;
        setAuth({ id: user.id, email: user.email, name: user.name, type: 'user' }, token);
        router.replace('/(tabs)/config');
      } else {
        setError(response.error || 'Signup failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'An error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.abstractGlow, { width: windowWidth * 1.5, height: windowWidth * 1.5, borderRadius: windowWidth * 0.75, top: -(windowWidth * 0.5) }]} />

      <View style={[styles.scrollContent, { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.innerContainer}>
          <View style={styles.brandingSection}>
            <Image
              source={require('../../assets/carbonix-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Create Account</Text>
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

          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  abstractGlow: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 229, 160, 0.05)',
    left: '-25%',
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
    backgroundColor: '#8BE9FD',
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
    color: '#BD93F9',
  }
});
