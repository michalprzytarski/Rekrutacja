import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import colors from '../constants/colors';
import ArticlesListScreen from '../screens/ArticlesListScreen';
import ArticlesListStackNavigator from './ArticlesListStackNavigator';

export default function MainTabNavigator(props) {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.tint,
          headerShown: false,
        }}>
        <Tab.Screen
          name="ArticlesList"
          component={ArticlesListStackNavigator}
        />
        <Tab.Screen name="Favorites" component={ArticlesListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
