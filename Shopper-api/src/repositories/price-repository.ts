import {connection} from "../config/database.js";
import { ProductDB, Product } from "../types/products-types.js";

export async function getProduct(id:number):Promise<ProductDB[]>{

    const [rows, fields] = await connection.execute('SELECT * FROM products WHERE code = ?', [id]);

    return rows as ProductDB[];
}

export async function updateProductPrice (product:Product){

    await connection.execute('UPDATE products SET sales_price = ? WHERE code = ?',[product.new_price,product.product_code]);
}

export async function updatePackPrice (product:Product){

    const pack = await connection.execute('SELECT * FROM packs WHERE product_id = ?', [product.product_code]);
    const newPrice = pack[0]

    await connection.execute('UPDATE products SET sales_price = ? WHERE code = ?',[product.new_price,product.product_code]);
    
}