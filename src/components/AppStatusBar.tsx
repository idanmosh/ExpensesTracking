import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ms } from 'react-native-size-matters';

const AppStatusBar = () => {
  const userName = useSelector((state: RootState) => state.default.userName);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{userName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ms(20)
  },
  text: {
    textAlign: 'center',
    lineHeight: 18.4,
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: '400',
    fontFamily: 'Helvetica'
  }
});

export default AppStatusBar;
