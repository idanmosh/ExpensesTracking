import React, { useMemo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { addCommasToNumber, getPrefixSuffixFromNumber } from '../utils';
import FilterButton from './FilterButton';
import useAppNavigation from '../hooks/useAppNavigation';
import { ANDROID_LINE_HEIGHT_MULTIPLY } from '../constants';

const HomeHeader = () => {
  const { navigate } = useAppNavigation();
  const expenses = useSelector((state: RootState) => state.default.expenses);

  const [prefix, suffix] = useMemo(() => {
    const total = expenses.reduce<number>((acc, expense) => acc + parseFloat(expense.amount), 0);
    return getPrefixSuffixFromNumber(total);
  }, [expenses]);

  const handleFilterPress = () => navigate('FilterModal');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.totalExpenses}>Total Expenses:</Text>
        <Text style={styles.totalExpensesSuffix}>$</Text>
        <Text style={styles.totalExpensesPrefix}>{`${addCommasToNumber(Number(prefix))}.`}</Text>
        <Text style={styles.totalExpensesSuffix}>{`${suffix}`}</Text>
      </View>
      <View style={styles.filterContainer}>
        <FilterButton onPress={handleFilterPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: ms(35)
  },
  container: {
    backgroundColor: colors.white,
    paddingTop: ms(24),
    paddingBottom: ms(11),
    paddingStart: ms(14),
    paddingEnd: ms(11)
  },
  totalExpenses: {
    fontFamily: 'Helvetica',
    fontSize: ms(16),
    fontWeight: '700',
    lineHeight: Platform.select({
      ios: ms(25),
      android: ms(25 * ANDROID_LINE_HEIGHT_MULTIPLY)
    }),
    paddingEnd: ms(9)
  },
  totalExpensesSuffix: {
    fontFamily: 'Helvetica',
    fontSize: ms(18),
    fontWeight: '400',
    lineHeight: Platform.select({
      ios: ms(27),
      android: ms(28 * ANDROID_LINE_HEIGHT_MULTIPLY)
    })
  },
  totalExpensesPrefix: {
    fontFamily: 'Helvetica',
    fontSize: ms(22),
    fontWeight: '400',
    lineHeight: Platform.select({
      android: ms(28 * ANDROID_LINE_HEIGHT_MULTIPLY)
    })
  },
  filterContainer: {
    alignItems: 'flex-end'
  }
});
export default HomeHeader;
