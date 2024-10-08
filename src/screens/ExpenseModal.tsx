import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheetModalContainer from '../components/BottomSheetModalContainer';
import TextInput from '../components/TextInput';
import { ms } from 'react-native-size-matters';
import Button from '../components/Button';
import { Screen } from '../types/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../store/slices/mainSlice';
import { generateRandomId } from '../utils';
import { RootState } from '../store';
import colors from '../constants/colors';

export interface ExpenseModalParams {
  title: string;
  action: 'Create' | 'Save';
  id?: string;
}

const ExpenseModal: Screen<'ExpenseModal'> = ({ navigation: { goBack }, route: { params } }) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.default.expenses);
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    if (params?.id && params.action === 'Save') {
      const expense = expenses.find((exp) => exp.id === params.id);
      if (expense) {
        setTitle(expense.title);
        setAmount(expense.amount);
        setDate(expense.date);
      }
    }
  }, [params.id, params.action, expenses]);

  const buttonDisabled = !title || !amount || !date;

  const handleButtonPress = () => {
    if (params.action === 'Create') {
      dispatch(addExpense({ title, amount, date, id: generateRandomId() }));
    } else if (params.action === 'Save' && params.id) {
      dispatch(updateExpense({ title, amount, date, id: params.id }));
    }
    goBack();
  };

  const removeExpenseItem = () => {
    dispatch(removeExpense(params.id as string));
    goBack();
  };

  const LeftComponent = (
    <TouchableOpacity style={styles.deleteButton} onPress={removeExpenseItem}>
      <Text style={styles.deleteButtonText}>delete</Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalContainer
      style={styles.bottomSheet}
      title={params.title}
      onPressClose={goBack}
      LeftComponent={params.action === 'Save' && LeftComponent}>
      <View style={styles.container}>
        <View>
          <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
          <View style={styles.separator} />
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <View style={styles.separator} />
          <TextInput
            placeholder="Date"
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={params.action} onPress={handleButtonPress} disabled={buttonDisabled} />
        </View>
      </View>
    </BottomSheetModalContainer>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    height: '85%'
  },
  container: {
    paddingHorizontal: ms(32),
    justifyContent: 'space-between',
    height: '90%'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: ms(20)
  },
  separator: {
    height: ms(27)
  },
  deleteButton: {
    paddingTop: ms(12)
  },
  deleteButtonText: {
    fontFamily: 'Helvetica',
    fontSize: ms(16),
    lineHeight: ms(16),
    letterSpacing: 0.15,
    fontWeight: '400',
    color: colors.royalBlue
  }
});

export default ExpenseModal;
