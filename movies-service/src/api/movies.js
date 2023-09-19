const { validateToken } = require('../middlewares/validationMiddleware');

module.exports = (app, repository) => {
    //module.exports = { , , , insertDocument };
    app.get('/:collection',validateToken, async (req, res, next) => {
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

    app.get('/:collection/:id', validateToken, async (req, res, next) => {
        const id = req.params.id;
        const collectionName = req.params.collection;
        const data = await repository.findDocumentById(collectionName, id);
        if (!data) {
            return res.sendStatus(404);
        }
        res.json(data);
    })
}