import React from "react";
import { IIcon } from "./types";

const Check: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={className || 'fill-dark dark:fill-light'}>
    <path d="m480.1 128.1-272 272c-3.8 5.6-9.9 7.9-16.1 7.9s-12.28-2.344-16.97-7.031l-144-144c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L192 350.1l255-255c9.375-9.375 24.56-9.375 33.94 0s9.36 24.5-.84 33z"/>
  </svg>
);

export default Check;