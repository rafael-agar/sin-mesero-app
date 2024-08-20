'use client'
import LatestOrderItem from '@/components/order/LatestOrderItem'
import Logo from '@/components/ui/Logo'
import { OrderWithProduct } from '@/src/types'
import useSWR from 'swr'

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const {data, error, isLoading} = useSWR<OrderWithProduct[]>(url, fetcher,{refreshInterval: 100000, revalidateOnFocus: false})
    // console.log(JSON.stringify(orders, null, 2))
  
    if (isLoading) return <p>Cargando Ordenes...</p>  
    if (data) return (
    <>
        <h1 className='text-center mt-20 text-6xl font-black'>Ordernes Listas</h1>
        <Logo />

        {data.length ? (
            <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                {data.map (order => (
                    <LatestOrderItem key={order.id} order={order}/>
                ))}
            </div>
        ) : <p className="text-center my-10">No hay Ordernes Listas</p>
        }
    </>
  )
}
