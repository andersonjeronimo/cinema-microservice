const { ObjectId } = require('mongodb');
const database = require('../config/database');

async function findDocuments(collectionName) {
    const db = await database.connect();
    try {
        const documents = await db
            .collection(collectionName)
            .find({}).toArray();
        return documents;
    } catch (error) {
        console.log(error);
    }
}

async function findDocumentById(collectionName, id) {
    const db = await database.connect();
    try {
        const document = await db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(id) });
        return document;
    } catch (error) {
        console.log(error);
    }
}

async function findDocumentByFilter(collectionName, filter) {
    const db = await database.connect();
    try {
        const document = await db
            .collection(collectionName)
            .find(filter).toArray();
        return document;
    } catch (error) {
        console.log(error);
    }
}

async function insertDocument(collectionName, document) {
    const db = await database.connect();
    try {
        const id = await db
            .collection(collectionName)
            .insertOne(document);
        return id;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { findDocuments, findDocumentById, findDocumentByFilter, insertDocument };