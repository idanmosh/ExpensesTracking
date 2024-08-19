import { StackScreenProps } from '@react-navigation/stack';
import { FC } from 'react';
import { ExpenseModalParams } from '../screens/ExpenseModal';
import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamList = {
  Welcome: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  ExpenseModal: ExpenseModalParams;
  FilterModal: undefined;
};

type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  BottomTabModal: undefined;
};

type NavigationType = NavigationProp<RootStackParamList>;

type Screens = RootStackParamList & BottomTabParamList;
type Screen<T extends keyof Screens> = FC<StackScreenProps<Screens, T>>;
