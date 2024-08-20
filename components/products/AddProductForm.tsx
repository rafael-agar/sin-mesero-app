"use client"

import { createProduct } from "@/actions/create-product-actions"
import { ProductSchema } from "@/src/schema"
import { create } from "domain"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

// ESTE MANEJA LA LOGICA

export default function AddProductForm({children}: {children: React.ReactNode}) {
    const router  = useRouter()
    // FORMDATA ES UNA INTERFASE DE TS QUE NOS PERMITE RECIBIR UN FORMULARIO
    // formData es un objeto que contiene los datos del formulario
    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        const response = await createProduct(result.data)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        toast.success('Producto creado correctamente')
        router.push('/admin/products')
    }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
        <form action={handleSubmit} className='space-y-5'>
            {/* LO USAMOS PARA RENDERIZAR ProductForm EN EL SERVIDOR */}
            {children}
            <input type="submit" className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-1 p-3 uppercase font-bold cursor-pointer' value="Nuevo Porducto" />

        </form>
    </div>
  )
}
