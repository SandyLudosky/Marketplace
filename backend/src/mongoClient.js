// MongoClient
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.STRING_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const MongoDBClient = {
  initialize: (database, callback) => {
    client.connect(err => {
      // Connect Database
      if (err) throw err
      console.log('successfully connected to DB')
      const db = client.db(database)
      callback(db)
    })
  }
}
module.exports = MongoDBClient 