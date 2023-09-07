const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

let server = null;

async function start() {
    const app = express();
    app.use(helmet());
    app.use(morgan('dev'));

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

module.exports = {start, stop};