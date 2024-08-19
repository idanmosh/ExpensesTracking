import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Welcome from '../screens/Welcome';
import BottomTabs from './BottomTabs';
import { mvs } from 'react-native-size-matters';
import { RootStackParamList } from '../types/Navigation';
import ExpenseModal from '../screens/ExpenseModal';
import FilterModal from '../screens/FilterModal';

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
  headerStyle: {
    height: mvs(60)
  }
};

const MainStack = () => {
  const userName = useSelector((state: RootState) => state.default.userName);

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={userName ? 'BottomTabs' : 'Welcome'}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
          ...TransitionPresets.ModalPresentationIOS
        }}>
        <Stack.Screen
          name="ExpenseModal"
          component={ExpenseModal}
          initialParams={{ title: 'Create Expense', action: 'Create' }}
        />
        <Stack.Screen name="FilterModal" component={FilterModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
