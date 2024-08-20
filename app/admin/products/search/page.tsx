import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductTable";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import Link from "next/link";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage ({searchParams}: {searchParams: {search: string}}) {
    const products = await searchProducts(searchParams.search)
    return (
        <>
            <Heading>Resultado de Búsueda: {searchParams.search}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <Link href='/admin/products/new' className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'>Crear Producto</Link>
                <ProductSearchForm />
            </div>

            <ProductTable products={products} />
        </>
    )
}