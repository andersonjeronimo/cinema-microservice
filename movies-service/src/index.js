//require('dotenv').config();
//dotenv deve ser carregado no jest.config

const repository = require('./repository/repository');
const api = require('./api/movies');
const server = require('./server/server');

(async () => {
    try {
        await server.start(api, repository);
    } catch (error) {
        console.log(error);
    }
})();
