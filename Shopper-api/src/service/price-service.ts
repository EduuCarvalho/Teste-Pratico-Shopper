import { getProduct } from "../repositories/price-repository.js";
import { Product } from "../controller/price-controller.js";

export async function updateProductService (product:Product) {
    console.log("TO no service")
    const productDB = await getProduct(product.product_code)


}