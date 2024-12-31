// 'use client';
// import React, { useEffect, useState,useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson, // Key matches the normalized draftType
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw = typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   const draftType = draftTypeRaw === 'values' ? 'value' : draftTypeRaw; // Normalize 'values' to 'value'
//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   console.log('Params:', params);
//   console.log('Draft Type:', draftType);

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });
//   console.log('Data:', data);

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>({});
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

//   const quizData = quizDataMap[draftType] || null; // Fetch quiz data based on normalized draftType
//   console.log('Quiz Data:', quizData);

//  // Track the previous responses with useRef
//  const prevResponsesRef = useRef<any>(null);

//  useEffect(() => {
//    const responses = data?.payload?.response_data?.responses;

//    // Only update if responses are different from the previous ones
//    if (responses && JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)) {
//      setUserResponses(responses);
//      const completed = Object.keys(responses).map((_, index) => index);
//      setCompletedQuestions(completed);

//      prevResponsesRef.current = responses; // Store the current responses in ref
//    }
//  }, [data]);
//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round((Object.keys(userResponses).length / totalQuestions) * 100);

//   const handleAnswer = (question: string, response: number) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.question] ?? null}
//             updateCompletedQuestions={(index) => {
//               if (!completedQuestions.includes(index)) {
//                 setCompletedQuestions((prev) => [...prev, index]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }
// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw = typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   const draftType = draftTypeRaw === 'values' ? 'value' : draftTypeRaw;
//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>({});
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;
//     if (responses && JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)) {
//       setUserResponses(responses);
//       const completed = Object.keys(responses).map((_, index) => index);
//       setCompletedQuestions(completed);
//       prevResponsesRef.current = responses;
//     }
//   }, [data]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round((Object.keys(userResponses).length / totalQuestions) * 100);

//   const handleAnswer = (question: string, response: number) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.question] ?? null}
//             updateCompletedQuestions={(index) => {
//               if (!completedQuestions.includes(index)) {
//                 setCompletedQuestions((prev) => [...prev, index]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }

// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw = typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   const draftType = draftTypeRaw === 'values' ? 'value' : draftTypeRaw;
//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>({});
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());  // Track answered questions

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;
//     if (responses && JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)) {
//       setUserResponses(responses);
//       const completed = Object.keys(responses).map((_, index) => index);
//       setCompletedQuestions(completed);
//       setAnsweredQuestions(new Set(completed));  // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round((Object.keys(userResponses).length / totalQuestions) * 100);

//  const handleAnswer = (question: string, response: number, questionIndex: number) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//     setAnsweredQuestions(prev => new Set(prev.add(questionIndex)));  // Mark the question index as answered
// };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.question] ?? null}
//             isAnswered={answeredQuestions.has(index)}  // Pass if the question is answered
//             updateCompletedQuestions={(index) => {
//               if (!completedQuestions.includes(index)) {
//                 setCompletedQuestions((prev) => [...prev, index]);
//               }
//             }}
//             handleAnswer={}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }

// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw = typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   // const draftType = draftTypeRaw === 'values' ? 'value' : draftTypeRaw;
//    // Normalize the draftType
//    const draftType = draftTypeRaw
//    .replace(/s$/, '')
//    .replace(' ', '').toLowerCase();          // Remove plural 's' if exists (e.g., "interests" → "interest")
//   //  .replace('learning style', 'learningstyle'); // Convert "learning style" (with space) to "learningstyle"
//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>({});
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());  // Track answered questions

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;
//     if (responses && JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)) {
//       setUserResponses(responses);
//       const completed = Object.keys(responses).map((_, index) => index);
//       setCompletedQuestions(completed);
//       setAnsweredQuestions(new Set(completed));  // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round((Object.keys(userResponses).length / totalQuestions) * 100);

//   const handleAnswer = (question: string, response: number, questionIndex: number) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//     setAnsweredQuestions(prev => new Set(prev.add(questionIndex)));  // Mark the question index as answered
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.question] ?? null}
//             isAnswered={answeredQuestions.has(index)}  // Pass if the question is answered
//             updateCompletedQuestions={(index) => {
//               if (!completedQuestions.includes(index)) {
//                 setCompletedQuestions((prev) => [...prev, index]);
//               }
//             }}
//             handleAnswer={handleAnswer}  // Pass the updated handleAnswer
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }

// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw = typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   // Normalize the draftType
//   const draftType = draftTypeRaw
//     .replace(/s$/, '') // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(' ', '') // Remove any spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();

//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>({});
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());  // Track answered questions

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;
//     if (responses && JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)) {
//       setUserResponses(responses);
//       const completed = Object.keys(responses).map((_, index) => index);
//       setCompletedQuestions(completed);
//       setAnsweredQuestions(new Set(completed));  // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round((Object.keys(userResponses).length / totalQuestions) * 100);

