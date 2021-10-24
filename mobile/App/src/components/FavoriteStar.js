import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {FavoritesContext} from '../context/FavoritesContext';

export default function FavoriteStar(props) {
  const {favorites, setFavorites} = useContext(FavoritesContext);

  const [checked, setChecked] = useState(favorites.includes(props.articleId));

  function handlePress() {
    if (checked) {
      setFavorites(favorites.filter(id => id != props.articleId));
    } else {
      setFavorites(favorites => [...favorites, props.articleId]);
    }
    setChecked(!checked);
  }

  useEffect(() => {
    setChecked(favorites.includes(props.articleId));
  }, [favorites]);

  return (
    <Pressable onPress={handlePress}>
      <Text style={{backgroundColor: checked ? 'green' : 'red'}}>STAR</Text>
    </Pressable>
  );
}
