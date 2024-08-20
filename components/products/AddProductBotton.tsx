'use client'

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductBotton = {
    product: Product
}

export default function AddProductBotton({product}: AddProductBotton) {
    const addToOrder = useStore(state => state.addToOrder)

  return (
    <button
    type="button"
    className=" w-full bg-indigo-600 text-white p-3 mt-5 rounded-md hover:bg-indigo-700 uppercase font-bold cursos-pointer"
    onClick={() => addToOrder(product)}
    >
        Agregar
    </button>
  )
}
