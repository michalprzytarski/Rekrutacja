import React, {useState, useEffect, useCallback, Alert} from 'react';
import {FlatList, RefreshControl, TextPropTypes} from 'react-native';
import ArticleCard from './ArticleCard';

export default function ArticleList(props) {
  return (
    <FlatList
      horizontal={props.horizontal}
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
