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

obj.getNewId = async (collection) => {
  let lastItem = await collection.find()
    .sort({ $natural: -1 })
    .limit(1)
    .toArray();
  let id = (lastItem[0] && lastItem[0].id !== undefined) ? lastItem[0].id + 1 : 0;
  return id;
};

obj.create = async (args) => {
  const db = await obj.connect();
  console.log(db)
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