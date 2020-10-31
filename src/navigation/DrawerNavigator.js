import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import Contacts from '../components/Contacts';
import FavoriteContacts from '../components/FavoriteContacts';
import {MainStackNavigator, ContactStackNavigator} from './StackNavigator';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Contact" component={MainStackNavigator} />
      <Drawer.Screen
        name="Favorite Contact"
        component={ContactStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
