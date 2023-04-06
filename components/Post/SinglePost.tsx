import Link from 'next/link';
import React from 'react'

type Props ={
    title :string;
    description : string;
    date : string;
    tag : string[];
    slug:string;
    isPagenationPage : boolean;
}

const SinglePost = ({title,description,date,tag,slug,isPagenationPage}:Props) => {
  return (
    <Link href={`/posts/${slug}`}>
      { isPagenationPage ? (
        <>
        <section className=' bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
        <div className='lg:flex  items-center'>
            <h2 className='text-gray-100 text-2xl font-medium mb-2'>{title}</h2>
            <div className='text-gray-400 mr-2'>{date}</div>

            {tag.map((t:string,index:number)=>{
              return(
                <Link href={`/posts/tag/${t}/page/1`} key={index}>
                <span  className='text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium'>
              {t}
              </span>
                </Link>
                )
              })
              }
        </div>
        <p className='text-gray-100 '>{description}</p>
    </section>
        </>
      ) : (
        <section className='lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
        <div className='flex items-center gap-3'>
            <h2 className='text-gray-100 text-2xl font-medium mb-2'>{title}</h2>
            <div className='text-gray-100'>{date}</div>

            {tag.map((t:string,index:number)=>{
              return(
                <Link href={`/posts/tag/${t}/page/1`} key={index}>
                <span className='text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium'>
              {t}
              </span>
                </Link>
                )
              })
              }
        </div>
        <p className='text-gray-100 '>{description}</p>
    </section>
              )}
    </Link>
  )
}

export default SinglePost