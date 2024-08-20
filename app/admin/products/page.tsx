import ProductPagination from '@/components/products/ProductPagination'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import {redirect} from 'next/navigation'

async function productCount(){
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page -1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
    // incluir las categorias
  })

  return products
}

export type ProductswithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {searchParams: {page: string}}) {
  // console.log(searchParams.page)
  // OBTENIENDO LA PAGIANA ACUAL
  const page = +searchParams.page || 1
  const pageSize = 10

  if(page < 0 ) redirect('/admin/products')
  // PEGAMOS ANTES DE VALIDAR ESTAS CONSULTAS
    
  const productsData = getProducts(page, pageSize)
  const totalProductData = productCount()
  // ESTO ES PARA QUE LAS CONSULTAS SEAN PARALELEAS, la 2da No depende de la 1ra
  // const products = await getProducts(page, pageSize)
  // const totalProduct = await productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductData])
  const totalpages = Math.ceil(totalProducts / pageSize)

  if(page > totalpages){
    redirect('/admin/products')
  }

  return (
    <>
      <Heading>Administrando Productos</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href='/admin/products/new' className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'>Crear Producto</Link>
        <ProductSearchForm />
      </div>
      
      {products.length ? (
        <ProductTable products={products} />
      )
    : (
        <p>No hay productos</p>
      )}

      <ProductPagination page={page} totalPages={totalpages} />
    </>
  )
}

