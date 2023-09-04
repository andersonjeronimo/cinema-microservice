const { test, expect } = require('@jest/globals');
const repository = require('./repository');

test('Find All Documents', async () => {
    const docs = await repository.findDocuments('movies');
    expect(Array.isArray(docs)).toBeTruthy();
    expect(docs.length).toBeTruthy();
})

//{ findDocuments, findDocumentById, findDocumentByFilter, insertDocument }