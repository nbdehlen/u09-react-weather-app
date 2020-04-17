import React, { ReactNode } from 'react';

interface Props {
  backgroundColor?: string;
  children?: ReactNode;
  color?: string;
  divider?: boolean;
  dividerColor?: string;
  footer?: string;
  fullHeight?: boolean;
  shadow?: boolean;
  titleColor?: string;
  title?: ReactNode;
  titleSmall?: boolean;
}

export const Card: React.FC<Props> = ({
  backgroundColor,
  children,
  color,
  divider,
  dividerColor,
  footer,
  fullHeight,
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
      className={`${fullHeight ? 'h-full' : ''} rounded-lg py-4 px-5 bg-${backgroundColor || defaults.backgroundColor} text-${
        color || defaults.color
      } ${shadow ? 'shadow-lg' : ''}`}
    >
      {title ? (
        <header className="mb-4">
          <div className={`uppercase font-bold text-${titleSmall ? 'sm' : 'xl'} text-${titleColor || defaults.titleColor}`}>
            {title}
          </div>
        </header>
      ) : ''}
      <div>
        {children}
      </div>
      {footer ? <footer className={`mt-4${divider ? ' py-1 border-t' : ''}${divider ? ` border-${dividerColor || defaults.dividerColor}` : ''}`}>{footer}</footer> : ''}
    </div>
  );
};
