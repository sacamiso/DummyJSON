import { Product } from "./product.model";

 

export interface ProductResponse {

    limit: number;

    total: number;

    skip: number;

    products: Array<Product>

}