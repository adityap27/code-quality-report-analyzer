import React from 'react';
import { useLocation } from 'react-router-dom';

const display = () => {
  const location = useLocation();
  const { analysisData } = location.state;

  return (
    <div>
    
    </div>
  );
};

export default display;