import { Order, OrderProducts, Product } from "@prisma/client";

// TIPADO PARA LAS ORDENES

export type OrderItem = Pick<Product, 'id' | 'image' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}

export type OrderWithProduct = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}