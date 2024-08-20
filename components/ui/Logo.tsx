import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex justify-center mt-5'>
        <div className='relative w-40 h-40'>
            <Image 
                fill
                alt='logotipo Restaurant'
                src='/logo.svg'
            />
        </div>
    </div>
  )
}
