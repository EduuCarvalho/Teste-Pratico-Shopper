import { Request,Response } from "express";
import { updateProductService } from "../service/price-service";

export type Product = {
    product_code: number,
    new_price: number
}

export async function priceValidation (req:Request,res:Response) {
    const product = req.body as Product;
        try {
            await updateProductService(product);
            res.sendStatus(200);
        }
        catch(err) {
            res.sendStatus(500);
        }

}