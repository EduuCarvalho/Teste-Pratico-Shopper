import { productSchema } from "../schemas/price-schema.js";
import { Request, Response, NextFunction } from "express";
import { Product, ProductDB } from "../types/products-types.js";

export async function priceVerification (req:Request, res:Response, next:NextFunction) {
  
    const priceValidation = productSchema.validate(req.body as Product, {abortEarly:false})

    if (priceValidation.error){
        const error = priceValidation.error.details.map((detail)=> detail.message)
      
        const response: {
            errors: string[];
            product: ProductDB[];
        } = {errors:error,product:[]}

        return res.status(400).send(JSON.stringify(response))
     
    } 
  next()
}