import {create} from  'zustand'
import {OrderItem} from '@/src/types'
import { Product } from '@prisma/client'

// ARREGLO PARA LAS ORDENES TIPADO

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    // addToOrder: (product) => {

    //     const {categoryId, image, ...data} = product
    //     let order: OrderItem[] = []
    //     if(get().order.find(item => item.id === product.id)) {
    //         order = get().order.map(item => item.id === product.id ? {
    //             ...item,
    //             quantity: item.quantity + 1,
    //             subtotal: (item.quantity + 1) * item.price
    //         } : item)
    //     } else {
    //         order = [...get().order, {
    //             ...data,
    //             quantity: 1,
    //             subtotal: 1 * product.price
    //         }]
    //     }

    //     set( () => ({
    //         order
    //     })) 
    // },

    addToOrder: (product) => {
        let order: OrderItem[] = []
        if(get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item)
        } else {
            order = [...get().order, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,  // Include the image property
                quantity: 1,
                subtotal: product.price
            }]
        }
    
        set( () => ({
            order
        })) 
    },
    

    increaseQuantity: (id) => {
        
        set( (state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item)
        }))
    },

    decreaseQuantity: (id) => {
        
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.price
        } : item)

        set( (state) => ({
            order
        }))
    },
    
    removeItem: (id) => {
        set( (state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },

    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))

