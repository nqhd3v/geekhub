import React from "react";
import { IIcon } from "./types";

const Edit: React.FC<IIcon> = ({ color, size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size || 50} height={size || 50} fill={color || '#192428'} className={className || 'fill-dark dark:fill-light'}>
    <path d="m495.6 49.23-32.82-32.82C451.8 5.471 437.5 0 423.1 0c-14.33 0-28.66 5.469-39.6 16.41l-216 216.09c-8.4 7.5-12.7 17-15.1 27.3l-24.1 107.4c-1.8 8.9 5.1 16.8 12.8 16.8.916 0 1.852-.092 2.797-.281 0 0 74.03-15.71 107.4-23.56 10.1-2.377 19.13-7.46 26.46-14.79l217-217C517.5 106.5 517.4 71.1 495.6 49.23zM461.7 94.4l-217 217c-1.1 1.1-2.2 1.7-3.5 2-13.7 3.227-34.65 7.857-54.3 12.14l12.41-55.2c.29-1.44.99-2.84 2.09-3.84L417.5 50.4c1.9-1.99 4.1-2.4 5.6-2.4s3.715.406 5.65 2.342l32.82 32.83c3.23 3.168 3.23 8.098.13 11.228zM424 288c-13.25 0-24 10.75-24 24v128c0 13.23-10.78 24-24 24H72c-13.22 0-24-10.77-24-24V136c0-13.23 10.78-24 24-24h144c13.25 0 24-10.75 24-24s-10.7-24-24-24l-144.9-.01C32.31 63.99 0 96.29 0 135.1v304C0 479.7 32.31 512 71.1 512h303.1c39.69 0 71.1-32.3 71.1-72l2.7-128c0-13.2-10.7-24-24-24z"/>
  </svg>
);

export default Edit;