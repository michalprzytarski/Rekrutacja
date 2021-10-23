import {NavigationContainer} from '@react-navigation/native';
import React, {
  useState,
  useEffect,
  useCallback,
  Alert,
  isValidElement,
} from 'react';
import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import ArticleCard from './ArticleCard';

export default function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);

  function fetchArticles() {
    setTimeout(() => {
      fetch('https://api.spaceflightnewsapi.net/v3/articles')
        .then(res => {
          if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
          return res.json();
        })
        .then(data => {
          setArticles(data);
        })
        .catch(err => {
          Alert.alert('ERROR', err.message);
          console.log(err.message);
        })
        .finally(setIsRefreshing(false));
    }, 1000);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <FlatList
      data={articles}
      //   refreshControl={
      //     <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      //   }
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ArticleScreen')}>
          <ArticleCard article={item} />
        </TouchableOpacity>
      )}
    />
  );
}
