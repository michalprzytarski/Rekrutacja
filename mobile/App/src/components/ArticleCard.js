import dateFormat from 'dateformat';
import React, {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';
import {TouchableOpacity, Pressable} from 'react-native';

import {
  CardWrapper,
  CardTitle,
  CardText,
  CardImage,
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

  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      ImageColors.getColors(imageUri, {
        fallback: '#646464',
        cashe: true,
        key: 'unique_key',
      })
        .then(data => {
          setBgColor(data.vibrant);
        })
        .catch(err => {
          Alert.alert('ERROR', err.message);
          console.log(err.message);
        });
    }, 100);
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
          <FavoriteStar articleId={props.article.id} />
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
