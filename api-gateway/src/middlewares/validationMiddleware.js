const userSchema = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
const { checkTokenBlacklist } = require('../repository/repository');
//valida schema
const ADMIN_PROFILE = 1;

function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const { details } = error;
        return res.status(422).json(details);
    } else {
        next();
    }
}

function validateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    token = token.replace('Bearer', '').trim();
    try {
        const { userId, profileId } = jwt.verify(token, process.env.SECRET);
        res.locals.userId = userId;
        res.locals.profileId = profileId;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}

function validateAdmin(req, res, next) {
    const { profileId } = res.locals;
    if (parseInt(profileId) === ADMIN_PROFILE) {
        next();
    }
    else res.sendStatus(403);
}

async function validateBlacklist(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return next();
    token = token.replace('Bearer', '').trim();
    const isBlacklisted = await checkTokenBlacklist(token);
    if (isBlacklisted) {
        return res.sendStatus(401);
    } else {
        next();
    }
}

module.exports = { validateUser, validateToken, validateAdmin, validateBlacklist };