import { Cart } from "./carro.model";

export interface CartResponse {
    carts: Cart[]
    total: number
    skip: number
    limit: number
  }