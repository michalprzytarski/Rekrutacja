import React, {useState, useEffect} from 'react';
import {Alert, Linking, ScrollView} from 'react-native';
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
import FavoriteStar from '../components/FavoriteStar';

export default function ArticleScreen({route, navigation}) {
  const {articleId, articleColor} = route.params;

  const [article, setArticle] = useState(null);
  const [launches, setLaunches] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    setHeaderStyle();
    fetchArticle();
  }, []);

  function setHeaderStyle() {
    navigation.setOptions({
      headerStyle: {backgroundColor: articleColor},
      headerTitleStyle: {color: 'white'},
      headerTintColor: 'white',
    });
  }

  function fetchArticle() {
    fetch(`https://api.spaceflightnewsapi.net/v3/articles/${articleId}`)
      .then(res => {
        if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setDate(new Date(data.publishedAt));
        navigation.setOptions({
          headerRight: () => <FavoriteStar articleId={data.id} />,
        });
        return data.launches;
      })
      .then(launches => fetchLaunches(launches))
      .catch(err => {
        Alert.alert('ERROR', err.message);
        console.error(err.message);
      });
  }

  function fetchLaunches(launches) {
    launches.map(launch =>
      fetch(
        `https://api.spaceflightnewsapi.net/v3/articles/launch/${launch.id}`,
      )
        .then(res => {
          if (!res.ok) throw Error(`Couldn't fetch data from that source!`);
          return res.json();
        })
        .then(data => setLaunches(data))
        .catch(err => {
          Alert.alert('ERROR', err.message);
          console.error(err.message);
        }),
    );
  }

  function handleOpenInBrowser() {
    Linking.canOpenURL(article.url).then(supported => {
      if (supported) {
        Linking.openURL(article.url);
      } else {
        Alert.alert('ERROR', "Don't know how to open URI: " + article.url);
        console.error("Don't know how to open URI: " + article.url);
      }
    });
  }

  return (
    article && (
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
              data={launches.slice(0, 8)}
              navigation={navigation}
              horizontal={true}
            />
          </>
        )}
      </ScrollView>
    )
  );
}
