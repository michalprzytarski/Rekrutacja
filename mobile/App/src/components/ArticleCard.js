import React, {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';

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

export default function ArticleCard(props) {
  const imageUri = props.article.imageUrl;
  //   const imageColors = await ImageColors.getColors(imageUri, {
  //     fallback: '#646464',
  //     cashe: true,
  //     key: 'unique_key',
  //   });

  const [bgColor, setBgColor] = useState('#646464');

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
    }, 1000);
  }, []);

  return (
    <CardWrapper shadowColor={bgColor}>
      <CardImageBackground source={{uri: imageUri}}>
        <CardTitle>{props.article.title}</CardTitle>
      </CardImageBackground>
      <CardContentWrapper backgroundColor={bgColor}>
        <CardText>{props.article.summary}</CardText>
        <Separator />
        <CardDetails>
          <CardDetailsText>{props.article.newsSite}</CardDetailsText>
          <CardDetailsText>{props.article.publishedAt}</CardDetailsText>
        </CardDetails>
      </CardContentWrapper>
    </CardWrapper>
  );
}
