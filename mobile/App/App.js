import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {FavoritesContext} from './src/context/FavoritesContext';
import {selectAllFavorites} from './src/database/schemas';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  const [favorites, setFavorites] = useState([]);

  function loadDataFromRealm() {
    selectAllFavorites()
      .then(favoritesList => {
        setFavorites(favoritesList);
        return favoritesList;
      })
      .catch(err => {
        console.error(err.message);
        setFavorites([]);
      });
  }

  useEffect(() => {
    loadDataFromRealm();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} hidden />
      <FavoritesContext.Provider value={{favorites, setFavorites}}>
        <MainTabNavigator />
      </FavoritesContext.Provider>
    </SafeAreaView>
  );
}
