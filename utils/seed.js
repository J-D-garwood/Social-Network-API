//seeding mongoDB initially
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeeds } = require('./data');

connection.on('error', (err) => console.log(err));

connection.once('open', async () => {
    console.log('connected');

    const users = userSeeds;

    await User.collection.insertMany(users);    

    console.log('Database successfully seeded');
    process.exit(0);

})

