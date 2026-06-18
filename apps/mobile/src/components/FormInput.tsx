import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

export interface FormInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  rightElement?: React.ReactNode;
  error?: string;
  variant?: 'default' | 'brutalist';
  containerStyle?: ViewStyle;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  rightElement,
  error,
  variant = 'default',
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isBrutalist = variant === 'brutalist';

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <View style={styles.labelLeft}>
          {icon && variant === 'default' && (
            <MaterialIcons
              name={icon}
              size={14}
              color={isFocused ? colors.primaryContainer : colors.textMuted}
              style={styles.labelIcon}
            />
          )}
          <Text
            style={[
              styles.label,
              isFocused && styles.labelFocused,
              isBrutalist && styles.labelBrutalist,
            ]}
          >
            {label}
          </Text>
        </View>
        {rightElement}
      </View>

      <View
        style={[
          styles.inputWrapper,
          isBrutalist ? styles.inputWrapperBrutalist : styles.inputWrapperDefault,
          isFocused && (isBrutalist ? styles.inputWrapperBrutalistFocused : styles.inputWrapperDefaultFocused),
          !!error && styles.inputWrapperError,
        ]}
      >
        {icon && isBrutalist && (
          <MaterialIcons
            name={icon}
            size={20}
            color={isFocused ? colors.primaryContainer : colors.outlineVariant}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            isBrutalist && icon && { paddingLeft: 40 },
          ]}
          placeholderTextColor={colors.outlineVariant}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  labelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelIcon: {
    marginRight: 4,
  },
  label: {
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelFocused: {
    color: colors.primaryContainer,
  },
  labelBrutalist: {
    letterSpacing: 1.5,
  },
  inputWrapper: {
    backgroundColor: colors.surfaceContainerHigh,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapperDefault: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 8,
  },
  inputWrapperDefaultFocused: {
    borderColor: colors.primaryContainer,
  },
  inputWrapperBrutalist: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 0,
    position: 'relative',
  },
  inputWrapperBrutalistFocused: {
    borderColor: colors.primaryContainer,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    color: colors.textBody,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter',
  },
});
