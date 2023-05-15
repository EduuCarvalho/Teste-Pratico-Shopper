import { getProduct } from "../repositories/price-repository.js";
import { Product } from "../types/products-types.js";
import createError from 'http-errors';


export async function updateProductService (product:Product) {

    try {
        const productDB = await getProduct(product.product_code);
        
        if (productDB.length === 0) {
            throw createError(404,"Produto não encontrado!")
          }
    
        if(parseFloat(productDB[0].cost_price)> product.new_price){
            throw createError(422,"Novo preço deve ser maior que o preço de custo!")
        }  
    }
    catch (err) {
        throw err
    }
}