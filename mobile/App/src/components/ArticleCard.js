import dateFormat from 'dateformat';
import React, {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';
import {Pressable, View} from 'react-native';

import {
  CardWrapper,
  CardTitle,
  CardText,
  CardImageBackground,
  CardContentWrapper,
  Separator,
  CardDetails,
  CardDetailsText,
} from './styled';
import FavoriteStar from './FavoriteStar';

export default function ArticleCard(props) {
  const imageUri = props.article.imageUrl;
  const date = new Date(props.article.publishedAt);

  const [bgColor, setBgColor] = useState('black');

  useEffect(() => {
    let isMounted = true;
    ImageColors.getColors(imageUri, {
      fallback: '#646464',
      cashe: true,
      key: 'unique_key',
    })
      .then(data => {
        if (isMounted) setBgColor(data.vibrant);
      })
      .catch(err => {
        Alert.alert('ERROR', err.message);
        console.log(err.message);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Pressable
      onPress={() =>
        props.navigation.push('ArticleScreen', {
          articleId: props.article.id,
          articleColor: bgColor,
        })
      }>
      <CardWrapper shadowColor={bgColor}>
        <CardImageBackground source={{uri: imageUri}}>
          <View style={{alignItems: 'flex-end'}}>
            <FavoriteStar articleId={props.article.id} margin={15} />
          </View>
          <CardTitle>{props.article.title}</CardTitle>
        </CardImageBackground>
        <CardContentWrapper backgroundColor={bgColor}>
          {props.summary && (
            <>
              <CardText>{props.article.summary}</CardText>
              <Separator />
            </>
          )}
          <CardDetails>
            {props.summary && (
              <CardDetailsText>{props.article.newsSite}</CardDetailsText>
            )}
            <CardDetailsText>
              {dateFormat(date, 'DDDD, dd mmmm yyyy, H:MM')}
            </CardDetailsText>
          </CardDetails>
        </CardContentWrapper>
      </CardWrapper>
    </Pressable>
  );
}
