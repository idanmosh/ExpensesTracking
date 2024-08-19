import React, { FC, memo } from 'react';
import isEqual from 'lodash/isEqual';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { ms } from 'react-native-size-matters';

interface ExpenseSectionHeaderProps {
  date: string;
}

const ExpenseSectionHeader: FC<ExpenseSectionHeaderProps> = ({ date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lavenderBlush,
    paddingVertical: ms(5.5),
    paddingHorizontal: ms(16)
  },
  text: {}
});

export default memo(ExpenseSectionHeader, isEqual);
