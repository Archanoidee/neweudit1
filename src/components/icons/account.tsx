import { FC } from "react";

const IconAccount: FC<React.SVGAttributes<SVGSVGElement>> = (props) => (
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
      d="M8 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v8.5h16V14c0-2.66-5.33-4-8-4"
    ></path>
  </svg>
);

export default IconAccount;