//   const handleAnswer = (question: string, response: number, questionIndex: number) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//     setAnsweredQuestions(prev => new Set(prev.add(questionIndex)));  // Mark the question index as answered
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}  // Ensure questionIndex is passed as the correct index
//             defaultValue={userResponses[q.question] ?? null}
//             isAnswered={answeredQuestions.has(index)}  // Pass if the question is answered
//             updateCompletedQuestions={(index) => {
//               if (!completedQuestions.includes(index)) {
//                 setCompletedQuestions((prev) => [...prev, index]);
//               }
//             }}
//             handleAnswer={handleAnswer}  // Pass the updated handleAnswer
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }

// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw = typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   // Normalize the draftType
//   const draftType = draftTypeRaw
//     .replace(/s$/, '') // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(' ', '') // Remove any spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();

//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>({});
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());  // Track answered questions

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;
//     if (responses && JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)) {
//       setUserResponses(responses);
//       const completed = Object.keys(responses).map((_, index) => index);
//       setCompletedQuestions(completed);
//       setAnsweredQuestions(new Set(completed));  // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round((Object.keys(userResponses).length / totalQuestions) * 100);

//   const handleAnswer = (question: string, response: number, questionIndex: number) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//     setAnsweredQuestions(prev => new Set(prev.add(questionIndex)));  // Mark the question index as answered
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//           key={index}
//           question={q.question}
//           questionIndex={index} // Pass the index
//           defaultValue={userResponses[q.question] ?? null} // Prefill with user's response if exists
//           isAnswered={answeredQuestions.has(index)} // Check if the question is answered
//           updateCompletedQuestions={(idx) => {
//             if (!completedQuestions.includes(idx)) {
//               setCompletedQuestions((prev) => [...prev, idx]);
//             }
//           }}
//           handleAnswer={handleAnswer} // Pass the answer handler
//         />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }
// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw =
//     typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   const draftType = draftTypeRaw
//     .replace(/s$/, '') // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(' ', '') // Remove spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();

//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
//     new Set()
//   );

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;

//     if (
//       responses &&
//       JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
//     ) {
//       setUserResponses(responses);

//       // Map response keys (e.g., q11, q12) to their corresponding question indices
//       const completed = quizData.questions
//         .map((q, index) => (responses[q.category] !== undefined ? index : null))
//         .filter((index) => index !== null) as number[];

//       setCompletedQuestions(completed);
//       setAnsweredQuestions(new Set(completed)); // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data, quizData]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   const totalQuestions = quizData.questions.length;
//   const progress = Math.round(
//     (Object.keys(userResponses).length / totalQuestions) * 100
//   );

//   const handleAnswer = (
//     question: string,
//     response: number,
//     questionIndex: number
//   ) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//     setAnsweredQuestions((prev) => new Set(prev.add(questionIndex))); // Mark the question index as answered
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.category] ?? null}
//             isAnswered={answeredQuestions.has(index)}
//             updateCompletedQuestions={(idx) => {
//               if (!completedQuestions.includes(idx)) {
//                 setCompletedQuestions((prev) => [...prev, idx]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }
// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { Progress } from '@/components/ui/progress';
// import { QuizQuestionContainer } from '@/components/QuizComponent/QuizDraftQuestionContainer';
// import { QuizButton } from '@/components/QuizComponent/QuizButton';
// import { ArrowRight, ArchiveRestore } from 'lucide-react';
// import { toast } from 'react-toastify';
// import Loading from '@/components/General/Loading';
// import { useGetUserDraftDetailsQuery } from '@/redux/service/draft';
// import personalityJson from '@/app/(user)/json/personalityKh.json';
// import skillJson from '@/app/(user)/json/skillKh.json';
// import interestJson from '@/app/(user)/json/interestKh.json';
// import valueJson from '@/app/(user)/json/valueKh.json';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json';

// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const params = useParams();
//   const draftTypeRaw =
//     typeof params?.draftType === 'string' ? params.draftType.toLowerCase() : '';
//   const draftType = draftTypeRaw
//     .replace(/s$/, '') // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(' ', '') // Remove spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();

//   const uuid = typeof params?.uuid === 'string' ? params.uuid : '';

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
//     new Set()
//   );

//   const quizData = quizDataMap[draftType] || null;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data?.responses;

//     if (
//       responses &&
//       JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
//     ) {
//       setUserResponses(responses);

//       // Map response keys (e.g., q11, q12) to their corresponding question indices
//       const completed = quizData.questions
//         .map((q, index) => (responses[q.category] !== undefined ? index : null))
//         .filter((index) => index !== null) as number[];

//       setCompletedQuestions(completed);
//       setAnsweredQuestions(new Set(completed)); // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data, quizData]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   // Update progress logic to dynamically calculate based on answered questions
//   const totalQuestions = quizData.questions.length;
//   const progress = totalQuestions > 0
//     ? Math.round((Object.keys(userResponses).length / totalQuestions) * 100)
//     : 0;

