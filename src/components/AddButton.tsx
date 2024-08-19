import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import { ms } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';

const AddButton = () => {
  return (
    <View style={styles.container}>
      <Entypo name="plus" size={ms(32)} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.royalBlue,
    width: ms(56),
    height: ms(53.5),
    borderRadius: 34,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    marginBottom: ms(20)
  }
});

export default AddButton;
