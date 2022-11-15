import React from "react";
import { IIcon } from "./types";

const Ellipsis: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={className || 'fill-dark dark:fill-light'}>
    <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm-288 0c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48zm192 0c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48z"/>
  </svg>

);

export default Ellipsis;