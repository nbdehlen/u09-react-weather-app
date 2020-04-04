import React from 'react';

interface Props {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  focusBackgroundColor?: string;
  focusColor?: string;
  placeholderColor?: string;
}

export const InputField: React.FC<any> = (props: any) => {
  const {
    backgroundColor,
    borderColor,
    color,
    focusBackgroundColor,
    focusColor,
    placeholderColor,
  }: Props = props;

  const defaults = {
    backgroundColor: 'gray-700',
    borderColor: 'gray-600',
    color: 'gray-200',
    focusBackgroundColor: 'black',
    focusColor: 'gray-200',
    placeholderColor: 'gray-100',
  };

  const cTextColor: string = color
    ? `text-${color}`
    : `text-${defaults.color}`;
  const cBgColor: string = backgroundColor
    ? `bg-${backgroundColor}`
    : `bg-${defaults.backgroundColor}`;
  const cBorderColor: string = borderColor
    ? `border-${borderColor}`
    : `border-${defaults.borderColor}`;
  const cPlaceholderColor: string = placeholderColor
    ? `placeholder-${placeholderColor}`
    : `border-${defaults.placeholderColor}`;
  const cFocusBackgroundColor: string = focusBackgroundColor
    ? `focus:bg-${focusBackgroundColor}`
    : `focus:bg-${defaults.focusBackgroundColor}`;
  const cFocusColor: string = focusColor
    ? `focus:text-${focusColor}`
    : `focus:text-${defaults.focusColor}`;

  return (
    <input
      {...props}
      className={`${cTextColor} ${cBgColor} ${cBorderColor} ${cPlaceholderColor} border shadow rounded appearance-none w-full py-2 px-3 leading-tight ${cFocusBackgroundColor} ${cFocusColor} focus:outline-none focus:shadow-outline focus:placeholder-transparent transition duration-100 ease-in`}
    />
  );
};
