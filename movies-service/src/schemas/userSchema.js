const Joi = require('joi');

const userSchema = Joi.object({
    nome: Joi.string()
        .min(5)
        .max(150)
        .required(),
    idade: Joi.number()
        .integer()
        .min(18)
        .required(),
    senha: Joi.string()
        .min(8)
        .pattern(/^(?=.*[0-9]+.*)\w+$/i),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'br', 'net']
            }
        }),
});

module.exports = userSchema;