import { getPageLink } from '@/lib/blog-helper';
import Link from 'next/link'
import React from 'react'

interface Props {
    numberOfPage :number
    tag:string;
}

const Pagination = ({numberOfPage,tag}:Props) => {
    let pages = [];
    for(let i = 1; i<=numberOfPage ; i++){
        pages.push(i)
    }

  return (
    <section className='mb-8 lg:w-1/2 mx-auto rounded-md p-5'>
        <ul className='flex items-center gap-4 justify-center'>

            {
            pages.map((page:number,index:number)=>{
                return(
                <li key={index} className='bg-sky-900 rounded-lg w-6 h-8 relative'>
                    <Link href={getPageLink(tag,page)} className="text-xs absolute top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 text-gray-100">
                    {page}
                    </Link>
                </li>
                    )            
                })
            }
            
        </ul>
    </section>
  )
}

export default Pagination