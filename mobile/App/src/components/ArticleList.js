import React from 'react';
import {FlatList} from 'react-native';
import ArticleCard from './ArticleCard';

export default function ArticleList(props) {
  return (
    <FlatList
      horizontal={props.horizontal}
      refreshControl={props.refreshControl}
      data={props.data}
      renderItem={({item}) => (
        <ArticleCard
          article={item}
          navigation={props.navigation}
          summary={props.summary}
        />
      )}
    />
  );
}
