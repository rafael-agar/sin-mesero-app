'use client'
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

function OrderSummary() {
  const order = useStore( (state) => state.order)
  const clearOrder = useStore( (state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

      // ACTION
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    // PASAMOS AL SCHEMA DE ZOD
    const result = OrderSchema.safeParse(data)
    console.log(result)
    if(!result.success){
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
  
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }

    // EJECUTA CODIGO SI NO HAY ERROR EN VALIDACION DE CLIENTE NI EN EL TRY CATCH
    toast.success('Comanda Enviada')
    clearOrder()

  }
  
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi pedido</h1>

        {order.length === 0 ? <p className="text-center my-10">Carrito vacio</p> : (
          <div className="mt-5">
            {order.map(item => (
              <ProductDetails key={item.id} item={item} />
            ))}

            <p className="text-2xl mt-20 text-center">Totala pagar {''}
              <span className="font-bold">{formatCurrency(total)}</span>
            </p>

            <form 
              className="w-full mt-10 space-y-5"
              action={handleCreateOrder}
            >

              <input 
                type="text" 
                placeholder="Tu nombre"
                className="bg-white border border-gray-100 p-2 w-full"
                name="name"
              />

              <input type="submit" className=" font-bold py-2 rounded uppercase bg-black text-white w-full text-center" 
              value="Confirmar pedido" />
            </form>

          </div>
        )}
    </aside>
  )
}

export default OrderSummary