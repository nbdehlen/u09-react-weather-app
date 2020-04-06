import React, { ReactNode } from 'react';

export enum NavbarItemType {
  Button,
  Toggle
}

interface Item {
  className?: string;
  color?: string;
  hoverColor?: string;
  text: ReactNode;
  toggleText?: ReactNode;
  type: NavbarItemType;
  onClick?: () => void;
  underlineColor?: string;
  underlineHoverColor?: string;
  order: number;
}

interface Props {
  backgroundColor?: string;
  borderColor?: string;
  brand?: ReactNode;
  brandColor?: string;
  color?: string;
  fluid?: boolean;
  items: Item[];
  sticky?: boolean;
}

export const Navbar: React.FC<Props> = ({
  backgroundColor,
  brand,
  brandColor,
  color,
  fluid,
  items,
  sticky,
}: Props) => {
  const defaults = {
    backgroundColor: 'transparent',
    brandColor: 'white',
    color: 'gray-400',
    item: {
      underlineColor: 'gray-600',
      underlineHoverColor: 'gray-700',
    },
  };

  const cBrandColor: string = brandColor
    ? ` text-${brandColor}`
    : ` text-${defaults.brandColor}`;
  const cTextColor: string = color
    ? ` text-${color}`
    : ` text-${defaults.color}`;
  const cBgColor: string = backgroundColor
    ? ` bg-${backgroundColor}`
    : ` bg-${defaults.backgroundColor}`;

  return (
    <div
      className={`z-10 ${
        fluid ? '' : 'max-w-screen-xl mx-auto '
      }${sticky ? 'sticky top-0 ' : ''}px-4 flex flex-row flex-wrap items-center${cTextColor}${cBgColor}`}
    >
      <h1
        className={`flex-grow text-xl font-bold tracking-wide uppercase${cBrandColor}`}
      >
        {brand}
      </h1>
      <ul className="flex items-center">
        {items
          .sort((a, b) => a.order - b.order)
          .map((item: Item) => (
            <li key={item.order}>
              {item.type === NavbarItemType.Button ? (
                <button
                  type="button"
                  className={`${item.className} text-md p-4 mr-4 ${
                    item.color ? ` text-${item.color}` : ''
                  }${item.hoverColor ? ` hover:text-${item.hoverColor}` : ''}`}
                  onClick={item.onClick}
                >
                  {item.text}
                </button>
              ) : (
                ''
              )}
              {item.type === NavbarItemType.Toggle ? (
                <>
                  <span className="mr-2">{item.text}</span>
                  <button
                    type="button"
                    className={`${
                      item.className
                    } text-lg text-white border-b-2 transition duration-100 ${
                      item.color ? ` text-${item.color}` : ''
                    }${item.hoverColor ? ` hover:text-${item.hoverColor}` : ''}${
                      item.underlineColor
                        ? ` border-${item.underlineColor}`
                        : ` border-${defaults.item.underlineColor}`
                    }${
                      item.underlineHoverColor
                        ? ` hover:border-${item.underlineHoverColor}`
                        : ` hover:border-${defaults.item.underlineHoverColor}`
                    }`}
                    onClick={item.onClick}
                  >
                    {item.toggleText}
                  </button>
                </>
              ) : (
                ''
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
