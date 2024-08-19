import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import { Platform, StyleSheet } from 'react-native';
import Profile from '../screens/Profile';
import { ms } from 'react-native-size-matters';
import AddButton from '../components/AddButton';
import { BottomTabParamList } from '../types/Navigation';
import ExpenseModal from '../screens/ExpenseModal';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: () => null,
        tabBarStyle: styles.tabBar
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="BottomTabModal"
        component={ExpenseModal}
        options={{ title: '', tabBarIcon: AddButton }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('ExpenseModal');
          }
        })}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    lineHeight: 14.95,
    letterSpacing: 0.15,
    fontSize: 13
  },
  tabBar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.select({ ios: ms(87), android: ms(62) }),
    paddingBottom: Platform.select({ ios: ms(45), android: ms(24) })
  }
});

export default BottomTabs;
