import React, {useState, useContext, useEffect} from 'react';
import {Pressable} from 'react-native';
import {FavoritesContext} from '../context/FavoritesContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    <Pressable
      onPress={handlePress}
      style={{marginTop: props.margin, marginRight: props.margin}}>
      <Icon
        name="grade"
        size={30}
        color={checked ? 'gold' : 'grey'}
        style={{
          textShadowOffset: {width: 0, height: 0},
          textShadowRadius: 2,
          textShadowColor: checked ? 'white' : 'black',
        }}
      />
    </Pressable>
  );
}
