import React, {useState, useEffect, useCallback} from 'react';
import ArticleList from '../components/ArticleList';
import SitesNavigationBar from '../components/SitesNavigationBar';
import {RefreshControl, Text, Alert} from 'react-native';
import TextInfoScreen from './TextInfoScreen';

export default function ArticlesListScreen({route, navigation}) {
  const [articles, setArticles] = useState([]);
  const [siteNumber, setSiteNumber] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const perSite = 8;

  function fetchArticles() {
    setRefreshing(true);
    fetch(
      `https://api.spaceflightnewsapi.net/v3/articles?_limit=${perSite}&_start=${
        perSite * siteNumber
      }`,
    )
      .then(res => {
        if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
        return res.json();
      })
      .then(data => setArticles(data))
      .catch(err => {
        Alert.alert('ERROR', err.message);
        console.log(err.message);
      })
      .finally(() => setRefreshing(false));
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
      {refreshing && <TextInfoScreen text="loading..." />}
      {!refreshing && (
        <ArticleList
          navigation={navigation}
          data={articles}
          summary={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <SitesNavigationBar
        siteNumber={siteNumber}
        setSiteNumber={setSiteNumber}
      />
    </>
  );
}
