import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import colors from '../constants/colors';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { setUserName } from '../store/slices/mainSlice';
import { Screen } from '../types/Navigation';

const Welcome: Screen<'Welcome'> = ({ navigation: { replace } }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');

  const handleSubmit = useCallback(() => {
    dispatch(setUserName(name));
    replace('BottomTabs');
  }, [dispatch, name, replace]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={colors.cadetBlueCrayola}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.inputName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit} text="Submit" disabled={!name.length} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: ms(60)
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: ms(70)
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  inputName: {
    height: ms(55),
    borderRadius: 3,
    borderWidth: 1,
    padding: ms(10),
    backgroundColor: colors.white,
    borderColor: colors.purpleBlue,
    color: colors.black
  }
});

export default Welcome;
