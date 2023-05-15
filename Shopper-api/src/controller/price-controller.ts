import { Request,Response } from "express";
import { updateProductService } from "../service/price-service.js";

export type Product = {
    product_code: number,
    new_price: number
}

export async function priceValidation (req:Request,res:Response) {
    const product = req.body as Product;
        try {
            console.log("TO no controller")
            await updateProductService(product);
            res.sendStatus(200);
        }
        catch(err) {
            res.sendStatus(500);
        }

}