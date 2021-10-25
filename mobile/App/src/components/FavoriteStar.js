import React, {useState, useContext, useEffect} from 'react';
import {Pressable} from 'react-native';
import {FavoritesContext} from '../context/FavoritesContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteFavorites, insertFavorites} from '../database/schemas';

export default function FavoriteStar(props) {
  const {favorites, setFavorites} = useContext(FavoritesContext);

  const [checked, setChecked] = useState(false);

  function handlePress() {
    if (checked) {
      setFavorites(
        favorites.filter(favorite => favorite.id !== props.articleId),
      );
      deleteFavorites(props.articleId).catch(err => console.error(err));
    } else {
      setFavorites(favorites => [...favorites, {id: props.articleId}]);
      insertFavorites({id: props.articleId}).catch(err => console.error(err));
    }
    setChecked(!checked);
  }

  useEffect(() => {
    setChecked(favorites.some(favorite => favorite.id === props.articleId));
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
