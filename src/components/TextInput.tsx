import React, { FC } from 'react';
import { StyleSheet, Text, TextInputProps, TextInput as RNTextInput } from 'react-native';
import { ms } from 'react-native-size-matters';
import colors from '../constants/colors';

const TextInput: FC<TextInputProps> = ({ placeholder, value, ...props }) => {
  return (
    <>
      {!!value && <Text style={styles.title}>{placeholder}</Text>}
      <RNTextInput
        {...props}
        value={value}
        placeholder={placeholder}
        style={styles.texInput}
        placeholderTextColor={colors.darkGray}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: ms(8),
    color: colors.dimGray
  },
  texInput: {
    borderBottomWidth: 1,
    paddingBottom: ms(8),
    borderBottomColor: colors.silver,
    color: colors.black
  }
});

export default TextInput;
