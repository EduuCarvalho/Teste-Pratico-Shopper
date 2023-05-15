import {connection} from "../config/database.js";

export async function getProduct(id:number){
    console.log("TO no reposit")
    const [rows, fields] = await connection.execute('SELECT * FROM products WHERE code = ?', [id]);
    console.log(rows)
}