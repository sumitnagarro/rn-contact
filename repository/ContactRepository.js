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

export const getItem = async (schemaName, id) => {
  const realm = await Realm.open({
    schema: [schemaName],
  });

  let item = realm.objects(schemaName.name).filtered(`id = "${id}"`);
  return item;
};
