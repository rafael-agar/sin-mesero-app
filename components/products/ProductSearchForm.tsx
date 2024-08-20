"use client"
import { searchSchema } from '@/src/schema'
import { toast } from 'react-toastify'
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

// PODEMOS USAR CUALQUIERA DE LAS DOS, useRouer o redirect

export default function ProductSearchForm() {
    const router = useRouter()

    const handleSearchform = (formaData: FormData) => {
        const data = {
            search: formaData.get('search')
        }
        const result = searchSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
        }
        router.push(`/admin/products/search?search=${data.search}`)
    }
  return (
    <form className='flex items-center' action={handleSearchform}>
        <input 
            type="text" 
            placeholder='Buscar producto'
            className='p-2 placeholder-gray-400 w-full'
            name='search'
        />

        <input type="submit" value={"Buscar"} className='bg-indigo-600 text-white uppercase cursor-pointer p-2' />

    </form>
  )
}
