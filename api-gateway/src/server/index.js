//const http = require('http');
const express = require('express');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { postUser, doLogin, doLogout } = require('../controllers/auth');
const { validateToken, validateAdmin, validateUser, validateBlacklist } = require('../middlewares/validationMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.post('/gateway/login', doLogin);
//com excessão da rota de login, todas =>'*' as outras rotas verificam blacklist
app.use('*', validateBlacklist);
app.post('/gateway/logout', validateToken, doLogout);
app.post('/gateway/users', validateToken, validateAdmin, validateUser, postUser);

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