'use client'
import { completeOrder } from "@/actions/complete-order-action"
import { OrderWithProduct } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { useState } from 'react';


type OrderCardProps = {
    order: OrderWithProduct
}

export default function OrderCard({ order }: OrderCardProps) {

    const [isDisabled, setIsDisabled] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsDisabled(true);
        const form = event.currentTarget;
        completeOrder(new FormData(form));
    };
      

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name}</p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados: </p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product=>(
                    <div key={product.productId} 
                        className="flex items-center gap-2 border-t border-gray-200 pt-4"
                    >
                        {/* DEFINITION TERM */}
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">{product.quantity}{')'}</span>
                        </dt>
                        {/* DATOS */}
                        <dd className="text-sm font-medium text-gray-900">{product.product.name}</dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form action={completeOrder} onSubmit={handleSubmit}>
                <input type="hidden" value={order.id} name="order_id" />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    value='Marcar Orden Completada'
                    disabled={isDisabled}
                />

            </form>
        </section>
    )
}