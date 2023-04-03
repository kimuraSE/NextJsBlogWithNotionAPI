import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client"; 
import { NotionToMarkdown } from "notion-to-md"; 

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const n2m = new NotionToMarkdown({notionClient:notion});

  
  export const getAllPosts = async() =>{
    

    const posts = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID || '',
        page_size : 100,

    })

    const allPosts = posts.results;

    return allPosts
    .map((post)=>{
      return getPageMetaDate(post)
    })
  }

  const getPageMetaDate = (post:any) =>{

    const getTag = (tags:any) =>{
      const allTags = tags.map((tag:any)=>{
        return tag.name
      })
      return allTags
    }

    return{
      id:post.id,
      title:post.properties.名前.title[0].plain_text,
      description:post.properties.Description.rich_text[0].plain_text,
      date:post.properties.日付.date.start,
      slug:post.properties.Slug.rich_text[0].plain_text,
      tags:getTag(post.properties.タグ.multi_select)


    }

  }

export const getSinglePost = async(slug:any) =>{
  const response = await notion.databases.query({
    database_id : process.env.NOTION_DATABASE_ID || '',
    filter :{
      property:"Slug",
      formula:{
        string : {
          equals:slug
        }
      }
    }
  });

  const page = response.results[0];
  const metadata = getPageMetaDate(page)
  // console.log(metadata)
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return{
    metadata,
    mdString
  }

}




export const getPostsForTopPage = async(page_size:number = 4) =>{

  const allPosts = await getAllPosts();
  const fourPost = allPosts.slice(0,page_size)
  return fourPost
}

export const getPostByPage = async(page:number) =>{

  const allPost = await getAllPosts();
  const startIndex = (page-1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE
  return allPost.slice(startIndex,endIndex);
}

export const getNumberOfPages = async() =>{
  const allPosts = await getAllPosts();

  let returnNumber = Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE);

  if (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0){
    returnNumber += 1;
  }

  return returnNumber;
}

export const getPostByTagAndPage = async(tagName:string,page:number)=>{
  const allPosts = await getAllPosts();

  const posts = allPosts.filter((post)=>
    post.tags.find((tag:string)=>tag === tagName)
  )
  console.log(posts)

  const startIndex = (page-1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return posts.slice(startIndex,endIndex)
}

export const getNumberOfPageByTag = async(tagName:string) =>{

  const allPosts = await getAllPosts();

  const posts = allPosts.filter((post)=>
  post.tags.find((tag:string)=>tag === tagName))

  let returnNumber = Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE);

  if (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0){
    returnNumber += 1;
  }

  return returnNumber;

}

export const getAllTags = async() =>{

  const allPosts = await getAllPosts();

  const allTagsDuplicationLists= allPosts.flatMap((post)=>post.tags)
  const set = new Set(allTagsDuplicationLists)
  const allTagsList = Array.from(set)
  
  return allTagsList
}