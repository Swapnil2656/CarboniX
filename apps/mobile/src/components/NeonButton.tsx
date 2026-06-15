import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

interface NeonButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ title, icon, loading, buttonStyle, textStyle, ...rest }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, buttonStyle, rest.disabled && styles.disabled]} 
      activeOpacity={0.8} 
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={colors.onPrimary} />
      ) : (
        <>
          {icon && <MaterialIcons name={icon} size={20} color={colors.onPrimary} style={styles.icon} />}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
});
