const routes = require('express').Router();
const { MongoClient } = require('mongodb');
let client;

routes.get('/api', (req, res) => {

  const uri = "mongodb+srv://admin:admin@lak.yacf5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(async err => {
    await createAccount("testUsername2", "testPin");
  });
  res.status(200).json({ message: 'Connected!' });
});

async function createAccount(un, pw) {
  const users = client.db("LAK").collection("users");
  return await users.insertOne({
    username: un,
    password: pw
  });
}

module.exports = routes;