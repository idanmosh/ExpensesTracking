import React, { useCallback, useMemo } from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  View
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import colors from '../constants/colors';
import HomeHeader from '../components/HomeHeader';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { filterExpenses, groupExpensesByDate } from '../utils';
import ExpenseSectionHeader from '../components/ExpenseSectionHeader';
import ExpenseSectionItem from '../components/ExpenseSectionItem';
import { Screen } from '../types/Navigation';

interface Section {
  title: string;
  data: Expense[];
}

type SectionHeader = (info: { section: SectionListData<Expense, Section> }) => React.ReactElement;

const ITEM_HEIGHT = 60;

const Home: Screen<'Home'> = ({ navigation: { navigate } }) => {
  const expenses = useSelector((state: RootState) => state.default.expenses);
  const filters = useSelector((state: RootState) => state.default.filters);

  const sections = useMemo(() => {
    const filteredExpenses = filterExpenses([...expenses], filters);
    return groupExpensesByDate(filteredExpenses);
  }, [expenses, filters]);

  const keyExtractor = useCallback((item: Expense) => item.id, []);

  const handleItemPress = useCallback(
    (id: string) => () => {
      navigate('ExpenseModal', { action: 'Save', title: 'Edit Expense', id: id });
    },
    [navigate]
  );

  const renderSectionHeader: SectionHeader = useCallback(
    ({ section: { title } }) => <ExpenseSectionHeader date={title} />,
    []
  );

  const renderItem: SectionListRenderItem<Expense, Section> = useCallback(
    ({ item }) => <ExpenseSectionItem expense={item} onPress={handleItemPress(item.id)} />,
    [handleItemPress]
  );

  const ItemSeparatorComponent = useMemo(() => () => <View style={styles.separator} />, []);

  const getItemLayout = useCallback(
    (data: SectionListData<Expense, Section>[] | null, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    }),
    []
  );

  return (
    <>
      <AppStatusBar />
      <View style={styles.container}>
        <HomeHeader />
        <SectionList
          sections={sections}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderSectionHeader={renderSectionHeader}
          getItemLayout={getItemLayout}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  separator: {
    height: 1,
    backgroundColor: colors.black
  }
});

export default Home;
