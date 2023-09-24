const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'br', 'net']
            }
        }),
    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[0-9]+.*)\w+$/i),
    profileId: Joi.number()
        .integer()
        .min(1)
        .required()
});

module.exports = userSchema;