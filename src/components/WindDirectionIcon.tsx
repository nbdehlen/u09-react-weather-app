import React from 'react';
import { WiDirectionUp } from 'react-icons/wi';

interface Props {
  degree: number;
  big?: boolean;
}

export const WindDirectionIcon: React.FC<Props> = ({ degree, big }: Props) => (
  <WiDirectionUp
    className={big ? 'w-8 h-8' : 'w-6 h-6'}
    style={{ transform: `rotateZ(${degree}deg)` }}
  />
);
