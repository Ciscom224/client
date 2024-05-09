import { useState, useEffect } from 'react';

// Code permettant de calculer la taille de la hauteur de la page qu'on utilisera bientot pour la responsive des formulaires du QUIZ
const HeighPage = () => {
  const [distanceFromBottom, setDistanceFromBottom] = useState(10); 

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const distance = windowHeight * 0.1; 
      setDistanceFromBottom(distance);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return distanceFromBottom
    
};

export default HeighPage;