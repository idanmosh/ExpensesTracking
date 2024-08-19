import React, { FC, memo, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { addCommasToNumber, getPrefixSuffixFromNumber } from '../utils';
import { ANDROID_LINE_HEIGHT_MULTIPLY } from '../constants';

interface ExpenseSectionItemProps {
  expense: Expense;
  onPress: () => void;
}

const ExpenseSectionItem: FC<ExpenseSectionItemProps> = ({ expense, onPress }) => {
  const [prefix, suffix] = useMemo(
    () => getPrefixSuffixFromNumber(parseFloat(expense.amount)),
    [expense.amount]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{expense.title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.suffix}>$</Text>
        <Text style={styles.prefix}>{`${addCommasToNumber(Number(prefix))}.`}</Text>
        <Text style={styles.suffix}>{`${suffix}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowOpacity: 0.12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    paddingVertical: ms(23),
    paddingHorizontal: ms(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleContainer: {
    flexShrink: 1
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: ms(16),
    fontWeight: '400',
    lineHeight: ms(16),
    color: colors.charcoalGray
  },
  row: {
    flexDirection: 'row'
  },
  prefix: {
    fontFamily: 'Helvetica',
    fontSize: ms(18),
    fontWeight: '400',
    letterSpacing: 0.1,
    lineHeight: Platform.select({
      android: ms(23 * ANDROID_LINE_HEIGHT_MULTIPLY)
    })
  },
  suffix: {
    fontFamily: 'Helvetica',
    fontSize: ms(14),
    fontWeight: '400',
    letterSpacing: 0.1,
    lineHeight: Platform.select({
      ios: ms(23),
      android: ms(24 * ANDROID_LINE_HEIGHT_MULTIPLY)
    })
  }
});

export default memo(ExpenseSectionItem, isEqual);
