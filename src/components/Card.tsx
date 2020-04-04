import React, { ReactNode } from 'react';

interface Props {
  backgroundColor?: string;
  children?: ReactNode;
  color?: string;
  divider?: boolean;
  dividerColor?: string;
  footer?: string;
  shadow?: boolean;
  titleColor?: string;
  title?: string;
  titleSmall?: boolean;
}

export const Card: React.FC<Props> = ({
  backgroundColor,
  children,
  color,
  divider,
  dividerColor,
  footer,
  shadow,
  titleColor,
  title,
  titleSmall,
}: Props) => {
  const defaults: any = {
    backgroundColor: 'gray-900',
    color: 'gray-600',
    dividerColor: 'gray-800',
    titleColor: 'gray-100',
  };

  return (
    <div
      className={`rounded-lg py-5 px-4 bg-${backgroundColor || defaults.backgroundColor} text-${
        color || defaults.color
      } ${shadow ? 'shadow-lg' : ''}`}
    >
      {title ? (
        <header className="mb-2">
          <span className={`uppercase font-bold text-${titleSmall ? 'sm' : 'xl'} text-${titleColor || defaults.titleColor}`}>{title}</span>
        </header>
      ) : ''}
      <div>
        {children}
      </div>
      {footer ? <footer className={`mt-4${divider ? ' py-1 border-t' : ''}${divider ? ` border-${dividerColor || defaults.dividerColor}` : ''}`}>{footer}</footer> : ''}
    </div>
  );
};
