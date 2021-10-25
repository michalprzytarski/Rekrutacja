import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ArticleList from '../components/ArticleList';
import {FavoritesContext} from '../context/FavoritesContext';
import TextInfoScreen from './TextInfoScreen';

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
          .then(data => data.json())
          .catch(err => {
            Alert.alert('ERROR', err.message);
            console.error(err.message);
          }),
      ),
    ).then(data => setArticles(data));
  }

  useEffect(() => {
    updateArticles();
  }, [favorites]);

  return (
    <>
      {favorites.length === 0 && (
        <TextInfoScreen text="You need to add something here..." />
      )}
      {favorites.length !== 0 && (
        <ArticleList navigation={navigation} data={articles} summary={true} />
      )}
    </>
  );
}
