import {connection} from "../config/database.js";
import { ProductDB } from "../types/products-types.js";

export async function getProduct(id:number):Promise<ProductDB[]>{

    const [rows, fields] = await connection.execute('SELECT * FROM products WHERE code = ?', [id]);

    return rows as ProductDB[];
}