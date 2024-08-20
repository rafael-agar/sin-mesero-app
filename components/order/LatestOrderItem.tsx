import { OrderWithProduct } from "@/src/types"

type LatestOrderItemProps = {
  order: OrderWithProduct
}

export default function LatestOrderItem({order}: LatestOrderItemProps) {
  return (
    <div className="bg-white shadow p-5 rouded-lg">
        <p className="text-lg font-bold text-slate-600">Cliente: {order.name}</p>
        <ul className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-agray-500">
            {order.orderProducts.map((orderProduct) => (
                <li key={orderProduct.id}>
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">{orderProduct.product.name}</p>
                            <p className="text-xs">Cantidad: {orderProduct.quantity}</p>
                        </div>
                        <p className="font-bold">{orderProduct.product.price}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}
