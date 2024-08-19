import React, { useState } from 'react';
import { Screen } from '../types/Navigation';
import BottomSheetModalContainer from '../components/BottomSheetModalContainer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import colors from '../constants/colors';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { resetFilters, updateFilters } from '../store/slices/mainSlice';

const FilterModal: Screen<'FilterModal'> = ({ navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.default.filters);
  const [title, setTitle] = useState<string>(filters.title);
  const [amount, setAmount] = useState<string>(filters.amount);
  const [date, setDate] = useState<string>(filters.date);

  const cleanFilters = () => {
    setTitle('');
    setAmount('');
    setDate('');
    dispatch(resetFilters());
  };

  const handleButtonPress = () => {
    dispatch(updateFilters({ title, amount, date }));
    goBack();
  };

  const LeftComponent = (
    <TouchableOpacity style={styles.cleanButton} onPress={cleanFilters}>
      <Text style={styles.cleanButtonText}>clean</Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalContainer
      style={styles.bottomSheet}
      title="Filters"
      onPressClose={goBack}
      LeftComponent={LeftComponent}>
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
          <Button text="Filter" onPress={handleButtonPress} />
        </View>
      </View>
    </BottomSheetModalContainer>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    height: '60%'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: ms(20)
  },
  separator: {
    height: ms(41)
  },
  container: {
    paddingHorizontal: ms(24),
    justifyContent: 'space-between',
    height: '85%'
  },
  cleanButton: {
    paddingTop: ms(12)
  },
  cleanButtonText: {
    fontFamily: 'Helvetica',
    fontSize: ms(16),
    lineHeight: ms(16),
    letterSpacing: 0.15,
    fontWeight: '400',
    color: colors.royalBlue
  }
});

export default FilterModal;
