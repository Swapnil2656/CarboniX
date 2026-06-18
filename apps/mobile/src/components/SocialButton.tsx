import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { colors } from '../theme/colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export interface SocialButtonProps extends TouchableOpacityProps {
  title: string;
  provider: 'google' | 'github';
  variant?: 'default' | 'brutalist';
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  provider,
  variant = 'default',
  ...rest
}) => {
  const isBrutalist = variant === 'brutalist';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isBrutalist ? styles.buttonBrutalist : styles.buttonDefault,
      ]}
      activeOpacity={isBrutalist ? 0.8 : 0.7}
      {...rest}
    >
      {provider === 'google' ? (
        <FontAwesome name="google" size={18} color={isBrutalist ? colors.outlineVariant : colors.textHeader} style={styles.icon} />
      ) : (
        <FontAwesome name="github" size={18} color={isBrutalist ? colors.outlineVariant : colors.textHeader} style={styles.icon} />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerLow,
  },
  buttonBrutalist: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 0,
    backgroundColor: colors.surfaceContainer,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textHeader,
    textTransform: 'uppercase',
  },
});
