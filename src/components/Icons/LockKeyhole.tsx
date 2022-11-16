import React from "react";
import { IIcon } from "./types";

const LockKeyhole: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={className || 'fill-dark dark:fill-light'}>
    <path d="M384 192h-32v-64.9C352 56.52 294.58 0 224 0S96 57.42 96 127.1V192H64c-35.35 0-64 28.7-64 64v191.1c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V256c0-35.3-28.7-64-64-64zm-240-64c0-44.11 35.89-80 80-80s80 35.89 80 80v64H144v-64zm256 320c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V256c0-8.822 7.178-16 16-16h320c8.822 0 16 7.178 16 16v192zM224 304c-13.25 0-24 10.75-24 24v48c0 13.25 10.75 23.1 24 23.1s24-9.8 24-23.1v-48c0-13.2-10.7-24-24-24z"/>
  </svg>
);


export default LockKeyhole;