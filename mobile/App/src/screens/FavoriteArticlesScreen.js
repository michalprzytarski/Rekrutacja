import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import ArticleList from '../components/ArticleList';
import {FavoritesContext} from '../context/FavoritesContext';

export default function FavoriteArticlesScreen({navigation}) {
  const {favorites, setFavorites} = useContext(FavoritesContext);
  const [articles, setArticles] = useState([]);

  function updateArticles() {
    Promise.all(
      favorites.map(favorite =>
        fetch(`https://api.spaceflightnewsapi.net/v3/articles/${favorite.id}`)
          .then(res => {
            if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
            return res;
          })
          .then(data => {
            return data.json();
          })
          .catch(err => {
            Alert.alert('ERROR', err.message);
            console.error(err.message);
          }),
      ),
    ).then(data => {
      setArticles(data);
    });
  }

  useEffect(() => {
    updateArticles();
  }, [favorites]);

  return (
    <View>
      <ArticleList navigation={navigation} data={articles} summary={true} />
      {favorites.length === 0 && (
        <Text>Najpierw dodaj artykuły do ulubionych</Text>
      )}
    </View>
  );
}
