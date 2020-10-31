import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Contacts from '../components/Contacts';
import FavoriteContacts from '../components/FavoriteContacts';
import ContactDetail from '../components/ContactDetail';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#FF6600',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="FavoriteContacts" component={FavoriteContacts} />
      <Stack.Screen name="Detail" component={ContactDetail} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Favorite Contact" component={FavoriteContacts} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, ContactStackNavigator};
