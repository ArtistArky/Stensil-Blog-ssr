import React, { FC } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import supabaseClient from "./utils/supabaseClient";

import "./index.css";
import "./styles/index.scss";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";

export interface ClientProps {
  data?: any;
}

const supabaseFetch = async (table: string, query: string, type: string, authorSlug: string) => {
  const { data, error } = await supabaseClient.from(table).select(query).eq(type, authorSlug);

  return { error, data };
};

const returnFun = (error: any, posts: any, authors: any, nav: any, currentPost: any) => { 
  return { error: error, posts: posts, authors: authors, nav: nav, currentpost: currentPost };
}

const fetchPost = async (authorSlug: string) => {
  var posts: any = await supabaseClient
    .from("posts")
    .select(
      "*, authors!inner(*), category!inner(*), refauthors!inner(*)",
    )
    .eq("authors.username", authorSlug)
    .range(0, 10);

  var nav: any = await supabaseFetch("navigationv2", "*, authors!inner(*)", "authors.username", authorSlug);

  if (posts.error || nav.error) {

    return returnFun("Please check your internet connection & refresh the page", null, [], null, null);

  }else if (posts.data.length == 0) {

    const authors: any = await supabaseFetch("authors", "*", "username", authorSlug);

    if (authors.error) {
      return returnFun("Please check your internet connection & refresh the page", null, [], null, null);
    }
    
    return returnFun(null, null, [authors.data], nav.data, null);

  } else if (posts.data && nav.data) {
    //const urlPath = window.location.pathname;

    // if(urlPath.search("/posts/") != -1) { 
    //   const postId = urlPath.split("/posts/")[1].split("/")[0];
    //   var currentPost:any = await supabaseClient.from("posts").select(`*, authors!inner(*), category!inner(*), refauthors!inner(*)`).eq("posttitle", postId);

    //   if (currentPost.error) {
    //     return returnFun("Please check your internet connection & refresh the page", null, [], null, null);
    //   }
      
    //   return returnFun(null, posts.data, [posts.data[0].authors], nav.data, currentPost.data);
    // }

    return returnFun(null, posts.data, [posts.data[0].authors], nav.data, posts.data[0]);

  }
};

const container = document.getElementById("app");

const subdomain = window.location.hostname.split(".")[0];

const FullApp: FC<ClientProps> = ({data}) => (
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/" : "/"}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App data={data} />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

fetchPost(subdomain).then((data) => { 
  container!.innerHTML = "";
  if (import.meta.hot || !container?.innerText) {
    const root = createRoot(container!);
    root.render(<FullApp data={data} />);
  } else {
    console.log(data)
    hydrateRoot(container!, <FullApp data={data} />);
  }

});