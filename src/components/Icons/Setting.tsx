import React from "react";
import { IIcon } from "./types";

const Setting: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={className || 'fill-dark dark:fill-light'}>
    <path d="M255.1 512c-56.05 0-75.99-11.33-75.99-35.94V436.5c-15.17-6.375-29.35-14.53-42.36-24.41l-34.3 19.78c-4.621 2.703-9.976 4.013-15.36 4.013-36.71 0-76.25-92.87-76.25-108.6 0-10.85 5.806-21.34 15.71-27.07l34.17-19.72c-.2-8.393-.73-16.493-.73-25.393s.531-16.13 1.625-24.47L27.42 211.8c-9.89-5.7-15.69-16.2-15.69-27.1 0-12.58 37.98-108.7 76.2-108.7 5.417 0 10.82 1.338 15.52 4.111L137.6 99.88c13-9.87 27.2-18.03 41.5-24.41V35.91C179.1 4.335 215.7 0 256 0c39.71 0 75.1 4.083 75.1 35.91v39.56c15.17 6.375 29.35 14.53 42.36 24.41l34.3-19.78c4.621-2.703 9.981-4.013 15.37-4.013 36.47 0 76.24 92.55 76.24 108.6 0 10.85-5.806 21.34-15.71 27.07l-34.17 19.72c1.094 8.344 1.625 16.44 1.625 24.47s-.531 16.13-1.625 24.47l34.19 19.75c9.895 5.703 15.7 16.19 15.7 27.05 0 12.59-37.98 108.7-76.21 108.7-5.42 0-10.83-1.338-15.51-4.111l-34.19-19.72c-13.02 9.876-27.19 18.03-42.36 24.41v39.56C332 500.6 312.1 512 255.1 512zM140.9 373.2c35.92 30.82 52.34 34.36 71.05 41v61.85c14.11 2.344 28.82 3.727 43.76 3.727 14.95 0 30.13-1.383 45.19-4.571l-.953-61c16.07-5.702 35.18-10.22 71.05-41l53.61 30.97c18.78-22.06 33.77-47.97 43.39-76.57l-52.94-30.56c2.745-14.99 4.859-25.43 4.859-39.07 0-10.95-1.364-23.97-4.86-43.06l53.46-30.85c-9.828-27.75-24.92-53.97-45.1-76.72l-52.43 31.41c-35.92-30.82-52.34-34.36-71.05-41V35.91c-14.11-2.344-28.82-3.727-43.76-3.727-14.95 0-30.13 1.383-45.19 4.571l.954 61C195.9 103.5 176.8 107.1 140.9 138.8l-53.57-31c-18.99 22.31-34.08 48.53-43.69 77.47l53.24 29.66c-2.74 14.97-4.86 25.47-4.86 38.17 0 10.95 1.364 23.97 4.859 43.06l-53.46 30.85c9.829 27.75 24.92 53.97 45.1 76.72L140.9 373.2zM256 351.1c-52.94 0-96-43.06-96-96s43.1-96 96-96 96 43.06 96 96-43.1 96-96 96zm0-160c-35.3 0-64 28.72-64 64s28.7 64 64 64 64-28.72 64-64-28.7-64-64-64z"/>
  </svg>

);

export default Setting;