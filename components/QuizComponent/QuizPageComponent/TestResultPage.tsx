'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ResultDynamicComponent from '@/components/QuizComponent/QuizPageComponent/ResultDynamicComponent';

const TestResultPage = () => {
  const params = useParams();
  
  const { resultType, uuid } = params;

  // Ensure the parameters are correctly parsed
  if (!resultType || !uuid) {
    return <p>Loading...</p>;
  }

  console.log('Route Params:', resultType, uuid);

  return (
    <div className="bg-bgPrimaryLight">
      <ResultDynamicComponent />
    </div>
  );
};

export default TestResultPage;
