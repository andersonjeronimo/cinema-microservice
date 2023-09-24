const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');

async function postUser(req, res) {
    let { email, password, profileId } = req.body;
    try {
        const result = await repository.insertUser(email, password, profileId);
        res.json({ result });
    } catch (error) {
        res.sendStatus(422);
    }
}

async function doLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await repository.findUser(email, password);
        const token = jwt.sign(
            { userId: user._id, profileId: user.profileId },
            process.env.SECRET,
            { expiresIn: parseInt(process.env.EXPIRES) }
        );
        res.json({ token });
    } catch (error) {
        res.sendStatus(401);
    }
}

async function doLogout(req, res) {
    let token = req.headers['authorization'];
    token = token.replace('Bearer', '').trim();
    try {
        const result = await repository.blacklistToken(token);
        res.json({ result });
    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = { doLogin, doLogout, postUser }