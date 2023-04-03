import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import { getAllTags, getNumberOfPageByTag, getNumberOfPages, getPostByPage, getPostByTagAndPage, getPostsForTopPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'


export default function BlogTagPageList({posts,numberOfPagesByTag,currentTag}:any) {


  return (
    <>
    <div className='container h-full w-full mx-auto '>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>Notion Blog🚀</h1>
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
        {
            posts.map((post:any)=>{
                return (<div key={post.id} >
              <SinglePost 
              title={post.title}
              description={post.description}
              date={post.date}
              tag={post.tags}
              slug={post.slug}
              isPagenationPage={true}
              />
            </div>)
          })
        }
        </section>
        <Pagination numberOfPage = {numberOfPagesByTag} tag={currentTag}/>
      </main>
      
        </div>
    </>
  )
}

export const getStaticPaths:GetStaticPaths= async()=>{
  const allTags = await getAllTags();
  let params:any = [];

  await Promise.all(
    allTags.map((tag:string)=>{
      return getNumberOfPageByTag(tag).then((numberOfPageByTag:number)=>{
        for(let i = 1 ; i <= numberOfPageByTag ; i ++){
          params.push({params:{tag:tag,page:i.toString()}})
        }
      })
    })
    )
  console.log(params)
  


    
    return{
        paths: params,
        fallback:false
    }
}


export const getStaticProps:GetStaticProps = async(context)=>{

  const currentTag = context.params?.tag?.toString();
  const currentPage = context.params?.page?.toString();

  if (!currentPage || !currentTag) {
    return {
      notFound: true,
    }
  }
  
  const posts = await getPostByTagAndPage(currentTag,parseInt(currentPage,10))

  const numberOfPagesByTag = await getNumberOfPageByTag(currentTag)

  return {
    props :{
        posts,
        numberOfPagesByTag,
        currentTag
    },
    revalidate:60
  }
}