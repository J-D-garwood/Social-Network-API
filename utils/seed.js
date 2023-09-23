const connection = require('../config/connection');
const { User, Thought } = require('../models');
//something goes here..

const userData = [
    ["bubbles", "bubbles@mail.com", ""]
]

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected')

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    const users = [];


})