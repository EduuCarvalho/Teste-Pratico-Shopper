export type Product = {
    product_code: number,
    new_price: number
}

export type ProductDB = {
    code: number,
    name: string,
    cost_price: string,
    sales_price: string
}

export type PackDB = {
    id: number,
    pack_id: number,
    product_id: number,
    qty: number
}

export interface RequestWithErrors extends Request {
    errors?: string[];
  }

