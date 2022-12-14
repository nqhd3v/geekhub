import React from "react";
import { IIcon } from "./types";

const In: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={className || 'fill-dark dark:fill-light'}>
    <path d="M512 128v256c0 53.02-42.98 96-96 96h-72c-13.3 0-24-10.7-24-24 0-13.26 10.75-24 24-24h72c26.4 0 48-21.6 48-48V128c0-26.4-21.6-48-48-48h-72c-13.3 0-24-10.75-24-24 0-13.26 10.7-24 24-24h72c53 0 96 42.98 96 96zM367.9 273.9 215.5 407.6c-6.2 5.5-14.2 8.4-22.2 8.4-4.688 0-9.406-.969-13.84-2.969C167.6 407.7 160 396.1 160 383.3V328H40c-22.06 0-40-17.9-40-40v-64c0-22.06 17.94-40 40-40h120v-55.3c0-12.75 7.625-24.41 19.41-29.72 12.09-5.42 26.29-3.29 36.09 5.42L367.9 238c5.2 4.6 8.1 11.1 8.1 18s-2.9 13.4-8.1 17.9zM315.8 256 208 161.1V232H48v48h160v70.03L315.8 256z"/>
  </svg>

);


export default In;