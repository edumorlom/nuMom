import { useState } from 'react';

export const useMapToggle = () => {
  const [mapToggle, setMapToggle] = useState(false);

  const handleMapToggle = () => {
    setMapToggle(prevMapToggle => !prevMapToggle);
  };

  return [mapToggle, handleMapToggle];
};