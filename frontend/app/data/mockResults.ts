// data/mockResults.ts
import type { QuizResult } from '~/types/quiz';

export const mockResults: QuizResult = {
  id: 1,
  quizId: 1,
  score: 85,
  correctAnswers: 8.5,
  totalQuestions: 10,
  timeTaken: '15:42',
  grade: 'A',
  completionDate: 'November 18, 2025',
  performanceLabel: 'Good Job!',
  questions: [
    {
      id: 1,
      question: 'Which of the following best describes the main theme of the document?',
      options: [
        'A) Economic principles',
        'B) Historical events',
        'C) Scientific concepts',
        'D) Literary analysis'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      selectedAnswerIndex: 2, // User's selected answer
      isCorrect: true,
      explanation: 'The document primarily focuses on scientific concepts and their applications.'
    },
    {
      id: 2,
      question: 'What year was the document originally published?',
      options: [
        'A) 1992',
        'B) 1995',
        'C) 1998',
        'D) 2001'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      selectedAnswerIndex: 1, // User's selected answer
      isCorrect: false,
      explanation: 'The document was published in 1998 according to the preface section.'
    },
    {
      id: 3,
      question: 'Which principle is most frequently mentioned in the document?',
      options: [
        'A) Supply and demand',
        'B) Law of gravity',
        'C) Conservation of energy',
        'D) Natural selection'
      ],
      correctAnswerIndex: 0, // Index of the correct option
      selectedAnswerIndex: 0, // User's selected answer
      isCorrect: true,
      explanation: 'Supply and demand is referenced multiple times throughout the document.'
    },
    {
      id: 4,
      question: 'Who is the primary author of the document?',
      options: [
        'A) John Smith',
        'B) Sarah Johnson',
        'C) Michael Williams',
        'D) Emily Davis'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      selectedAnswerIndex: 1, // User's selected answer
      isCorrect: true,
      explanation: 'Sarah Johnson is listed as the main author on the first page.'
    },
    {
      id: 5,
      question: 'What methodology does the document primarily use?',
      options: [
        'A) Qualitative analysis',
        'B) Quantitative analysis',
        'C) Mixed methods',
        'D) Case study approach'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      selectedAnswerIndex: 2, // User's selected answer
      isCorrect: true,
      explanation: 'The document uses a mixed methods approach combining both qualitative and quantitative elements.'
    },
    {
      id: 6,
      question: 'How many chapters does the document contain?',
      options: [
        'A) 5',
        'B) 7',
        'C) 9',
        'D) 12'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      selectedAnswerIndex: 1, // User's selected answer
      isCorrect: true,
      explanation: 'The document has 7 chapters as listed in the table of contents.'
    },
    {
      id: 7,
      question: 'What is the primary data source mentioned in the document?',
      options: [
        'A) Survey responses',
        'B) Historical records',
        'C) Laboratory experiments',
        'D) Government statistics'
      ],
      correctAnswerIndex: 3, // Index of the correct option
      selectedAnswerIndex: 2, // User's selected answer
      isCorrect: false,
      explanation: 'Government statistics are the primary data source used throughout the document.'
    },
    {
      id: 8,
      question: 'Which demographic is most commonly referenced in the study?',
      options: [
        'A) Children',
        'B) Young adults',
        'C) Middle-aged adults',
        'D) Senior citizens'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      selectedAnswerIndex: 1, // User's selected answer
      isCorrect: true,
      explanation: 'The study primarily focuses on young adults between the ages of 18-30.'
    },
    {
      id: 9,
      question: 'What is the sample size of the study?',
      options: [
        'A) 100',
        'B) 250',
        'C) 500',
        'D) 1000'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      selectedAnswerIndex: 2, // User's selected answer
      isCorrect: true,
      explanation: 'The study included a sample size of 500 participants.'
    },
    {
      id: 10,
      question: 'According to the document, what is the primary conclusion?',
      options: [
        'A) Economic factors are most important',
        'B) Social factors are most important',
        'C) Environmental factors are most important',
        'D) Technological factors are most important'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      selectedAnswerIndex: 1, // User's selected answer
      isCorrect: true,
      explanation: 'The document concludes that social factors play the most important role in the context studied.'
    }
  ]
}