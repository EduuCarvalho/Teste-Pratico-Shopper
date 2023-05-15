import { Request,Response } from "express";
import { updateProductService } from "../service/price-service.js";
import { Product } from "../types/products-types.js";

export async function priceValidation (req:Request,res:Response) {
    const product = req.body as Product;
        try {
            await updateProductService(product);
            return res.sendStatus(200);
        }
        catch(err) {
            return res.status(err.statusCode || 500).send(err.message || "Internal server error");
        }

}