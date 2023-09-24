const { MongoClient } = require("mongodb");
//ou
//const MongoClient = require("mongodb").MongoClient;
let client = null;
let uri = process.env.MONGODB_CONNECTION;

/*Create a new Db instance sharing the current socket connections.*/
async function connect() {    
    if (!client) {        
        client = new MongoClient(uri);
    }
    try {        
        await client.connect();
        return client.db(process.env.DATABASE);
    } catch (error) {
        console.log(error);
    }
}

async function disconnect(){
    if (!client) {        
        return true;
    } else {        
        await client.close();
        client = null;
        return true;
    }
}

module.exports = { connect, disconnect };