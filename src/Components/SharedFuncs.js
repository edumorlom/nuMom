import { useState } from 'react';

export const useMapToggle = () => {
  const [mapToggle, setMapToggle] = useState(true);

  const handleMapToggle = () => {
    setMapToggle(prevMapToggle => !prevMapToggle);
  };

  return [mapToggle, handleMapToggle];
};