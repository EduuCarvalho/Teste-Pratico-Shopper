import { productSchema } from "../schemas/price-schema.js";
import { Request, Response, NextFunction } from "express";
import { Product } from "../types/products-types.js";


export async function priceVerification (req:Request, res:Response, next:NextFunction) {
    const priceValidation = productSchema.validate(req.body as Product, {abortEarly:false})

    if (priceValidation.error){
        const error = priceValidation.error.details.map((detail)=> detail.message)
        return res.status(400).send(error);
        
    }
    next();
}