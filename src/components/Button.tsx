import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../constants/colors';
import { ms } from 'react-native-size-matters';

interface ButtonProps extends TouchableOpacityProps {
  text?: string;
}

const Button: FC<ButtonProps> = ({ text, style, disabled, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purpleBlue,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(49),
    width: ms(148)
  },
  text: {
    color: colors.white,
    fontFamily: 'Helvetica',
    fontSize: ms(16),
    lineHeight: ms(18.4),
    fontWeight: '700'
  },
  disabled: {
    opacity: 0.5
  }
});

export default Button;
