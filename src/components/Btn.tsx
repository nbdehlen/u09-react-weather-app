import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  onClick?: any;
  backgroundColor?: string;
  outline?: string;
  color?: string;
  shadow?: boolean;
  titleColor?: string;
  fontWeight?: string;
  borderStyle?: string;
  borderColor?: string;
  hoverBackground?: string;
  fontSize?: string;
}

export const Btn: React.FC<Props> = ({
  onClick,
  children,
  type,
  backgroundColor,
  fontWeight,
  color,
  borderStyle,
  borderColor,
  hoverBackground,
  fontSize,


}: Props) => {
  const defaults: any = {
    type: 'button',
    backgroundColor: 'gray-800',
    fontWeight: 'font-normal',
    color: 'gray-100',
    borderStyle: 'solid',
    borderColor: 'gray-600',
    hoverBackground: 'gray-700',
    fontSize: 'lg',
  };

  return (
    <div>
      <button
        className={`px-2 py-1 m-1 border-2 rounded
        bg-${backgroundColor || defaults.backgroundColor} 
        ${fontWeight ? '' : defaults.fontWeight} 
        text-${color || defaults.color}
        border-${borderStyle || defaults.borderStyle}
        border-${borderColor || defaults.borderColor}
        hover:bg-${hoverBackground || defaults.hoverBackground}
        text-${fontSize || defaults.fontSize}
        `}

        type={type || defaults.type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};


/*
title -> &deg;
type - wrap in another component that forces button type?
onClick på parent div med role och onKey.... ?

*/

// .button {
//   border-top: 1px solid #6f7478;
//   background: #535759;
//   background: -webkit-gradient(linear, left top, left bottom, from(#252729), to(#535759));
//   background: -webkit-linear-gradient(top, #252729, #535759);
//   background: -moz-linear-gradient(top, #252729, #535759);
//   background: -ms-linear-gradient(top, #252729, #535759);
//   background: -o-linear-gradient(top, #252729, #535759);

//   -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
//   -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
//   box-shadow: rgba(0,0,0,1) 0 1px 0;
//   text-shadow: rgba(0,0,0,.4) 0 1px 0;
//   color: #e8e3e8;
//   font-size: 19px;
//   text-decoration: none;
//   vertical-align: middle;
//   }
// .button:hover {
//   border-top-color: #21475e;
//   background: #21475e;
//   color: #ffffff;
//   }
// .button:active {
//   border-top-color: #1b435e;
//   background: #1b435e;
//   }
