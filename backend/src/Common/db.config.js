// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config();

// // Details from the env
// const mongoUsername = process.env.mongoUsername;
// const mongoPassword = process.env.mongoPassword;

// console.log("mongoo",mongoUsername, mongoPassword);



// // Connection string
// const connectionString = `mongodb+srv://${mongoUsername}:${mongoPassword}@blogoshub.ltkqqlf.mongodb.net/?retryWrites=true&w=majority&appName=BlogosHub`;



// const options = {
//     autoIndex: false,
//     maxPoolSize: 10,
//     serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
//     socketTimeoutMS: 45000,
//     family: 4
// };


// // Database connection
// const db = mongoose.connect(connectionString, options)
//     .then(res => {
//         if (res) {
//             console.log(`Database connection successful to `);
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     });

// module.exports = { db };


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://webwormsdigital:Zccd9frfQnWy63d4@blogoshub.ltkqqlf.mongodb.net/?retryWrites=true&w=majority&appName=BlogosHub";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db=async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {db}
