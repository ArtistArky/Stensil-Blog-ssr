import React, { useState, useEffect, FC, HTMLAttributes, ReactNode  } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import SubLogo from "components/Logo/SubLogo";

export interface AppServerProps {
  data?: any;
}

export interface MainNav1Props {
  logoimg: string;
  username: string;
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  desc?: string;
  title?: string;
  isCenter?: boolean;
}

export interface LoadingProps {
  size?: number;
}

const ServerNav: FC<MainNav1Props> = ({logoimg, username}) => { 
  return (
    <div>
        <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
          <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
            {
              logoimg == null ? 
              <h2 className={`text-1xl md:text-2xl font-semibold`}>{username.toUpperCase()}</h2>
              :
              <SubLogo img={logoimg} />
            }
          </div>
        </div>
    </div>
  )
}

const ServerHeader: FC<HeadingProps> = ({
  desc,
  title = "Inkflow",
  className = "mt-20 text-neutral-900 dark:text-neutral-50",
  isCenter = true,
}) => { 
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto " : "max-w-2xl"
        }
      >
        <h2 className={`text-3xl md:text-5xl font-semibold`}>
          {title}
        </h2>
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    </div>
  )
}

const ServerLoading: FC<LoadingProps> = ({ size = 30 }) => { 
  return (
     <div
       className={`flex justify-center align-center pt-5 lg:pt-10`}
     >
       <div className="flex justify-center align-center">
         <CircularProgress size={size} /> 
       </div>
     </div>
  )
}

const AppSever: FC<AppServerProps> = ({ data = "" }) => {
  const { content } = data;

  return (
    
    <div className="justify-center align-center bg-white text-base h-full w-full dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ServerNav logoimg={content[0].logoimg} username={content[0].username}/>
        <div className="text-center">
          <ServerHeader desc={data.url === 'authors' ? content[0].description : null} title={content[0].title} />
        </div>
        <ServerLoading /> 
    </div>
  );
}

export default AppSever;
