import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  withRepeat,
  withSequence,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface AnimatedLogoLoaderProps {
  visible: boolean;
  onAnimationComplete?: () => void;
}

export const AnimatedLogoLoader = ({ visible, onAnimationComplete }: AnimatedLogoLoaderProps) => {
  const { width, height } = useWindowDimensions();
  const [isRendered, setIsRendered] = useState(visible);
  
  // Exit Animation
  const overlayOpacity = useSharedValue(1);
  const overlayScale = useSharedValue(1);
  
  // Entrance Animations
  const logoScale = useSharedValue(0.85);
  const logoTranslateY = useSharedValue(20);
  const logoOpacity = useSharedValue(0);
  
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(10);
  
  // Progress Bar
  const progressLeft = useSharedValue(-100);
  
  // Glitch Effect
  const glitchOpacity = useSharedValue(0.8);
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      overlayOpacity.value = 1;
      overlayScale.value = 1;
      
      // Reset values
      logoScale.value = 0.85;
      logoTranslateY.value = 20;
      logoOpacity.value = 0;
      contentOpacity.value = 0;
      contentTranslateY.value = 10;
      progressLeft.value = -100;
      
      // Logo Entrance (1.8s)
      logoOpacity.value = withTiming(1, { duration: 1800, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
      logoScale.value = withTiming(1, { duration: 1800, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
      logoTranslateY.value = withTiming(0, { duration: 1800, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
      
      // Content Entrance (after 1.8s)
      contentOpacity.value = withDelay(1800, withTiming(1, { duration: 800, easing: Easing.bezier(0.22, 1, 0.36, 1) }));
      contentTranslateY.value = withDelay(1800, withTiming(0, { duration: 800, easing: Easing.bezier(0.22, 1, 0.36, 1) }));
      
      // Progress Bar Looping (3s)
      progressLeft.value = withRepeat(
        withTiming(100, { duration: 3000, easing: Easing.linear }),
        -1, // infinite
        false
      );
      
      // Terminal Glitch
      glitchOpacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 1000 }),
          withTiming(0.8, { duration: 1000 })
        ),
        -1,
        true
      );
      
      // Pulse Dot
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );

      // Trigger completion callback if provided (e.g. at 3.5s)
      if (onAnimationComplete) {
        setTimeout(() => {
          onAnimationComplete();
        }, 3500);
      }
      
    } else {
      // Exit Animation
      overlayOpacity.value = withTiming(0, { duration: 600, easing: Easing.bezier(0.7, 0, 0.3, 1) });
      overlayScale.value = withTiming(1.05, { duration: 600, easing: Easing.bezier(0.7, 0, 0.3, 1) }, (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
        }
      });
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    transform: [{ scale: overlayScale.value }],
    display: overlayOpacity.value === 0 && !isRendered ? 'none' : 'flex'
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value }
    ]
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }]
  }));
  
  const progressFillStyle = useAnimatedStyle(() => ({
    left: `${progressLeft.value}%`
  }));
  
  const glitchStyle = useAnimatedStyle(() => ({
    opacity: glitchOpacity.value
  }));
  
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value
  }));

  if (!isRendered && !visible) return null;

  return (
    <Animated.View style={[styles.container, overlayStyle, { width, height }]}>
      <View style={styles.noiseOverlay} pointerEvents="none" />
      
      <View style={styles.main}>
        {/* Animated Logo */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Image source={require('../../assets/carbonix-logo.png')} style={styles.logoImage} />
        </Animated.View>

        {/* Text Entrance Content */}
        <Animated.View style={[styles.brandContainer, contentStyle]}>
          <Text style={styles.title}>CARBONIX</Text>
          <Text style={styles.subtitle}>REAL-TIME CARBON INTELLIGENCE</Text>
          
          {/* Minimal Progress Indicator */}
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, progressFillStyle]} />
          </View>
        </Animated.View>
      </View>

      {/* System Footer */}
      <Animated.View style={[styles.footer, overlayStyle]}>
        <View style={styles.footerContent}>
          <Animated.View style={glitchStyle}>
            <MaterialIcons name="terminal" size={10} color="#31e368" />
          </Animated.View>
          <Text style={styles.footerText}>V2.4.0 SYSTEM_READY</Text>
          <Animated.View style={[styles.pulseDot, pulseStyle]} />
          <Text style={styles.buildText}>BUILD: PRODUCTION_NODE_01</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#131313',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFill,
    opacity: 0.03,
    backgroundColor: 'transparent',
    // In a real app we'd use an Image with resizeMode="repeat" for noise, 
    // but a solid transparent view acts as a placeholder if no noise asset exists.
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  logoContainer: {
    width: 140, // Uses standard sizing from constants roughly
    height: 140,
    marginBottom: 24,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  brandContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Black',
    fontSize: 36, // display-lg-mobile
    color: '#e5e2e1',
    letterSpacing: -0.72, // -0.02em
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: '#f5c518',
    letterSpacing: 0.7, // 0.05em
    textTransform: 'uppercase',
    marginTop: 4,
  },
  progressTrack: {
    height: 1,
    width: 120,
    backgroundColor: '#2A2A2A',
    marginTop: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '40%',
    backgroundColor: '#f5c518',
    position: 'absolute',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#31e368',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  pulseDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#f0c110', // primary-fixed-dim / tertiary depending on spec, keeping green theme
  },
  buildText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: '#9a9078', // outline color
    marginLeft: 8,
    textTransform: 'uppercase',
  },
});
