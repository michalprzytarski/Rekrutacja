import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {FavoritesContext} from './src/context/FavoritesContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} hidden />
      <FavoritesContext.Provider value={{favorites, setFavorites}}>
        <MainTabNavigator />
      </FavoritesContext.Provider>
    </SafeAreaView>
  );
}
