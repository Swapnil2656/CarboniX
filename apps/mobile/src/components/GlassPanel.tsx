import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '../theme/colors';

export const GlassPanel: React.FC<ViewProps> = ({ style, children, ...rest }) => {
  return (
    <View style={[styles.panel, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
});
