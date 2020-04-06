export const round = (value: number) => (
  value ? Math.round(value * 10) / 10 : null
);
