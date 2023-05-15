 import { Request,Response } from "express";
import { checkPriceService, updatePriceService } from "../service/price-service.js";
import { Product } from "../types/products-types.js";


export async function priceValidation (req:Request,res:Response) {
    const product = req.body as Product;
        try {
           const resProduct = await checkPriceService(product);
            return res.status(200).send(resProduct)
        }
        catch(err) {
            return res.status(err.statusCode || 500).send(err.message || "Internal server error");
        }
}

export async function updatePrice (req: Request, res:Response) {
    const product = req.body as Product;
        try {
            await updatePriceService(product);
            return res.sendStatus(200);
        }
        catch(err) {
            return res.status(err.statusCode || 500).send(err.message || "Internal server error");
        }
}