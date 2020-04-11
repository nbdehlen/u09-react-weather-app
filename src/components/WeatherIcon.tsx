import React from 'react';
import { API_ICON_URL } from '../services/api';

interface Props {
  icon: string;
  alt?: string;
  className?: string;
  big?: boolean;
}

export const WeatherIcon: React.FC<Props> = ({
  alt, big, className, icon,
}: Props) => (
  <img
    src={`${API_ICON_URL}/${icon}${big ? '@2x' : ''}.png`}
    className={className}
    alt={alt}
  />
);
