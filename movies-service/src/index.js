//require('dotenv').config();
//dotenv deve ser carregado no jest.config
const db = require('./config/database');

console.log('Index da aplicação');

db.connect();
db.disconnect();
