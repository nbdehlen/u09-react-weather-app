import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: any) => void;
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
  className?: string;
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
  className,


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
    <button
      className={`px-2 py-1 border-2 rounded
        bg-${backgroundColor || defaults.backgroundColor} 
        ${fontWeight ? '' : defaults.fontWeight} 
        text-${color || defaults.color}
        border-${borderStyle || defaults.borderStyle}
        border-${borderColor || defaults.borderColor}
        hover:bg-${hoverBackground || defaults.hoverBackground}
        text-${fontSize || defaults.fontSize} 
        ${className}
      `}
      type={type || defaults.type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
