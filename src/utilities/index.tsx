import { useRef, useEffect } from 'react';

export const round = (value: number | undefined): number | undefined => (
  value ? Math.round(value * 10) / 10 : undefined
);

export const degreeDescription = (degrees: number): string => {
  const compassSector = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  return compassSector[parseFloat((degrees / 22.5).toFixed(0)) - 1];
};

// usehooks.com/usePrevious/
export const usePrevious = (value: any): any => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
