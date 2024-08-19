import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import { signOut } from '../store/slices/mainSlice';
import { Screen } from '../types/Navigation';

const Profile: Screen<'Profile'> = ({ navigation: { replace } }) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.default.expenses);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
    replace('Welcome');
  }, [dispatch, replace]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.row}>
          <Text style={styles.text}>Total Expenses Items</Text>
          <Text style={styles.text}>{expenses.length}</Text>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity onPress={handleSignOut}>
          <View style={[styles.row, { marginTop: ms(36) }]}>
            <Text style={styles.text}>Sign out</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.snowWhite,
    paddingHorizontal: ms(20),
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ms(12)
  },
  container: {
    flex: 1,
    backgroundColor: colors.snowWhite
  },
  text: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: ms(18),
    lineHeight: 20,
    letterSpacing: 0.15
  },
  separator: {
    height: ms(1),
    backgroundColor: colors.gainsboro
  }
});

export default Profile;
