const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

async function connectToDb() {
    let uri = process.env.DB_CONNECT;

    // Use in-memory MongoDB if no real URI is provided (placeholders or missing)
    const isPlaceholder = !uri ||
        uri.includes('<username>') ||
        uri.includes('<password>') ||
        uri.includes('your_') ||
        uri.trim() === '';

    if (isPlaceholder) {
        console.log('⚠️  No real DB_CONNECT found — starting in-memory MongoDB for development...');
        mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
        console.log(`✅ In-memory MongoDB running at: ${uri}`);
    }

    mongoose.connect(uri)
        .then(() => {
            console.log('✅ Connected to DB');
        })
        .catch(err => console.log('❌ DB Error:', err));
}

module.exports = connectToDb;