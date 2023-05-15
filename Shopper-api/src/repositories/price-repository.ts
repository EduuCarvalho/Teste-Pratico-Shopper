import {connection} from "../config/database.js";
import { ProductDB, Product, PackDB } from "../types/products-types.js";

export async function getProduct(id:number):Promise<ProductDB[]>{

    const [rows, fields] = await connection.execute('SELECT * FROM products WHERE code = ?', [id]);
    return rows as ProductDB[];
}

export async function getPackByProductID (id:number):Promise<PackDB[]>{

    const [rows, fields] = await connection.execute('SELECT * FROM packs WHERE product_id = ?', [id])
    return rows as PackDB[];
}

export async function getPackByPackId (id:number):Promise<PackDB[]>{

    const [rows, fields] = await connection.execute('SELECT * FROM packs WHERE pack_id = ?', [id])
    return rows as PackDB[];
}

export async function updateProductPrice (product:Product){

    await connection.execute('UPDATE products SET sales_price = ? WHERE code = ?',[product.new_price,product.product_code]);
}

export async function updatePackPrice (pack, newPackPrice:Number){

    await connection.execute('UPDATE products SET sales_price = ? WHERE code = ?',[newPackPrice, pack[0].pack_id]);
}

