import Link from 'next/link'
import React from 'react'

type ProductspaginationProps = {
    page: number,
    totalPages: number
}

export default function ProductPagination({page, totalPages}: ProductspaginationProps) {
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)
  return (
    <nav className='flex justify-center pt-10'>

        {page > 1 && (
            <Link
            href={`/admin/products?page=${page -1}`}
            className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:font-bold'
            >
            &laquo;</Link>
        )}

        {pages.map(pageActual => (
            <Link
            key={pageActual}
            href={`/admin/products?page=${pageActual}`}
            className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:font-bold ${page === pageActual ? 'bg-gray-200' : ''}`}
            >
            {pageActual}</Link>
        ))}

        {page < totalPages && (
            <Link
            href={`/admin/products?page=${page +1}`}
            className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:font-bold'
            >
            &raquo;</Link>
        )}
        
    </nav>
  )
}
