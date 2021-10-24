import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import colors from '../constants/colors';
import ArticlesListStackNavigator from './ArticlesListStackNavigator';
import FavoriteArticlesStackNavigator from './FavoriteArticlesStackNavigator';

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
          options={{
            title: 'All articles',
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoriteArticlesStackNavigator}
          options={{
            title: 'Favorites',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
