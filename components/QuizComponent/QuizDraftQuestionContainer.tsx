'use client';
import React, { useState, useEffect,useRef } from 'react';
import Image from 'next/image';

type Props = {
  question: string;
  lang?: 'en' | 'kh';
  onSelectionComplete?: () => void;
  questionIndex: number;
  updateCompletedQuestions: (index: number) => void;
  handleAnswer: (question: string, response: number, questionIndex: number) => void;
  defaultValue?: number;
  isAnswered: boolean;
};

export const QuizQuestionContainer: React.FC<Props> = ({
  question,
  questionIndex,
  updateCompletedQuestions,
  handleAnswer,
  defaultValue,
  lang = 'en',
  onSelectionComplete,
  isAnswered,
}: Props) => {
  const [selected, setSelected] = useState<number | null>(defaultValue ?? null);
  const questionRef = useRef<HTMLDivElement>(null); // Reference for scrolling

  // Update the selected state if the defaultValue changes (e.g., due to loading a draft)
  useEffect(() => {
    setSelected(defaultValue ?? null);
  }, [defaultValue]);

  const handleOptionClick = (value: number) => {
    if (selected === value) return; // Prevent clicking the same option
    setSelected(value); // Update the selected value
    updateCompletedQuestions(questionIndex); // Mark the question as completed
    handleAnswer(question, value, questionIndex); // Notify parent of the new answer
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    if (onSelectionComplete) {
      onSelectionComplete(); // Trigger any optional completion logic
    }
    setTimeout(() => {
      const nextElement = questionRef.current?.nextElementSibling;
      if (nextElement) {
        // Calculate the position of the next element
        const elementTop = nextElement.getBoundingClientRect().top + window.scrollY;

        // Adjust for the sticky progress bar offset
        const offset = 80; // Adjust this value for your sticky header height
        const scrollToPosition = elementTop - offset;

        // Smoothly scroll to the adjusted position
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
      }
    }, 300); // 300ms delay for smooth UX
    
  };

  return (
    <div
    ref={questionRef}
      className={`flex flex-col items-center gap-2 lg:gap-4 px-2 py-6 lg:px-6 lg:py-12 rounded-lg space-y-6 border-b border-gray-200
        ${isAnswered ? 'bg-[#fdfdfd92] text-gray-500' : 'bg-white text-textprimary'}
        transition-all duration-300 ease-in-out`}
    >
      <p
        className={`text-lg md:text-3xl font-medium text-center ${
          isAnswered ? 'text-gray-400' : 'text-textprimary'
        }`}
      >
        <span>{questionIndex + 1}.</span> {question}
      </p>

      <div className="flex justify-between items-center w-full">
        <span
          className={`hidden lg:block text-md md:text-xl lg:text-2xl font-semibold ${
            isAnswered ? 'text-danger opacity-30' : 'text-danger'
          }`}
        >
          {lang === 'en' ? 'Disagree' : 'មិនឯកភាពទាំងស្រុង'}
        </span>

        <div className="flex justify-center gap-2 lg:gap-6 w-full">
          {[1, 2, 3, 4, 5].map((value, index) => {
            const emojiSrc = [
              '/Quiz/emoji/veryDisagree.png',
              '/Quiz/emoji/disagree.png',
              '/Quiz/emoji/neutral.png',
              '/Quiz/emoji/agree.png',
              '/Quiz/emoji/veryAgree.png',
            ][index];

            return (
              <div className="flex flex-col items-center" key={value}>
                <Image
                  src={emojiSrc}
                  alt={`Option ${value}`}
                  width={100}
                  height={100}
                  onClick={() => handleOptionClick(value)}
                  className={`cursor-pointer ${
                    selected === value
                      ? 'rounded-full ring-2 ring-primary ring-opacity-30'
                      : selected !== null && selected !== value
                      ? 'opacity-60'
                      : ''
                  }`}
                />
              </div>
            );
          })}
        </div>

        <span
          className={`hidden lg:block text-md md:text-xl lg:text-2xl font-semibold ${
            isAnswered ? 'text-primary opacity-30' : 'text-primary'
          }`}
        >
          {lang === 'en' ? 'Agree' : 'ឯកភាពទាំងស្រុង'}
        </span>
      </div>
    </div>
  );
};
