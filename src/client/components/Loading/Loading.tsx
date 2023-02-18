import React, { FC } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export interface LoadingProps {
  size?: number;
}

const Loading: FC<LoadingProps> = ({ size = 30 }) => { 
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

export default Loading;