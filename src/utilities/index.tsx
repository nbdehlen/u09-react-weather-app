export const round = (value: number | undefined): number | undefined => (
  value ? Math.round(value * 10) / 10 : undefined
);

export const degreeDescription = (degrees: number | undefined): string | undefined => {
  const compassSector = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  return degrees ? compassSector[parseFloat((degrees / 22.5).toFixed(0)) - 1] : undefined;
};
