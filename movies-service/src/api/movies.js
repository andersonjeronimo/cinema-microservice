const { validateToken, validateUser, validateAdmin } = require('../middlewares/validationMiddleware');
const logger = require('../config/logger');

module.exports = (app, repository) => {
    //module.exports = { , , , insertDocument };
    app.get('/:collection', validateToken, async (req, res, next) => {
        const collectionName = req.params.collection;
        const filter = req.query;
        var data = {};
        if (Object.entries(filter).length > 0) {
            data = await repository.findDocumentByFilter(collectionName, filter);
            if (!data || data.length === 0) {
                return res.sendStatus(404);
            }
        } else {
            data = await repository.findAllDocuments(collectionName);
            if (!data || data.length === 0) {
                return res.sendStatus(404);
            }
        }
        res.json(data);
    })

    app.get('/:collection/:id', validateToken, async (req, res) => {
        const id = req.params.id;
        const collectionName = req.params.collection;
        const data = await repository.findDocumentById(collectionName, id);
        if (!data) {
            return res.sendStatus(404);
        }
        res.json(data);
    })

    app.post('/users', validateToken, validateAdmin, validateUser, async (req, res) => {
        const nome = req.body.nome;
        const idade = parseInt(req.body.idade);
        /*Não são campos obrigatórios, insere valores default */
        const senha = req.body.senha ? req.body.senha : '123456';
        const email = req.body.email ? req.body.email : 'email@email.com';
        const result = await repository.insertDocument('users', { nome, idade, senha, email });
        if (!result) {
            return res.sendStatus(422);
        }
        logger.info(`User ${res.locals.userId} added the document ${result.insertedId} at ${new Date()}`);

        res.json(result);
    })

}