const joi = require("joi");

const schema = {
    user: joi.object({
       name: joi.string().max(100).required(),
        email: joi.string().email().required(),
        phone: joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number").required()
    })
};

module.exports = schema;