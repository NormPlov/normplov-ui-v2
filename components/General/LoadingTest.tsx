// import React from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// export const LoadingTest = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/ae1fd94b-b29c-44e2-8733-41edb9066395/BmXhGjCuWR.lottie"
//       loop
//       autoplay
//     />
//   );
// };

import React from 'react';
import Lottie from 'lottie-react';
import animationData from './LoadingReport2.json'; // Path to your JSON file

export const LoadingTest = () => {
  return (
    <Lottie 
      animationData={animationData} 
      loop 
      autoplay 
      
    />
  );
};

