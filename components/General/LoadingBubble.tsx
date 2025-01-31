import React from 'react';
import Lottie from 'lottie-react';
import animationData from './loadingchat.json'; // Path to your JSON file

export const LoadingBubble = () => {
  return (
    <Lottie 
      animationData={animationData} 
      loop 
      autoplay 
      
    />
  );
};
