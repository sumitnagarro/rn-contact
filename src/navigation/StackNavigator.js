import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Contacts from '../components/Contacts';
import FavoriteContacts from '../components/FavoriteContacts';
import ContactDetail from '../components/ContactDetail';
import {Button} from 'react-native';

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
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          title: 'Contacts',
        }}
      />
      <Stack.Screen
        name="FavoriteContacts"
        component={FavoriteContacts}
        options={{
          title: 'Favorite contacts',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={ContactDetail}
        options={{
          title: 'Add/Update contact',
          // headerRight: () => (
          //   <Button
          //     title="set fav"
          //     onPress={() => {
          //       console.warn('Fav button tapped.');
          //     }}></Button>
          // ),
        }}
      />
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
