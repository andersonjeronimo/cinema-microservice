const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

const ADMIN_PROFILE = 1;

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

//valida schema
function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const { details } = error;
        return res.status(422).json(details);
    } else {
        next();
    }
}

function validateAdmin(req, res, next) {
    const { profileId } = res.locals;
    if (parseInt(profileId) === ADMIN_PROFILE) {
        next();
    }
    else res.sendStatus(403);
}

module.exports = { validateToken, validateUser, validateAdmin };