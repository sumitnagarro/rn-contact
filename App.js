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

import {Container, Content, Header, Left, Body, Icon} from 'native-base';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Text>Hello</Text>
        <RealmDemo />
      </Provider>
    </>
  );
};

export default App;
