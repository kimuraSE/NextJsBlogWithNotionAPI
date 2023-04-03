import Link from 'next/link'
import React from 'react'



const Tag = ({allTags}:any) => {
  return (
    <div className='mx-4'>
        <section className='lg:w-1/2 mb-8 mx-auto bg-orange-200 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1
         duration-300 transition-all'>
            <div className=' font-medium mb-4'>
                タグ検索
            </div>
            <div className='flex flex-wrap gap-5'>
                {
                    allTags.map((tag:any,index:number)=>{
                        return(
                <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                    <span className=' cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block'>
                        {tag}</span>
                </Link>
                        )
                    })
                }
            </div>
        </section>
    </div>
  )
}

export default Tag