const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

let server = null;

async function start(api, repository) {
    const app = express();
    app.use(helmet());
    app.use(morgan('dev'));


    //Monitoria e observabilidade
    app.get('/health', (req, res, next) => {
        console.log(`Service ${process.env.MS_NAME} started at port ${process.env.PORT}`);
    });

    //MUITO IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!
    api(app, repository);
    //MUITO IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!

    //middleware de erros
    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    })

    server = app.listen(process.env.PORT, () => {
        console.log(`Service ${process.env.MS_NAME} started at port ${process.env.PORT}`);
    })

    return server;
}

async function stop() {
    if (server) {
        await server.close();
    }
    return true;
}

module.exports = { start, stop };