//   const handleAnswer = (
//     question: string,
//     response: number,
//     questionIndex: number
//   ) => {
//     setUserResponses((prev) => ({ ...prev, [question]: response }));
//     setAnsweredQuestions((prev) => new Set(prev.add(questionIndex))); // Mark the question index as answered
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.category] ?? null}
//             isAnswered={answeredQuestions.has(index)}
//             updateCompletedQuestions={(idx) => {
//               if (!completedQuestions.includes(idx)) {
//                 setCompletedQuestions((prev) => [...prev, idx]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="Save Draft"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={() => toast.success('Draft saved successfully!')}
//         />
//         <QuizButton
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={() => toast.success('Responses submitted successfully!')}
//         />
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "next/navigation";
// import { Progress } from "@/components/ui/progress";
// import { QuizQuestionContainer } from "@/components/QuizComponent/QuizDraftQuestionContainer";
// import { QuizButton } from "@/components/QuizComponent/QuizButton";
// import { QuizButtonDisable } from "../QuizButtonDisable";
// import { ArrowRight, ArchiveRestore } from "lucide-react";
// import { toast } from "react-toastify";
// import Loading from "@/components/General/Loading";
// import {
//   useGetUserDraftDetailsQuery,
//   useSaveDraftAgainMutation,
//   useSaveDraftSubmittingMutation,
// } from "@/redux/service/draft";
// import personalityJson from "@/app/(user)/json/personalityKh.json";
// import skillJson from "@/app/(user)/json/skillKh.json";
// import interestJson from "@/app/(user)/json/interestKh.json";
// import valueJson from "@/app/(user)/json/valueKh.json";
// import learningStyleJson from "@/app/(user)/json/learningStyleKh.json";
// import { useRouter } from "next/navigation";
// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const router = useRouter();
//   const [saveDraftAgain] = useSaveDraftAgainMutation();
//   const [saveDraftSubmitting] = useSaveDraftSubmittingMutation();
//   const params = useParams();
//   const draftTypeRaw =
//     typeof params?.draftType === "string" ? params.draftType.toLowerCase() : "";
//   const draftType = draftTypeRaw
//     .replace(/s$/, "") // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(" ", "") // Remove spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();

//   const uuid = typeof params?.uuid === "string" ? params.uuid : "";

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
//     new Set()
//   );

//   const quizData = quizDataMap[draftType] || null;
//   const isQuizComplete =
//     completedQuestions.length === quizData.questions.length;

//   const prevResponsesRef = useRef<any>(null);

//   useEffect(() => {
//     const responses = data?.payload?.response_data;

//     if (
//       responses &&
//       JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
//     ) {
//       setUserResponses(responses);

//       // Dynamically map responses to their question indices
//       const completed = quizData?.questions
//         ?.map((q, index) =>
//           responses[q.category] !== undefined ? index : null
//         )
//         .filter((index) => index !== null) as number[];

//       setCompletedQuestions(completed || []);
//       setAnsweredQuestions(new Set(completed || [])); // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data, quizData]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   // Update progress logic to dynamically calculate based on answered questions
//   const totalQuestions = quizData.questions.length;
//   const progress =
//     totalQuestions > 0
//       ? Math.round((completedQuestions.length / totalQuestions) * 100)
//       : 0;
//   const handleAnswer = (
//     question: string,
//     response: number,
//     questionIndex: number
//   ) => {
//     const category = quizData?.questions[questionIndex]?.category;
//     if (!category) {
//       console.error(`Category not found for questionIndex: ${questionIndex}`);
//       return;
//     }

//     setUserResponses((prev) => {
//       const updatedResponses = { ...prev, [category]: response };
//       console.log("Updated Responses:", updatedResponses); // Debugging
//       return updatedResponses;
//     });

//     setAnsweredQuestions((prev) => {
//       const updatedSet = new Set(prev);
//       updatedSet.add(questionIndex);
//       return updatedSet;
//     });
//   };
//   // const handleSubmitQuiz = async () => {
//   //   const totalQuestions = quizData.questions.length;
  
//   //   if (completedQuestions.length < totalQuestions) {
//   //     toast.error("Please complete all questions before submitting.");
//   //     return;
//   //   }
  
//   //   try {
//   //     if (!uuid) {
//   //       toast.error("Draft ID not found!");
//   //       return;
//   //     }
  
//   //     // Prepare the request body with ordered responses
//   //     const orderedResponses = quizData.questions.reduce<Record<string, number>>(
//   //       (acc, question) => {
//   //         const category = question.category;
//   //         if (userResponses[category] !== undefined) {
//   //           acc[category] = userResponses[category];
//   //         }
//   //         return acc;
//   //       },
//   //       {}
//   //     );
//   //     console.log("Ordered Responses for Submission:", orderedResponses);
//   //     const body = {
//   //       responses: orderedResponses,
//   //     };
  
