/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types/types';
import LinkingConfiguration from './LinkingConfiguration';
import List from '../screens/List';
import Login from '../screens/Login';
import Detail from '../screens/Detail';
import User from '../screens/User';
import {navigationRef} from '../RootNavigation';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
    </Stack.Navigator>
  );
}
