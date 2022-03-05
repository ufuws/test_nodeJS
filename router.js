const { celebrate, Joi } = require('celebrate');
const controller = require('./controller.js');

const router = require('express').Router();

router.post('/', celebrate({
    body: Joi.array().required().min(1).items(
        Joi.object().keys({
            id: Joi.number().required(),
            val: Joi.number().required()
        })
    ),
}), controller.post);

module.exports = router;