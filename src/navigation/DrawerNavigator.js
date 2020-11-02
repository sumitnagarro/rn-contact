import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

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
