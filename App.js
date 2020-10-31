/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text} from 'react-native';
import RealmDemo from './src/views/RealmView';

import {Provider} from 'react-redux';
import store from './src/stores/store';

import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './src/navigation/StackNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
          {/* <MainStackNavigator /> */}
          {/* <Contacts />
          <Text>Hello</Text> */}
          {/* <RealmDemo /> */}
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
