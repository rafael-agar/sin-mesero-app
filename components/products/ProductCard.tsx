import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductBotton from "./AddProductBotton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
  return (
    <div className="border bg-white">

        <Image 
            src={`/products/${product.image}.jpg`} 
            alt={product.name} 
            width={400} 
            height={500} 
            className="w-full"
            // quality={75} default
        />

        <div className="p-5">
            <h3 className="font-bold">{product.name}</h3>
            <p className="mt-2 font-black text-xl text-amber-500">
                {formatCurrency(product.price)}
            </p>
           <AddProductBotton product={product} />
        </div>
    </div>
  )
}
