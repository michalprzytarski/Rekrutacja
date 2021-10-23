import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ArticleScreen from '../screens/ArticleScreen';
import ArticlesListScreen from '../screens/ArticlesListScreen';

export default function ArticlesListStackNavigator() {
  let Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Articles" component={ArticlesListScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
    </Stack.Navigator>
  );
}
