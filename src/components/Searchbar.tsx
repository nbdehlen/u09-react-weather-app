import React, { ReactNode } from 'react';

interface Props {
  backgroundColor?: string;
  borderColor?: string;
  children?: ReactNode;
  color?: string;
  sticky?: boolean;
}

export const Searchbar: React.FC<any> = (props: any) => {
  const {
    backgroundColor,
    borderColor,
    color,
    children,
    sticky,
  }: Props = props;

  const defaults = {
    backgroundColor: 'gray-900',
    borderColor: 'gray-600',
    color: 'gray-600',
  };

  const cTextColor: string = color
    ? ` text-${color}`
    : ` text-${defaults.color}`;
  const cBgColor: string = backgroundColor
    ? ` bg-${backgroundColor}`
    : ` bg-${defaults.backgroundColor}`;
  const cBorderColor: string = borderColor
    ? ` border-${borderColor}`
    : ` border-${defaults.borderColor}`;

  return (
    <div
      {...props}
      className={`${sticky ? 'sticky ' : ''}sm:m-4 p-4 py-6 flex flex-col flex-wrap items-center sm:rounded${cTextColor}${cBgColor}${cBorderColor}`}
      style={{ top: sticky ? '56px' : '' }}
    >
      {children}
    </div>
  );
};
