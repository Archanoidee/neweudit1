import { FC } from "react";

const IconBell: FC<React.SVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="20"
    fill="none"
    viewBox="0 0 16 20"
    {...props}
  >
    <path
      fill="#284B80"
      d="M8 20c1.1 0 2-.9 2-2H6a2 2 0 0 0 2 2m6-6V9c0-3.07-1.64-5.64-4.5-6.32V2C9.5 1.17 8.83.5 8 .5S6.5 1.17 6.5 2v.68C3.63 3.36 2 5.92 2 9v5l-2 2v1h16v-1z"
    ></path>
  </svg>
);

export default IconBell;
