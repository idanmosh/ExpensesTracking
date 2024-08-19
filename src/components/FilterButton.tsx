import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ms } from 'react-native-size-matters';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import colors from '../constants/colors';

const FilterButton: FC<TouchableOpacityProps> = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity {...props} style={styles.container} onPress={onPress}>
      <FontAwesome6 name="sliders" size={ms(20)} color={colors.black} style={styles.icon} />
      <Text style={styles.text}>Filters</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    width: ms(94),
    justifyContent: 'center',
    paddingVertical: ms(7),
    paddingHorizontal: ms(13),
    borderRadius: 60
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: ms(12),
    fontWeight: '700',
    lineHeight: ms(13.8)
  },
  icon: {
    paddingEnd: ms(11)
  }
});

export default FilterButton;
