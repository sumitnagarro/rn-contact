const Realm = require('realm');

export const insertData = async (schemaName, data) => {
  const realm = await Realm.open({
    schema: [schemaName],
  });

  realm.write(() => {
    realm.create(schemaName.name, data);
  });
};

export const deleteData = async (schemaName, id) => {
  const realm = await Realm.open({
    schema: [schemaName],
  });

  realm.write(() => {
    // Get the item by item id
    let item = realm.objects(schemaName.name).filtered(`id = "${id}"`);
    // Delete the item
    realm.delete(item);
  });
};

export const getItems = async (schemaName) => {
  const realm = await Realm.open({
    schema: [schemaName],
  });

  let items = realm.objects(schemaName.name);
  return items;
};

export const getFavoriteItems = async (schemaName) => {
  const realm = await Realm.open({
    schema: [schemaName],
  });

  let items = realm
    .objects(schemaName.name)
    .filtered('favorite=true SORT(name ASC)');

  return items;
};

export const getItem = async (schemaName, id) => {
  const realm = await Realm.open({
    schema: [schemaName],
  });

  let item = realm.objects(schemaName.name).filtered(`id = "${id}"`);
  return item;
};

export const updateData = async (schemaName, data) => {
  try {
    const realm = await Realm.open({
      schema: [schemaName],
    });
    //get db values using id
    var item = realm.objects(schemaName.name).filtered(`id = "${data.id}"`);
    if (item === null || item === undefined) {
      console.log('Item does not exists to update.');
      return;
    }
    realm.write(() => {
      //updating data
      realm.create(schemaName.name, data, 'modified');
    });
  } catch (error) {
    console.log('-------Error in repository update method.--------', error);
  }
};
