import React, {useState, useEffect, useCallback, useContext} from 'react';
import ArticleList from '../components/ArticleList';
import SitesNavigationBar from '../components/SitesNavigationBar';
import {RefreshControl, Text, Alert} from 'react-native';
import {FavoritesContext} from '../context/FavoritesContext';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';

export default function ArticlesListScreen({route, navigation}) {
  const [articles, setArticles] = useState([]);
  const [siteNumber, setSiteNumber] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const perSite = 8;

  const {favorites, setFavorites} = useContext(FavoritesContext);

  const isFocused = useIsFocused();
  // useFocusEffect(
  //   useCallback(() => {
  //     setFavorites(favorites);
  //   }, [favorites]),
  //   console.log('POWROT'),
  // );

  function fetchArticles() {
    setTimeout(() => {
      fetch(
        `https://api.spaceflightnewsapi.net/v3/articles?_limit=${perSite}&_start=${
          perSite * siteNumber
        }`,
      )
        .then((res, rej) => {
          if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
          return res.json();
        })
        .then((data, rej) => {
          setArticles(data);
        })
        .catch(err => {
          Alert.alert('ERROR', err.message);
          console.log(err.message);
        })
        .finally((res, rej) => setRefreshing(false));
    }, 100);
  }

  useEffect(() => {
    fetchArticles();
  }, [siteNumber]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArticles();
    setRefreshing(false);
  }, [articles]);

  return (
    <>
      {/* <Text>{isFocused ? 'tak' : 'nie'}</Text> */}
      <ArticleList
        navigation={navigation}
        data={articles}
        summary={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <SitesNavigationBar
        siteNumber={siteNumber}
        setSiteNumber={setSiteNumber}
      />
    </>
  );
}
