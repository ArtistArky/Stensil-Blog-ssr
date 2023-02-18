import React, { useState, useEffect, FC } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Loading from "components/Loading/Loading";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import SubFooter from "components/Footer/SubFooter";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingle from "containers/PageSingle/PageSingle";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageSingleTemplate2 from "containers/PageSingle/PageSingleTemp2";
import PageSingleTemp2Sidebar from "containers/PageSingle/PageSingleTemp2Sidebar";
import PageSingleTemplate3 from "containers/PageSingle/PageSingleTemp3";
import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import SubHeaderContainer from "containers/HeaderContainer/SubHeaderContainer";
import PageHome from "containers/PageHome/PageHome";
import PageHomeDemo2 from "containers/PageHome/PageHomeDemo2";
import PageHomeDemo3 from "containers/PageHome/PageHomeDemo3";
import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
import PageHomeDemo4 from "containers/PageHome/PageHomeDemo4";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
import PageHomeDemo5 from "containers/PageHome/PageHomeDemo5";
import PageHomeDemo6 from "containers/PageHome/PageHomeDemo6";
import PageHomeDemo7 from "containers/PageHome/PageHomeDemo7";
import PageSingleTemp4Sidebar from "containers/PageSingle/PageSingleTemp4Sidebar";
import { MyGlobalContext } from "utils/context";
import getAuthorSlug from "utils/getAuthorSlug";

import supabaseClient from "utils/supabaseClient";

export interface SubDomainProps {
  data?: any;
}

export const subDomainPages: Page[] = [
  { path: "/", exact: true, component: <PageHome /> },
  { path: "/#", exact: true, component: <PageHome /> },
  //
  { path: "/home-header-style1", exact: true, component: <PageHome /> },
  { path: "/home-header-style2", exact: true, component: <PageHome /> },
  {
    path: "/home-header-style2-logedin",
    exact: true,
    component: <PageHome />,
  },
  //
  { path: "/archive/:slug", component: <PageArchive /> },
  { path: "/archive-video/:slug", component: <PageArchiveVideo /> },
  { path: "/archive-audio/:slug", component: <PageArchiveAudio /> },
  //
  { path: "/author/:slug", component: <PageAuthor /> },
  { path: "/author-v2/:slug", component: <PageAuthorV2 /> },
  //
  {
    path: "/single-sidebar/:slug",
    component: <PageSingleTemplate3 />,
  },
  {
    path: "/single-template-2/:slug",
    component: <PageSingleTemplate2 />,
  },
  {
    path: "/single-2-sidebar/:slug",
    component: <PageSingleTemp2Sidebar />,
  },
  {
    path: "/single-template-3/:slug",
    component: <PageSingle />,
  },
  {
    path: "/single-3-sidebar/:slug",
    component: <PageSingleHasSidebar />,
  },
  {
    path: "/single-4-sidebar/:slug",
    component: <PageSingleTemp4Sidebar />,
  },
  {
    path: "/posts/:postslug",
    component: <PageSingle />,
  },
  {
    path: "/category/:categoryslug",
    component: <PageArchive />,
  },
  {
    path: "/single-gallery/:slug",
    component: <PageSingleGallery />,
  },
  {
    path: "/single-audio/:slug",
    component: <PageSingleAudio />,
  },
  {
    path: "/single-video/:slug",
    component: <PageSingleVideo />,
  },

  { path: "/search", component: <PageSearchV2 /> },
  { path: "/about", component: <PageAbout /> },
  { path: "/contact", component: <PageContact /> },
  { path: "/page404", component: <Page404 /> },
  { path: "/subscription", component: <PageSubcription /> },
  //
  { path: "/home-demo-2", component: <PageHomeDemo2 /> },
  { path: "/home-demo-3", component: <PageHomeDemo3 /> },
  { path: "/home-demo-4", component: <PageHomeDemo4 /> },
  { path: "/home-demo-5", component: <PageHomeDemo5 /> },
  { path: "/home-demo-6", component: <PageHomeDemo6 /> },
  { path: "/home-demo-7", component: <PageHomeDemo7 /> },
  //
];

