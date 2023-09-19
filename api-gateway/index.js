//const http = require('http');
const express = require('express');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const auth = require('./auth');


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.post('/login', auth.doLogin);

app.post('/logout', auth.validateToken, auth.doLogout);



const options = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl;
    }
}

//apenas para estudos, pois as APIs deveriam estar em portas diferentes
//modificar a API de referencias bibliograficas para o MySQL
const userServiceProxy = proxy(process.env.USERS_API, options);
const referenceServiceProxy = proxy(process.env.REFERENCES_API, options);

app.use('/users', userServiceProxy);
app.use('/referencias', referenceServiceProxy);

app.listen(process.env.PORT, () => {
    console.log(process.env.USERS_API);
    console.log(`API Gateway started at port ${process.env.PORT}`);
});