//   //     console.log("Submitting Ordered Quiz Responses:", body.responses); // Debugging
  
//   //     // Call the API to submit the quiz
//   //     const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
//   //     if (response.status === 200) {
//   //       toast.success("Quiz submitted successfully!");
//   //       const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//   //         response.payload;
  
//   //       // Navigate to the test results page
//   //       router.push(`/test-result/${assessmentType}/${testUuid}`);
//   //     } else {
//   //       toast.error("Failed to submit quiz. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error while submitting quiz:", error);
//   //     toast.error("An error occurred while submitting the quiz.");
//   //   }
//   // };
  
//   const handleSubmitQuiz = async () => {
//     const totalQuestions = quizData.questions.length;
  
//     if (completedQuestions.length < totalQuestions) {
//       toast.error("Please complete all questions before submitting.");
//       return;
//     }
  
//     try {
//       if (!uuid) {
//         toast.error("Draft ID not found!");
//         return;
//       }
  
//       // Build strictly ordered responses
//       const orderedResponses = quizData.questions.reduce<Record<string, number>>(
//         (acc, question) => {
//           const category = question.category;
//           acc[category] = userResponses[category] ?? 1; // Use default value if undefined
//           return acc;
//         },
//         {}
//       );
  
//       const body = {
//         responses: orderedResponses,
//       };
  
//       console.log("Submitting Ordered Quiz Responses:", body.responses);
  
//       // Call the API to submit the quiz
//       const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
//       if (response.status === 200) {
//         toast.success("Quiz submitted successfully!");
  
//         const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//           response.payload;
  
//         // Navigate to the results page dynamically
//         try {
//           router.push(`/test-result/${assessmentType.toLowerCase()}/${testUuid}`);
//         } catch (err) {
//           console.error("Navigation failed:", err);
//           toast.error("Failed to navigate to the results page.");
//         }
//       } else {
//         toast.error("Failed to submit quiz. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error while submitting quiz:", error);
//       toast.error("An error occurred while submitting the quiz.");
//     }
//   };
  
  
  

//   const handleSaveDraftAgain = async () => {
//     try {
//       if (!uuid) {
//         toast.error("Draft ID not found!");
//         return;
//       }

//       // Use the updated `userResponses` directly
//       const body = {
//         responses: userResponses,
//       };

//       console.log("Transformed Responses:", body.responses); // Debugging

//       const response = await saveDraftAgain({ uuid, body }).unwrap();

//       if (response.status === 200) {
//         toast.success("Draft saved successfully!");
//       } else {
//         toast.error("Failed to save draft. Please try again.");
//       }
//       router.push(`/test`);
//     } catch (error) {
//       console.error("Error while saving draft:", error);
//       toast.error("An error occurred while saving the draft.");
//     }
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.category] ?? null}
//             isAnswered={answeredQuestions.has(index)}
//             updateCompletedQuestions={(idx) => {
//               if (!completedQuestions.includes(idx)) {
//                 setCompletedQuestions((prev) => [...prev, idx]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="តេស្តពេលក្រោយ"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={handleSaveDraftAgain}
//         />
//         {/* <QuizButtonDisable
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={handleSubmitQuiz}
//           disabled={!isQuizComplete}
//           className={`${
//             !isQuizComplete
//               ? 'bg-primary text-white cursor-not-allowed'
//               : 'bg-primary text-white hover:bg-green-500'
//           } transition duration-300 ease-in-out px-4 py-2 rounded-xl`}
//         /> */}
//         <QuizButtonDisable
//           title="លទ្ធផល"
//           type="rightIcon"
//           rounded="xl"
//           icon={<ArrowRight />}
//           onClick={handleSubmitQuiz}
//           disabled={!isQuizComplete} // Disable when the quiz is incomplete
//          className="bg-primary"
//         />
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "next/navigation";
// import { Progress } from "@/components/ui/progress";
// import { QuizQuestionContainer } from "@/components/QuizComponent/QuizDraftQuestionContainer";
// import { QuizButton } from "@/components/QuizComponent/QuizButton";
// import { QuizButtonDisable } from "../QuizButtonDisable";
// import { ArrowRight, ArchiveRestore } from "lucide-react";
// import { toast } from "react-toastify";
// import Loading from "@/components/General/Loading";
// import {
//   useGetUserDraftDetailsQuery,
//   useSaveDraftAgainMutation,
//   useSaveDraftSubmittingMutation,
// } from "@/redux/service/draft";
// import personalityJson from "@/app/(user)/json/personalityKh.json";
// import skillJson from "@/app/(user)/json/skillKh.json";
// import interestJson from "@/app/(user)/json/interestKh.json";
// import valueJson from "@/app/(user)/json/valueKh.json";
// import learningStyleJson from "@/app/(user)/json/learningStyleKh.json";
// import { useRouter } from "next/navigation";
// type QuizData = {
//   questions: { question: string; category: string }[];
// };

