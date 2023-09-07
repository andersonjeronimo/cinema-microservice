const { test, expect } = require('@jest/globals');
const server = require('./server');

test('Server Start', async ()=>{
    const app = await server.start();
    expect(app).toBeTruthy();
})

test('Server Stop', async ()=>{
    const isStoped = await server.stop();
    expect(isStoped).toBeTruthy();
})