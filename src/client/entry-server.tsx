import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppServer from "./AppServer";
import supabaseClient from "./utils/supabaseClient";
import htmltoText from "./utils/htmltoText";

import "./index.css";
import "./styles/index.scss";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";

const supabaseFetch = async (table: string, query: string, type: string, authorSlug: string) => {
  const { data, error } = await supabaseClient.from(table).select(query).eq(type, authorSlug);

  return { error, data };
};

const returnFun = (error: any, posts: any, authors: any, nav: any, currentPost: any) => { 
  return { error: error, posts: posts, authors: authors, nav: nav, currentpost: currentPost };
}

const fetchAuthor = async (authorSlug: string) => {

    const authors: any = await supabaseFetch("authors", "username, title, description, logoimg, faviconimg", "username", authorSlug);

    if (authors.error) {
      return { error: "Please check your internet connection & refresh the page", content: [], url: 'authors' };
    }

    return { error: null, content: [authors.data[0]], url: 'authors' };
};

const fetchPost = async (url: string) => {
  const postId = url.split("/posts/")[1].split("/")[0];
  
  var currentPost:any = await supabaseClient.from("posts").select(`title, post, authors!inner(*), category!inner(*)`).eq("posttitle", postId);


  if (currentPost.error) {
    return { error: "Please check your internet connection & refresh the page", content: [], url: 'posts' };
  }

  const { title, post, authors } = currentPost.data[0];
  const postData = htmltoText(post);

  const contentData = { title: title, description: postData.substring(0, 200), username: authors.username, logoimg: authors.logoimg, faviconimg: authors.faviconimg };

  return { error: null, content: [contentData], url: 'posts' };
};

export async function render(url: string, subdomain: string) {
  console.log("Rendering", url, subdomain);
  const data = url.search("/posts/") != -1 ? await fetchPost(url) : await fetchAuthor(subdomain);

  return { appHtml: ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
         <AppServer data={data} />
      </StaticRouter>
    </React.StrictMode>), data };

}
