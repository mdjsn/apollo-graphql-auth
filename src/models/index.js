import { MongoClient } from 'mongodb'

const obj = {
  db: {
    url: 'mongodb://localhost/graphqldb',
    name: 'graphqldb',
    collection: 'users'
  }
};

obj.connect = async () => {
  const mongoClient = new MongoClient(obj.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
  return new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
      if (err) reject(err);
      const db = client.db(obj.db.name);
      const collection = db.collection(obj.db.collection);
      resolve({ client, db, collection });
    });
  });
};

obj.create = async (args) => {
  const db = await obj.connect();
  const id = await obj.getNewId(db.collection);
  await db.collection.insertOne({id,...args});
  const res = await db.collection.findOne({email: args.email});
  db.client.close();
  return res;
};

obj.findOne = async (args) => {
  const db = await obj.connect();
  let res = await db.collection.findOne(args);
  db.client.close();
  return res;
};

module.exports = obj;