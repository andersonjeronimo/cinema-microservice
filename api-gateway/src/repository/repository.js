const database = require('../config/database');
const bcrypt = require('bcryptjs');

async function insertUser(email, password, profileId) {
    let encryptedPwd = bcrypt.hashSync(password);
    const db = await database.connect();
    const result = await db
        .collection('users')
        .insertOne({
            email: email,
            password: encryptedPwd,
            profileId: profileId
        });
    if (!result) {
        throw new Error('Não foi possível inserir novo usuário');
    }
    return result;
}

async function findUser(email, password) {
    const db = await database.connect();
    const user = await db
        .collection('users')
        .findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
        return user;
    } else {
        throw new Error('Email or / and password is invalid');
    }
}

async function blacklistToken(token) {
    const db = await database.connect();
    const result = await db
        .collection('blacklist')
        .insertOne({ _id: token });
    return result;
}

async function checkTokenBlacklist(token) {
    const db = await database.connect();
    const qtd = await db
        .collection('blacklist')
        .countDocuments({ _id: token });
    return qtd > 0;
}

module.exports = { findUser, insertUser, blacklistToken, checkTokenBlacklist };