// const quizDataMap: Record<string, QuizData> = {
//   personality: personalityJson,
//   skill: skillJson,
//   interest: interestJson,
//   value: valueJson,
//   learningstyle: learningStyleJson,
// };

// export default function QuizDynamicDraftComponent() {
//   const router = useRouter();
//   const [saveDraftAgain] = useSaveDraftAgainMutation();
//   const [saveDraftSubmitting] = useSaveDraftSubmittingMutation();
//   const params = useParams();
//   const draftTypeRaw =
//     typeof params?.draftType === "string" ? params.draftType.toLowerCase() : "";
//   const draftType = draftTypeRaw
//     .replace(/s$/, "") // Remove plural 's' (e.g., "interests" → "interest")
//     .replace(" ", "") // Remove spaces (e.g., "learning style" → "learningstyle")
//     .toLowerCase();

//   const uuid = typeof params?.uuid === "string" ? params.uuid : "";

//   const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

//   const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
//     {}
//   );
//   const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
//     new Set()
//   );
//   const prevResponsesRef = useRef<{ [key: string]: number } | null>(null);
//   // const quizData = quizDataMap[draftType] || null;
//   const quizData = quizDataMap[draftType] as QuizData | null;

//   // const isQuizComplete =
//   //   completedQuestions.length === quizData.questions.length;
//   const isQuizComplete =
//   quizData !== null && completedQuestions.length === quizData.questions.length;


   


//   useEffect(() => {
//     const responses = data?.payload?.response_data;

//     if (
//       responses &&
//       JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
//     ) {
//       setUserResponses(responses);

//       // Dynamically map responses to their question indices
//       const completed = quizData?.questions
//         ?.map((q, index) =>
//           responses[q.category] !== undefined ? index : null
//         )
//         .filter((index) => index !== null) as number[];

//       setCompletedQuestions(completed || []);
//       setAnsweredQuestions(new Set(completed || [])); // Mark these questions as answered
//       prevResponsesRef.current = responses;
//     }
//   }, [data, quizData]);

//   if (isLoading) return <Loading />;
//   if (error || !quizData) return <p>Quiz data not found.</p>;

//   // Update progress logic to dynamically calculate based on answered questions
//   const totalQuestions = quizData.questions.length;
//   const progress =
//     totalQuestions > 0
//       ? Math.round((completedQuestions.length / totalQuestions) * 100)
//       : 0;
//   const handleAnswer = (
//     question: string,
//     response: number,
//     questionIndex: number
//   ) => {
//     const category = quizData?.questions[questionIndex]?.category;
//     if (!category) {
//       console.error(`Category not found for questionIndex: ${questionIndex}`);
//       return;
//     }

//     setUserResponses((prev) => {
//       const updatedResponses = { ...prev, [category]: response };
//       console.log("Updated Responses:", updatedResponses); // Debugging
//       return updatedResponses;
//     });

//     setAnsweredQuestions((prev) => {
//       const updatedSet = new Set(prev);
//       updatedSet.add(questionIndex);
//       return updatedSet;
//     });
//   };
//   // const handleSubmitQuiz = async () => {
//   //   const totalQuestions = quizData.questions.length;
  
//   //   if (completedQuestions.length < totalQuestions) {
//   //     toast.error("Please complete all questions before submitting.");
//   //     return;
//   //   }
  
//   //   try {
//   //     if (!uuid) {
//   //       toast.error("Draft ID not found!");
//   //       return;
//   //     }
  
//   //     // Prepare the request body with ordered responses
//   //     const orderedResponses = quizData.questions.reduce<Record<string, number>>(
//   //       (acc, question) => {
//   //         const category = question.category;
//   //         if (userResponses[category] !== undefined) {
//   //           acc[category] = userResponses[category];
//   //         }
//   //         return acc;
//   //       },
//   //       {}
//   //     );
//   //     console.log("Ordered Responses for Submission:", orderedResponses);
//   //     const body = {
//   //       responses: orderedResponses,
//   //     };
  
//   //     console.log("Submitting Ordered Quiz Responses:", body.responses); // Debugging
  
//   //     // Call the API to submit the quiz
//   //     const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
//   //     if (response.status === 200) {
//   //       toast.success("Quiz submitted successfully!");
//   //       const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//   //         response.payload;
  
//   //       // Navigate to the test results page
//   //       router.push(`/test-result/${assessmentType}/${testUuid}`);
//   //     } else {
//   //       toast.error("Failed to submit quiz. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error while submitting quiz:", error);
//   //     toast.error("An error occurred while submitting the quiz.");
//   //   }
//   // };
  
//   // const handleSubmitQuiz = async () => {
//   //   const totalQuestions = quizData.questions.length;
  
