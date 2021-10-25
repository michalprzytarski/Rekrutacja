import Realm from 'realm';

export const FAVORITES_SCHEMA = 'Favorites';

export const FavoritesSchema = {
  name: FAVORITES_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
  },
};

const databaseOptions = {
  path: 'favorites.realm',
  schema: [FavoritesSchema],
};

export const insertFavorites = newFavorite =>
  new Promise((res, rej) => {
    Realm.open(databaseOptions)
      .then(realm =>
        realm.write(() => {
          realm.create(FAVORITES_SCHEMA, newFavorite);
          res(newFavorite);
        }),
      )
      .catch(err => rej(err));
  });

export const deleteFavorites = favoriteId =>
  new Promise((res, rej) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingFavorite = realm.objectForPrimaryKey(
            FAVORITES_SCHEMA,
            favoriteId,
          );
          realm.delete(deletingFavorite);
          res();
        });
      })
      .catch(err => rej(err));
  });

export const deleteAllFavorites = () =>
  new Promise((res, rej) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allFavorites = realm.objects(FAVORITES_SCHEMA);
          realm.delete(allFavorites);
          res();
        });
      })
      .catch(err => rej(err));
  });

export const selectAllFavorites = () =>
  new Promise((res, rej) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allFavorites = realm.objects(FAVORITES_SCHEMA);
        res(allFavorites);
      })
      .catch(err => rej(err));
  });
