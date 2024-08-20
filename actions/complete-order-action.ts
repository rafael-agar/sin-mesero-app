"use server"

// **************** PENDIENTE CAPITULO 690, "Marcar Odernes Completas y Validacion"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"
import { get } from "http"

export async function completeOrder(formData: FormData) {
// console.log(formData.get('order_id'))
    // ! SIGNIFICA QUE ESE VALOR VA A ESTAR AHI
    const orderId = formData.get('order_id')!
    try {
        await prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })
        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }

}

// **************** PENDIENTE CAPITULO 690, "Marcar Odernes Completas y Validacion"

// SIMBOLO DE + SIGNIFICA CONVERTIR A NUMERO