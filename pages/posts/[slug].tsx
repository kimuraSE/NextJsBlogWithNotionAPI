import { getAllPosts, getSinglePost } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import {ReactMarkdown} from "react-markdown/lib/react-markdown"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Posts = ({post}:any) => {
  return (
    <section className='container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
        <h2 className='w-full text-2xl font-medium'>{post.metadata.title}</h2>
        <div className='border-b-2 w-1/3 mt-1'></div>
        <span className='text-gray-500'>{post.metadata.date}</span>
        <br />
        {post.metadata.tags.map((t:any , index:number)=>{
          return(
            <p key={index} className='text-white bg-sky-900 rounded-md font-medium mt-2 px-2 inline-block mr-2'>
              {t}
            </p>
          )
        })}
        <div className=' mt-10 font-medium'>
          <ReactMarkdown>
          {post.mdString}
          </ReactMarkdown>
          <Link href={'/'}>
            <span className='pb-20 block mt-3'>ホームに戻る</span>
          </Link>
        </div>

    </section>
  )
}

export default Posts

export const getStaticProps:GetStaticProps = async({params={}}) =>{

    const post = await getSinglePost(params.slug);

    return{

        props:{
            post
        },
        revalidate:60
    }

}

export const getStaticPaths:GetStaticPaths = async() => {

    const allPosts = await getAllPosts();
    const paths = allPosts.map(({slug})=>({
      params : {slug}
    }))
    return {
      paths: paths,
      fallback: false, // can also be true or 'blocking'
    }
  }