import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import colors from '../constants/colors';
import ArticlesListStackNavigator from './ArticlesListStackNavigator';
import FavoriteArticlesStackNavigator from './FavoriteArticlesStackNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MainTabNavigator(props) {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.tint,
          headerShown: false,
        }}
        tabBarHideOnKeyboard={true}>
        <Tab.Screen
          name="ArticlesList"
          component={ArticlesListStackNavigator}
          options={{
            title: 'All articles',
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoriteArticlesStackNavigator}
          options={{
            title: 'Favorites',
            tabBarIcon: ({color}) => (
              <Icon name="star" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
