import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import ArticleScreen from '../screens/ArticleScreen';
import FavoriteArticlesScreen from '../screens/FavoriteArticlesScreen';

export default function FavoriteArticlesStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteArticles"
        component={FavoriteArticlesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