//   //   if (completedQuestions.length < totalQuestions) {
//   //     toast.error("Please complete all questions before submitting.");
//   //     return;
//   //   }
  
//   //   try {
//   //     if (!uuid) {
//   //       toast.error("Draft ID not found!");
//   //       return;
//   //     }
  
//   //     // Build strictly ordered responses
//   //     const orderedResponses = quizData.questions.reduce<Record<string, number>>(
//   //       (acc, question) => {
//   //         const category = question.category;
//   //         acc[category] = userResponses[category] ?? 1; // Use default value if undefined
//   //         return acc;
//   //       },
//   //       {}
//   //     );
  
//   //     const body = {
//   //       responses: orderedResponses,
//   //     };
  
//   //     console.log("Submitting Ordered Quiz Responses:", body.responses);
  
//   //     // Call the API to submit the quiz
//   //     const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
//   //     if (response.status === 200) {
//   //       toast.success("Quiz submitted successfully!");
  
//   //       const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//   //         response.payload;
//   //       console.log("assessment_type_name: " + assessmentType)
//   //       console.log("test_uuid: " + testUuid)
//   //       // Navigate to the results page dynamically
//   //       try {
//   //         router.push(`/test-result/${assessmentType.toLowerCase()}/${testUuid}`);
//   //       } catch (err) {
//   //         console.error("Navigation failed:", err);
//   //         toast.error("Failed to navigate to the results page.");
//   //       }
//   //     } else {
//   //       toast.error("Failed to submit quiz. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error while submitting quiz:", error);
//   //     toast.error("An error occurred while submitting the quiz.");
//   //   }
//   // };
  
//   const handleSubmitQuiz = async () => {
//     const totalQuestions = quizData.questions.length;
  
//     if (completedQuestions.length < totalQuestions) {
//       toast.error("Please complete all questions before submitting.");
//       return;
//     }
  
//     try {
//       if (!uuid) {
//         toast.error("Draft ID not found!");
//         return;
//       }
  
//       // Build strictly ordered responses
//       const orderedResponses = quizData.questions.reduce<Record<string, number>>(
//         (acc, question) => {
//           const category = question.category;
//           acc[category] = userResponses[category] ?? 1; // Use default value if undefined
//           return acc;
//         },
//         {}
//       );
  
//       const body = {
//         responses: orderedResponses,
//       };
  
//       console.log("Submitting Ordered Quiz Responses:", body.responses);
  
//       // Call the API to submit the quiz
//       const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
//       if (response.status === 200) {
//         toast.success("Quiz submitted successfully!");
  
//         const { assessment_type_name: assessmentType, test_uuid: testUuid } =
//           response.payload;
  
//         // Normalize the assessment type for routing
//         const normalizedAssessmentType = assessmentType
//           .toLowerCase() // Convert to lowercase
//           .replace(/s$/, "") // Remove trailing 's' (e.g., 'interests' → 'interest')
//           .replace(/\s+/g, ""); // Remove spaces (e.g., 'learning style' → 'learningstyle')
  
//         console.log("Normalized Assessment Type:", normalizedAssessmentType);
//         console.log("Test UUID:", testUuid);
  
//         // Navigate to the results page dynamically
//         try {
//           router.push(`/test-result/${normalizedAssessmentType}/${testUuid}`);
//         } catch (err) {
//           console.error("Navigation failed:", err);
//           toast.error("Failed to navigate to the results page.");
//         }
//       } else {
//         toast.error("Failed to submit quiz. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error while submitting quiz:", error);
//       toast.error("An error occurred while submitting the quiz.");
//     }
//   };
  
  

//   const handleSaveDraftAgain = async () => {
//     try {
//       if (!uuid) {
//         toast.error("Draft ID not found!");
//         return;
//       }

//       // Use the updated `userResponses` directly
//       const body = {
//         responses: userResponses,
//       };

//       console.log("Transformed Responses:", body.responses); // Debugging

//       const response = await saveDraftAgain({ uuid, body }).unwrap();

//       if (response.status === 200) {
//         toast.success("Draft saved successfully!");
//       } else {
//         toast.error("Failed to save draft. Please try again.");
//       }
//       router.push(`/test`);
//     } catch (error) {
//       console.error("Error while saving draft:", error);
//       toast.error("An error occurred while saving the draft.");
//     }
//   };

