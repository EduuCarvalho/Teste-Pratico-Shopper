import {  getProduct, updateProductPrice, updatePackPrice, getPackByProductID,getPackByPackId } from "../repositories/price-repository.js";
import { PackDB, Product } from "../types/products-types.js";
import createError from 'http-errors';


export async function checkPriceService (product:Product) {

    try {
        const productDB = await getProduct(product.product_code);
        const highestPrice = parseFloat(productDB[0].sales_price) * 1.1;
        const lowestPrice = parseFloat(productDB[0].sales_price) * 0.9;
        
        if (productDB.length === 0) {
            throw createError(404,"Produto não encontrado!")
          }
    
        if(parseFloat(productDB[0].cost_price)> product.new_price){
            throw createError(422,"Novo preço deve ser maior que o preço de custo!")
        }  

        if (product.new_price > highestPrice || product.new_price < lowestPrice){
            throw createError(422,`Novo preço deve estar entre R$${lowestPrice.toFixed(2)} e R$${highestPrice.toFixed(2)}`)
        }
    }
    catch (err) {
        throw err
    }
}


export async function updatePriceService(product:Product) {

    try{
       const productDB = await getProduct(product.product_code);
       const packDBExist = await getPackByProductID(product.product_code);
      
       
       console.log("Produto", productDB)
       console.log("Pack", packDBExist)
      

    if(packDBExist.length === 0){
        await updateProductPrice(product);
    }

   if(packDBExist.length !== 0){
    await updateProductPrice(product);
    const packsProductList = await getPackByPackId(packDBExist[0].pack_id)
    console.log("Pack List prod", packsProductList)
    let sumProductPrice = 0;
    for (let i =0; i < packsProductList.length; i++){

        const getPriceProduct = await getProduct(packsProductList[i].product_id);
        console.log(getPriceProduct)
        const productPrice = parseFloat(getPriceProduct[0].sales_price);
        sumProductPrice += productPrice * packsProductList[i].qty;
    }
    console.log("Somatoria Final",sumProductPrice)
    await updatePackPrice(packDBExist,sumProductPrice);
    }
   }
    catch (err) {
        throw err
    }

} 