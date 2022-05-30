// @ts-check

const { MongoClient } = require('mongodb')

// const { MONGO_PASSWORD, MONGO_CLUSTER, MONGO_USER, MONGO_DBNAME } = process.env

const uri = `mongodb+srv://yun:gkswls3614@cluster0.uxmqg.mongodb.net/`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let didConnect = false

/**
 * @param {string} name
 */
async function getCollection(name) {
  if (!didConnect) {
    await client.connect()
    didConnect = true
  }
  return client.db().collection(name)
}

async function getUsersCollection() {
  return getCollection('users')
}

async function getPostsCollection() {
  return getCollection('posts')
}

module.exports = {
  getUsersCollection,
  getPostsCollection,
}
