import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  //const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#36393f'}}>
      <StatusBar barStyle={'light-content'} />
      <MainTabNavigator />
    </SafeAreaView>
  );
}
