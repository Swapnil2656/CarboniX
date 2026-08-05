import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../src/theme/colors';
import { useAuthStore } from '../../src/stores/auth.store';
import { AiBotModal } from '../../src/components/AiBotModal';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const tabWidth = width / 5;
const INDICATOR_SIZE = 48; 
const TAB_HEIGHT = 50;

function TabBarItem({ isFocused, onPress, onLongPress, iconName, label }: any) {
  // Icon pop distance to perfectly center in the 48px circle located exactly at the top border (y=0)
  // Default icon center is at y=25 (top:13 + height/2:12). So translateY must be -25.
  const translateYIcon = useRef(new Animated.Value(isFocused ? -25 : 0)).current;
  const translateYText = useRef(new Animated.Value(isFocused ? 0 : 15)).current;
  const opacityText = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateYIcon, {
        toValue: isFocused ? -25 : 0,
        useNativeDriver: true,
        bounciness: 10,
      }),
      Animated.timing(translateYText, {
        toValue: isFocused ? 0 : 15,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityText, {
        toValue: isFocused ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabItem}
    >
      <Animated.View style={[styles.iconContainer, { transform: [{ translateY: translateYIcon }] }]}>
        <MaterialIcons 
          name={iconName as any} 
          size={24} 
          color={isFocused ? '#131313' : colors.textMuted} 
        />
      </Animated.View>
      <Animated.Text style={[styles.tabText, { 
        color: isFocused ? colors.textHeader : colors.textMuted,
        opacity: opacityText,
        transform: [{ translateY: translateYText }]
      }]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(state.index * tabWidth)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      bounciness: 8,
      speed: 16,
    }).start();
  }, [state.index]);

  return (
    <View style={[styles.tabBarContainer, { height: TAB_HEIGHT + Math.max(insets.bottom, 0), paddingBottom: Math.max(insets.bottom, 0) }]}>
      {/* Magic Indicator */}
      <Animated.View 
        style={[
          styles.indicatorWrapper, 
          { transform: [{ translateX }] }
        ]} 
      >
        <View style={styles.indicator}>
          {/* Left Cutout Curve Illusion */}
          <View style={styles.cutoutLeft} />
          {/* Right Cutout Curve Illusion */}
          <View style={styles.cutoutRight} />
        </View>
      </Animated.View>

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        if (route.name === 'config') iconName = 'calculate';
        if (route.name === 'compare') iconName = 'compare-arrows';
        if (route.name === 'console') iconName = 'dashboard';
        if (route.name === 'history') iconName = 'history';
        if (route.name === 'settings') iconName = 'settings';

        return (
          <TabBarItem 
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            iconName={iconName}
            label={label}
          />
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  // AUTH GUARD: Block unauthenticated access to tabs
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);
  const insets = useSafeAreaInsets();

  const [aiBotVisible, setAiBotVisible] = useState(false);

  // While loading token, don't redirect yet
  if (isLoading) return null;

  // If not authenticated, redirect to login immediately
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="console"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="config" options={{ title: 'Calculator' }} />
        <Tabs.Screen name="compare" options={{ title: 'Compare' }} />
        <Tabs.Screen name="console" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="history" options={{ title: 'History' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      </Tabs>

      {/* Floating Action Button for AI Bot */}
      <TouchableOpacity 
        style={[styles.fab, { bottom: TAB_HEIGHT + Math.max(insets.bottom, 0) + 16 }]}
        onPress={() => setAiBotVisible(true)}
      >
        <FontAwesome5 name="robot" size={24} color="#131313" />
      </TouchableOpacity>
      
      <AiBotModal 
        visible={aiBotVisible} 
        onClose={() => setAiBotVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: TAB_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  indicatorWrapper: {
    position: 'absolute',
    top: -(INDICATOR_SIZE / 2), 
    left: 0,
    width: tabWidth,
    alignItems: 'center',
    zIndex: 0,
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    backgroundColor: colors.primary, 
    borderRadius: INDICATOR_SIZE / 2,
    borderWidth: 5,
    borderColor: colors.background, 
  },
  cutoutLeft: {
    position: 'absolute',
    top: '50%',
    left: -18,
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderTopRightRadius: 16,
  },
  cutoutRight: {
    position: 'absolute',
    top: '50%',
    right: -18,
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 16,
  },
  tabItem: {
    flex: 1,
    height: TAB_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 13, 
    width: 24,
    height: 24,
  },
  tabText: {
    position: 'absolute',
    bottom: 6,
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 100,
  }
});
