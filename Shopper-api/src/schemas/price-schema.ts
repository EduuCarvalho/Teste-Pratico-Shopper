import Joi from 'joi';

export const productSchema = Joi.object({
        product_code: Joi.number().required(),
        new_price: Joi.number().required()
})