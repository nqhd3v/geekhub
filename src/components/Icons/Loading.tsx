import React from "react";
import { IIcon } from "./types";

const Loading: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={`animate-spin ${className || ''}`}>
    <path d="M512 256c0 36.59-7.83 71.34-21.77 102.8-5.834 13.17-21.64 18.65-34.15 11.5-10.5-5.996-15.06-18.94-10.12-29.98A205.72 205.72 0 0 0 464 256c0-107.7-82.26-196.5-187.2-206.1-12-2.06-20.8-12.56-20.8-24.54 0-14.52 12.8-25.45 27.23-23.92C411.6 15.08 512 124 512 256z"/>
  </svg>
);

export default Loading;