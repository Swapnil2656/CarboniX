import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  withSequence,
  Easing,
  useAnimatedProps
} from 'react-native-reanimated';
import Svg, { Path, Defs, Filter, FeDropShadow, G } from 'react-native-svg';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedLogoLoaderProps {
  visible: boolean;
  message?: string;
}

// Length constants based on SVG paths (overshot slightly to ensure full coverage)
const HEXAGON_LENGTH = 300;
const C_LENGTH = 70;
const X_LENGTH = 90;

export const AnimatedLogoLoader = ({ visible, message }: AnimatedLogoLoaderProps) => {
  const [isRendered, setIsRendered] = useState(visible);
  
  // Opacity for the whole overlay
  const overlayOpacity = useSharedValue(visible ? 1 : 0);

  // SVG Paths Stroke Dashoffsets
  const hexProgress = useSharedValue(HEXAGON_LENGTH);
  const cProgress = useSharedValue(C_LENGTH);
  const xProgress = useSharedValue(X_LENGTH);
  
  const logoScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(10);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      overlayOpacity.value = 1;
      
      // Phase 1: Outer Hexagon (0s - 0.8s)
      hexProgress.value = withTiming(0, { 
        duration: 800, 
        easing: Easing.inOut(Easing.ease) 
      });
      
      // Phase 2: Letter 'C' (0.8s - 1.2s)
      cProgress.value = withDelay(800, withTiming(0, { 
        duration: 400, 
        easing: Easing.inOut(Easing.ease) 
      }));
      
      // Phase 3: Letter 'X' (1.2s - 1.6s)
      xProgress.value = withDelay(1200, withTiming(0, { 
        duration: 400, 
        easing: Easing.inOut(Easing.ease) 
      }));
      
      // Phase 4: Glow Pulse (1.6s - 2.6s)
      logoScale.value = withDelay(1600, withSequence(
        withTiming(1.05, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
      ));
      
      // Phase 5: Text Entrance (2.0s - 2.6s)
      textOpacity.value = withDelay(2000, withTiming(1, { 
        duration: 600, 
        easing: Easing.inOut(Easing.ease) 
      }));
      textTranslateY.value = withDelay(2000, withTiming(0, { 
        duration: 600, 
        easing: Easing.inOut(Easing.ease) 
      }));
      
    } else {
      // Fade out smoothly
      overlayOpacity.value = withTiming(0, { duration: 400 }, (finished) => {
        if (finished) {
          // Reset values strictly when fully hidden
          hexProgress.value = HEXAGON_LENGTH;
          cProgress.value = C_LENGTH;
          xProgress.value = X_LENGTH;
          logoScale.value = 1;
          textOpacity.value = 0;
          textTranslateY.value = 10;
        }
      });
      
      // Prevent React state update on unmounted component by capturing timeout id
      const timeoutId = setTimeout(() => setIsRendered(false), 400);
      return () => clearTimeout(timeoutId);
    }
  }, [visible, overlayOpacity, hexProgress, cProgress, xProgress, logoScale, textOpacity, textTranslateY]);

  // Animated Props for SVG Paths
  const hexAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: hexProgress.value
  }));
  const cAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: cProgress.value
  }));
  const xAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: xProgress.value
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    display: overlayOpacity.value === 0 && !isRendered ? 'none' : 'flex'
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }]
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }]
  }));

  if (!isRendered && !visible) return null;

  return (
    <Animated.View style={[styles.container, overlayStyle]}>
      {/* Animated SVG Logo */}
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Svg width="140" height="140" viewBox="0 0 100 100">
          <Defs>
            <Filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <FeDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f5c518" floodOpacity="0.5" />
            </Filter>
          </Defs>
          <G filter="url(#glow)">
            <AnimatedPath
              d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
              fill="none"
              stroke="#f5c518"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={HEXAGON_LENGTH}
              animatedProps={hexAnimatedProps}
            />
            <AnimatedPath
              d="M42 35 L28 42 L28 58 L42 65"
              fill="none"
              stroke="#f5c518"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={C_LENGTH}
              animatedProps={cAnimatedProps}
            />
            <AnimatedPath
              d="M55 35 L75 65 M75 35 L55 65"
              fill="none"
              stroke="#f5c518"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={X_LENGTH}
              animatedProps={xAnimatedProps}
            />
          </G>
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.title}>CARBONIX</Text>
        <Text style={styles.subtitle}>{message || "REAL-TIME CARBON INTELLIGENCE"}</Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          V2.4.0 SYSTEM_READY • BUILD: PRODUCTION_NODE_01
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: '#131313',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#e5e2e1',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#f5c518',
    letterSpacing: 2,
    marginTop: 12,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  footerText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: '#31e368',
    letterSpacing: 0.5,
  }
});
