import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const TAB_BAR_PADDING = 8;
const tabWidth = (width - TAB_BAR_PADDING * 2) / 5;
const INDICATOR_SIZE = 56;
const INDICATOR_OFFSET = TAB_BAR_PADDING + (tabWidth / 2) - (INDICATOR_SIZE / 2);

function TabBarItem({ isFocused, onPress, iconName, label }: any) {
  const translateYIcon = useRef(new Animated.Value(isFocused ? -22 : 0)).current;
  const translateYText = useRef(new Animated.Value(isFocused ? 4 : 20)).current;
  const opacityText = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateYIcon, {
        toValue: isFocused ? -22 : 0,
        useNativeDriver: true,
        bounciness: 12,
      }),
      Animated.timing(translateYText, {
        toValue: isFocused ? 4 : 20,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityText, {
        toValue: isFocused ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.tabItem}>
      <Animated.View style={[styles.iconContainer, { transform: [{ translateY: translateYIcon }] }]}>
        <MaterialIcons 
          name={iconName as any} 
          size={24} 
          color={isFocused ? '#101417' : '#9CA3AF'} 
        />
      </Animated.View>
      <Animated.Text style={[styles.tabText, { opacity: opacityText, transform: [{ translateY: translateYText }] }]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
}

export function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Determine active index based on pathname roughly
  let activeIndex = -1;
  if (pathname.includes('compare') || pathname.includes('results')) activeIndex = 3;
  
  // If no match, let's just default to home for the visual effect
  if (activeIndex === -1) activeIndex = 0;

  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const translateX = useRef(new Animated.Value(currentIndex * tabWidth)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: currentIndex * tabWidth,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, [currentIndex]);

  const handlePress = (index: number, route: string) => {
    setCurrentIndex(index);
    setTimeout(() => {
      router.replace(route as any);
    }, 150); // slight delay to let animation start
  };

  const tabs = [
    { name: 'Home', icon: 'home', route: '/(tabs)/config' },
    { name: 'Console', icon: 'terminal', route: '/(tabs)/console' },
    { name: 'History', icon: 'history', route: '/(tabs)/history' },
    { name: 'Docs', icon: 'description', route: '/(tabs)/compare' },
    { name: 'Settings', icon: 'settings', route: '/(tabs)/settings' },
  ];

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <Animated.View style={[styles.indicator, { transform: [{ translateX }] }]} />
      {tabs.map((tab, index) => (
        <TabBarItem
          key={tab.name}
          isFocused={currentIndex === index}
          onPress={() => handlePress(index, tab.route)}
          iconName={tab.icon}
          label={tab.name}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191C1F',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    paddingHorizontal: TAB_BAR_PADDING,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 100,
  },
  indicator: {
    position: 'absolute',
    top: -24,
    left: INDICATOR_OFFSET,
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    backgroundColor: '#8BE9FD',
    borderRadius: INDICATOR_SIZE / 2,
    borderWidth: 6,
    borderColor: '#101417',
    shadowColor: '#8BE9FD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 0,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  tabText: {
    position: 'absolute',
    bottom: 8,
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    fontWeight: '700',
    color: '#8BE9FD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