export const mainPages: Page[] = [
  { path: "/", exact: true, component: <PageHome /> },
  { path: "/#", exact: true, component: <PageHome /> },
  //
  { path: "/home-header-style1", exact: true, component: <PageHome /> },
  { path: "/home-header-style2", exact: true, component: <PageHome /> },
  {
    path: "/home-header-style2-logedin",
    exact: true,
    component: <PageHome />,
  },
  //
  { path: "/archive/:slug", component: <PageArchive /> },
  { path: "/archive-video/:slug", component: <PageArchiveVideo /> },
  { path: "/archive-audio/:slug", component: <PageArchiveAudio /> },
  //
  { path: "/author/:slug", component: <PageAuthor /> },
  { path: "/author-v2/:slug", component: <PageAuthorV2 /> },
  //
  {
    path: "/single-sidebar/:slug",
    component: <PageSingleTemplate3 />,
  },
  {
    path: "/single-template-2/:slug",
    component: <PageSingleTemplate2 />,
  },
  {
    path: "/single-2-sidebar/:slug",
    component: <PageSingleTemp2Sidebar />,
  },
  {
    path: "/single-template-3/:slug",
    component: <PageSingle />,
  },
  {
    path: "/single-3-sidebar/:slug",
    component: <PageSingleHasSidebar />,
  },
  {
    path: "/single-4-sidebar/:slug",
    component: <PageSingleTemp4Sidebar />,
  },
  {
    path: "/posts/:postslug",
    component: <PageSingle />,
  },
  {
    path: "/category/:categoryslug",
    component: <PageArchive />,
  },
  {
    path: "/single-gallery/:slug",
    component: <PageSingleGallery />,
  },
  {
    path: "/single-audio/:slug",
    component: <PageSingleAudio />,
  },
  {
    path: "/single-video/:slug",
    component: <PageSingleVideo />,
  },

  { path: "/search", component: <PageSearchV2 /> },
  { path: "/about", component: <PageAbout /> },
  { path: "/contact", component: <PageContact /> },
  { path: "/page404", component: <Page404 /> },
  { path: "/subscription", component: <PageSubcription /> },
  //
  { path: "/home-demo-2", component: <PageHomeDemo2 /> },
  { path: "/home-demo-3", component: <PageHomeDemo3 /> },
  { path: "/home-demo-4", component: <PageHomeDemo4 /> },
  { path: "/home-demo-5", component: <PageHomeDemo5 /> },
  { path: "/home-demo-6", component: <PageHomeDemo6 /> },
  { path: "/home-demo-7", component: <PageHomeDemo7 /> },
  //
];

export const SubDomainRoutes: FC<SubDomainProps> = ({ data = "" }) => {
  const [user, setUser] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [author, setAuthor] = useState<any>(data.authors);
  const [navigation, setNavigation] = useState<any>(data.nav);
  const [post, setPost] = useState<any>(data.posts);
  const [currentPost, setcurrentPost] = useState<any>(data.currentpost);
  const [error, setError] = useState<any>();

  console.log("currentPost", data)
  console.log("currentPost", currentPost)
  const pathname = useLocation().pathname;

  var initpostRange = 0;
  var finpostRange = 10;
  

  useEffect(() => {
    const urlPath = window.location.pathname;
    window.onpageshow = function(event) {
      if (urlPath.search("/posts/") != -1 && event.persisted) {
        window.location.reload();
      }
    };
  }, [pathname])

  if(error != null) {

    return (
      <>
        <div
          className={`nc-PageSingleTemp4Sidebar relative text-center pt-10 lg:pt-16`}
          data-nc-id="PageSingleTemp4Sidebar"
        >
          {/*  */}
          
            <div className="container relative py-16 lg:py-20">
              {/* HEADER */}
              <header className="text-center max-w-2xl mx-auto space-y-7">
                <h2 className="text-7xl md:text-8xl"></h2>
                <h1 className="text-8xl md:text-9xl font-semibold tracking-widest">
                  ERROR
                </h1>
                <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                  Please check your internet connection & refresh the page
                </span>
              </header>
            </div>
        </div>
      </>
    );

  }else if(author[0].length == 0) {

    return (
      <>
        <div
          className={`nc-PageSingleTemp4Sidebar relative text-center pt-10 lg:pt-16`}
          data-nc-id="PageSingleTemp4Sidebar"
        >
          {/*  */}
          
            <div className="container relative py-16 lg:py-20">
              {/* HEADER */}
              <header className="text-center max-w-2xl mx-auto space-y-7">
                <h2 className="text-7xl md:text-8xl">🪔</h2>
                <h1 className="text-8xl md:text-9xl font-semibold tracking-widest">
                  404
                </h1>
                <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                  THE BLOG YOU WERE LOOKING FOR DOESN&apos;T EXIST.{" "}
                </span>
              </header>
            </div>
        </div>
      </>
    );

  }else {
    return (
      <>
        <MyGlobalContext.Provider
          value={{
            author,
            setAuthor,
            post,
            setPost,
            navigation,
            setNavigation,
            initpostRange,
            finpostRange,
            currentPost,
            setcurrentPost,
          }}
        >
            <ScrollToTop />
            <SubHeaderContainer />
            <Routes>
              {subDomainPages.map(({ component, path, exact }) => {
                return <Route key={path} element={component} path={path} />;
              })}
              <Route element={<Page404 />} />
            </Routes>
            <div>
              <SubFooter username={author[0].username} logo={author[0].logoimg} menus={navigation} />
            </div>
            {/* MEDIA */}
        </MyGlobalContext.Provider>
      </>
    );
  }
};

export const MainRoute = () => {
  const [user, setUser] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  // const authUser = supabaseClient.auth.user();

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    setUser(await supabaseClient.auth.user());
  }

  useEffect(() => {
    //setLoading(true);
    checkUser();

    //setLoading(false);
  }, []);

  // useEffect(() => {
  //   supabaseClient.auth.onAuthStateChange((event) => {
  //     setEvent(event);
  //     setLoading(false);
  //   })
  // }, []);

  if (loading == true) {
    return <div>Loading....</div>;
  } else {
    return (
      <>
        <BrowserRouter basename={import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/" : "/"}>
          <ScrollToTop />
          <HeaderContainer />
          <Routes>
            {mainPages.map(({ component, path, exact }) => {
              return <Route key={path} element={component} path={path} />;
            })}
            <Route element={<Page404 />} />
          </Routes>
          <Footer />
          {/* MEDIA */}
        </BrowserRouter>
      </>
    );
  }
};
