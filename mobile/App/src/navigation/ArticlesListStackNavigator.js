import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticleScreen from '../screens/ArticleScreen';
import ArticlesListScreen from '../screens/ArticlesListScreen';

export default function ArticlesListStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={ArticlesListScreen}
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
