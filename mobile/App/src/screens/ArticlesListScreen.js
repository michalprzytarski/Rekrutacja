import React, {useState, useEffect, useCallback} from 'react';
import ArticleList from '../components/ArticleList';
import SitesNavigationBar from '../components/SitesNavigationBar';
import {RefreshControl} from 'react-native';

export default function ArticlesListScreen({route, navigation}) {
  const [articles, setArticles] = useState([]);
  const [siteNumber, setSiteNumber] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const perSite = 8;

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
  }, []);

  return (
    <>
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