//   return (
//     <div className="w-full relative">
//       <div className="sticky top-0 z-10 bg-white pt-4">
//         <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
//           <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
//             {progress} %
//           </span>
//           <Progress value={progress} className="h-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
//         {quizData.questions.map((q, index) => (
//           <QuizQuestionContainer
//             key={index}
//             question={q.question}
//             questionIndex={index}
//             defaultValue={userResponses[q.category] ?? null}
//             isAnswered={answeredQuestions.has(index)}
//             updateCompletedQuestions={(idx) => {
//               if (!completedQuestions.includes(idx)) {
//                 setCompletedQuestions((prev) => [...prev, idx]);
//               }
//             }}
//             handleAnswer={handleAnswer}
//           />
//         ))}
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
//         <QuizButton
//           title="តេស្តពេលក្រោយ"
//           rounded="xl"
//           icon={<ArchiveRestore />}
//           type="leftIcon"
//           outline="true"
//           onClick={handleSaveDraftAgain}
//         />
//         <QuizButtonDisable
//           title="Submit"
//           rounded="xl"
//           icon={<ArrowRight />}
//           type="rightIcon"
//           onClick={handleSubmitQuiz}
//           disabled={!isQuizComplete}
//           className={`${
//             !isQuizComplete
//               ? 'bg-primary text-white cursor-not-allowed'
//               : 'bg-primary text-white hover:bg-green-500'
//           } transition duration-300 ease-in-out px-4 py-2 rounded-xl`}
//         />
//         {/* <QuizButtonDisable
//           title="លទ្ធផល"
//           type="rightIcon"
//           rounded="xl"
//           icon={<ArrowRight />}
//           onClick={handleSubmitQuiz}
//           disabled={!isQuizComplete} // Disable when the quiz is incomplete
//          className="bg-primary"
//         /> */}
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from "@/components/QuizComponent/QuizDraftQuestionContainer";
import { QuizButton } from "@/components/QuizComponent/QuizButton";
import { QuizButtonDisable } from "../QuizButtonDisable";
import { ArrowRight, ArchiveRestore } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "@/components/General/Loading";
import {
  useGetUserDraftDetailsQuery,
  useSaveDraftAgainMutation,
  useSaveDraftSubmittingMutation,
} from "@/redux/service/draft";
import personalityJson from "@/app/(user)/json/personalityKh.json";
import skillJson from "@/app/(user)/json/skillKh.json";
import interestJson from "@/app/(user)/json/interestKh.json";
import valueJson from "@/app/(user)/json/valueKh.json";
import learningStyleJson from "@/app/(user)/json/learningStyleKh.json";
import { useRouter } from "next/navigation";
type QuizData = {
  questions: { question: string; category: string }[];
};

