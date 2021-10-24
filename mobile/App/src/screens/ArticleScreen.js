import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  Linking,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  AriticleImage,
  ArticleDate,
  ArticleText,
  ArticleTitle,
  MyButton,
  MyButtonText,
  Separator,
} from '../components/styled';
import dateFormat from 'dateformat';
import ArticleList from '../components/ArticleList';

export default function ArticleScreen({route, navigation}) {
  const {articleId, articleColor} = route.params;

  const [article, setArticle] = useState(null);
  const [launches, setLaunches] = useState(null);
  const [date, setDate] = useState(null);

  // useLayoutEffect(() => {
  //   navigation.setOptions({statusBarBackgroundColor: articleColor});
  // }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: articleColor},
      headerTitleStyle: {color: 'white'},
      headerTintColor: 'white',
    });
    fetchArticle();
  }, []);

  function fetchArticle() {
    setTimeout(() => {
      fetch(`https://api.spaceflightnewsapi.net/v3/articles/${articleId}`)
        .then(res => {
          if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
          return res.json();
        })
        .then(data => {
          setArticle(data);
          setDate(new Date(data.publishedAt));
          console.log(data.launches.length, data.launches);
          if (data.launches.length > 0) fetchLaunches(data.launches);
        })
        .catch(err => {
          Alert.alert('ERROR', err.message);
          console.log(err.message);
        });
    }, 1000);
  }

  function fetchLaunches(data) {
    data.map(launch =>
      setTimeout(() => {
        fetch(
          `https://api.spaceflightnewsapi.net/v3/articles/launch/${launch.id}`,
        )
          .then(res => {
            if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
            return res.json();
          })
          .then(data => {
            setLaunches(data);
            console.log(data);
          })
          .catch(err => {
            Alert.alert('ERROR', err.message);
            console.log(err.message);
          });
      }, 1000),
    );
  }

  function handleOpenInBrowser() {
    Linking.canOpenURL(article.url).then(supported => {
      if (supported) {
        Linking.openURL(article.url);
      } else {
        Alert.alert('ERROR', "Don't know how to open URI: " + article.url);
        console.log("Don't know how to open URI: " + article.url);
      }
    });
  }

  return (
    article && (
      <>
        <ScrollView>
          <AriticleImage source={{uri: article.imageUrl}} />
          <ArticleDate>{dateFormat(date, 'dd mmmm yyyy, H:MM')}</ArticleDate>
          <ArticleTitle color={articleColor}>{article.title}</ArticleTitle>
          <Separator color={articleColor} />
          <ArticleText>{article.summary}</ArticleText>
          <ArticleText color={articleColor}>
            Article from : {article.newsSite}
          </ArticleText>
          <MyButton onPress={handleOpenInBrowser} color={articleColor}>
            <MyButtonText>Read whole article in the browser</MyButtonText>
          </MyButton>
          {launches && (
            <>
              <ArticleText>More launch related articles:</ArticleText>
              <ArticleList
                data={launches.slice(0, 4)}
                navigation={navigation}
                horizontal={true}
              />
            </>
          )}
        </ScrollView>
      </>
    )
  );
}
