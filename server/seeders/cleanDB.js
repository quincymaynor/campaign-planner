const db = require('../config/connection'); // Import the new db module

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};