const quizDataMap: Record<string, QuizData> = {
  personality: personalityJson,
  skill: skillJson,
  interest: interestJson,
  value: valueJson,
  learningstyle: learningStyleJson,
};
const normalizeRoute = (input: string): string => {
  const customMappings: Record<string, string> = {
    "Learning Style": "learningStyle",
    Skills: "skill",
    Interests: "interest",
    Values: "value",
    Personality: "personality",
  };

  if (customMappings[input]) {
    return customMappings[input];
  }

  return input
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

export default function QuizDynamicDraftComponent() {
  const router = useRouter();
  const [saveDraftAgain] = useSaveDraftAgainMutation();
  const [saveDraftSubmitting] = useSaveDraftSubmittingMutation();
  const params = useParams();
  const draftTypeRaw =
    typeof params?.draftType === "string" ? params.draftType.toLowerCase() : "";
  const draftType = draftTypeRaw
    .replace(/s$/, "") // Remove plural 's' (e.g., "interests" → "interest")
    .replace(" ", "") // Remove spaces (e.g., "learning style" → "learningstyle")
    .toLowerCase();

  const uuid = typeof params?.uuid === "string" ? params.uuid : "";

  const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

  const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
    {}
  );
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const prevResponsesRef = useRef<{ [key: string]: number } | null>(null);
  const quizData = quizDataMap[draftType] as QuizData | null;

  const isQuizComplete =
    quizData !== null && completedQuestions.length === quizData.questions.length;

  useEffect(() => {
    const responses = data?.payload?.response_data;

    if (
      responses &&
      JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
    ) {
      setUserResponses(responses);

      const completed = quizData?.questions
        ?.map((q, index) =>
          responses[q.category] !== undefined ? index : null
        )
        .filter((index) => index !== null) as number[];

      setCompletedQuestions(completed || []);
      setAnsweredQuestions(new Set(completed || []));
      prevResponsesRef.current = responses;
    }
  }, [data, quizData]);

  if (isLoading) return <Loading />;
  if (error || !quizData) return <p>Quiz data not found.</p>;

  const totalQuestions = quizData.questions.length;
  const progress =
    totalQuestions > 0
      ? Math.round((completedQuestions.length / totalQuestions) * 100)
      : 0;

  const handleAnswer = (
    question: string,
    response: number,
    questionIndex: number
  ) => {
    const category = quizData?.questions[questionIndex]?.category;
    if (!category) {
      console.error(`Category not found for questionIndex: ${questionIndex}`);
      return;
    }

    setUserResponses((prev) => {
      const updatedResponses = { ...prev, [category]: response };
      console.log("Updated Responses:", updatedResponses);
      return updatedResponses;
    });

    setAnsweredQuestions((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(questionIndex);
      return updatedSet;
    });
  };

  // const handleSubmitQuiz = async () => {
  //   if (completedQuestions.length < totalQuestions) {
  //     toast.error("Please complete all questions before submitting.");
  //     return;
  //   }

  //   try {
  //     if (!uuid) {
  //       toast.error("Draft ID not found!");
  //       return;
  //     }

  //     const orderedResponses = quizData.questions.reduce<Record<string, number>>(
  //       (acc, question) => {
  //         const category = question.category;
  //         acc[category] = userResponses[category] ?? 1;
  //         return acc;
  //       },
  //       {}
  //     );

  //     const body = {
  //       responses: orderedResponses,
  //     };

  //     console.log("Submitting Ordered Quiz Responses:", body.responses);

  //     const response = await saveDraftSubmitting({ uuid, body }).unwrap();

  //     if (response.status === 200) {
  //       toast.success("Quiz submitted successfully!");

  //       const { assessment_type_name: assessmentType, test_uuid: testUuid } =
  //         response.payload;

  //       const normalizedAssessmentType = assessmentType
  //         .toLowerCase()
  //         .replace(/s$/, "")
  //         .replace(/\s+/g, "");

  //       console.log("Normalized Assessment Type:", normalizedAssessmentType);
  //       console.log("Test UUID:", testUuid);

  //       try {
  //         router.push(`/test-result/${normalizedAssessmentType}/${testUuid}`);
  //       } catch (err) {
  //         console.error("Navigation failed:", err);
  //         toast.error("Failed to navigate to the results page.");
  //       }
  //     } else {
  //       toast.error("Failed to submit quiz. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error while submitting quiz:", error);
  //     toast.error("An error occurred while submitting the quiz.");
  //   }
  // };
  const handleSubmitQuiz = async () => {
    if (completedQuestions.length < totalQuestions) {
      toast.error("Please complete all questions before submitting.");
      return;
    }
  
    try {
      if (!uuid) {
        toast.error("Draft ID not found!");
        return;
      }
  
      const orderedResponses = quizData.questions.reduce<Record<string, number>>(
        (acc, question) => {
          const category = question.category;
          acc[category] = userResponses[category] ?? 1;
          return acc;
        },
        {}
      );
  
      const body = {
        responses: orderedResponses,
      };
  
      console.log("Submitting Ordered Quiz Responses:", body.responses);
  
      const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
      if (response.status === 200) {
        toast.success("Quiz submitted successfully!");
  
        const { assessment_type_name: assessmentType, test_uuid: testUuid } =
          response.payload;
  
        const normalizedAssessmentType = normalizeRoute(assessmentType);
  
        console.log("Normalized Assessment Type:", normalizedAssessmentType);
        console.log("Test UUID:", testUuid);
  
        try {
          router.push(`/test-result/${normalizedAssessmentType}/${testUuid}`);
        } catch (err) {
          console.error("Navigation failed:", err);
          toast.error("Failed to navigate to the results page.");
        }
      } else {
        toast.error("Failed to submit quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error while submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz.");
    }
  };
  
  const handleSaveDraftAgain = async () => {
    try {
      if (!uuid) {
        toast.error("Draft ID not found!");
        return;
      }

      const body = {
        responses: userResponses,
      };

      console.log("Transformed Responses:", body.responses);

      const response = await saveDraftAgain({ uuid, body }).unwrap();

      if (response.status === 200) {
        toast.success("Draft saved successfully!");
      } else {
        toast.error("Failed to save draft. Please try again.");
      }
      router.push(`/test`);
    } catch (error) {
      console.error("Error while saving draft:", error);
      toast.error("An error occurred while saving the draft.");
    }
  };

  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-10 bg-white pt-4">
        <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
          <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
            {progress} %
          </span>
          <Progress value={progress} className="h-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
        {quizData.questions.map((q, index) => (
          <QuizQuestionContainer
            key={index}
            question={q.question}
            questionIndex={index}
            defaultValue={userResponses[q.category] ?? null}
            isAnswered={answeredQuestions.has(index)}
            updateCompletedQuestions={(idx) => {
              if (!completedQuestions.includes(idx)) {
                setCompletedQuestions((prev) => [...prev, idx]);
              }
            }}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
        <QuizButton
          title="តេស្តពេលក្រោយ"
          rounded="xl"
          icon={<ArchiveRestore />}
          type="leftIcon"
          outline="true"
          onClick={handleSaveDraftAgain}
        />
        <QuizButtonDisable
          title="Submit"
          rounded="xl"
          icon={<ArrowRight />}
          type="rightIcon"
          onClick={handleSubmitQuiz}
          disabled={!isQuizComplete}
          className={`${
            !isQuizComplete
              ? 'bg-primary text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-green-500'
          } transition duration-300 ease-in-out px-4 py-2 rounded-xl`}
        />
      </div>
    </div>
  );
}
