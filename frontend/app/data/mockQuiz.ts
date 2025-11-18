// data/mockQuiz.ts
import type { Quiz } from '~/types/quiz';

export const mockQuiz: Quiz = {
  id: 1,
  title: 'Document Title Quiz',
  totalQuestions: 10,
  timeLimit: 900, // 15 minutes in seconds
  questions: [
    {
      id: 1,
      text: 'Which of the following best describes the main theme of the document?',
      type: 'Multiple Choice',
      options: [
        'A) Economic principles',
        'B) Historical events',
        'C) Scientific concepts',
        'D) Literary analysis'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      explanation: 'The document primarily focuses on scientific concepts and their applications.'
    },
    {
      id: 2,
      text: 'What year was the document originally published?',
      type: 'Multiple Choice',
      options: [
        'A) 1992',
        'B) 1995',
        'C) 1998',
        'D) 2001'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      explanation: 'The document was published in 1998 according to the preface section.'
    },
    {
      id: 3,
      text: 'Which principle is most frequently mentioned in the document?',
      type: 'Multiple Choice',
      options: [
        'A) Supply and demand',
        'B) Law of gravity',
        'C) Conservation of energy',
        'D) Natural selection'
      ],
      correctAnswerIndex: 0, // Index of the correct option
      explanation: 'Supply and demand is referenced multiple times throughout the document.'
    },
    {
      id: 4,
      text: 'Who is the primary author of the document?',
      type: 'Multiple Choice',
      options: [
        'A) John Smith',
        'B) Sarah Johnson',
        'C) Michael Williams',
        'D) Emily Davis'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      explanation: 'Sarah Johnson is listed as the main author on the first page.'
    },
    {
      id: 5,
      text: 'What methodology does the document primarily use?',
      type: 'Multiple Choice',
      options: [
        'A) Qualitative analysis',
        'B) Quantitative analysis',
        'C) Mixed methods',
        'D) Case study approach'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      explanation: 'The document uses a mixed methods approach combining both qualitative and quantitative elements.'
    },
    {
      id: 6,
      text: 'How many chapters does the document contain?',
      type: 'Multiple Choice',
      options: [
        'A) 5',
        'B) 7',
        'C) 9',
        'D) 12'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      explanation: 'The document has 7 chapters as listed in the table of contents.'
    },
    {
      id: 7,
      text: 'What is the primary data source mentioned in the document?',
      type: 'Multiple Choice',
      options: [
        'A) Survey responses',
        'B) Historical records',
        'C) Laboratory experiments',
        'D) Government statistics'
      ],
      correctAnswerIndex: 3, // Index of the correct option
      explanation: 'Government statistics are the primary data source used throughout the document.'
    },
    {
      id: 8,
      text: 'Which demographic is most commonly referenced in the study?',
      type: 'Multiple Choice',
      options: [
        'A) Children',
        'B) Young adults',
        'C) Middle-aged adults',
        'D) Senior citizens'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      explanation: 'The study primarily focuses on young adults between the ages of 18-30.'
    },
    {
      id: 9,
      text: 'What is the sample size of the study?',
      type: 'Multiple Choice',
      options: [
        'A) 100',
        'B) 250',
        'C) 500',
        'D) 1000'
      ],
      correctAnswerIndex: 2, // Index of the correct option
      explanation: 'The study included a sample size of 500 participants.'
    },
    {
      id: 10,
      text: 'According to the document, what is the primary conclusion?',
      type: 'Multiple Choice',
      options: [
        'A) Economic factors are most important',
        'B) Social factors are most important',
        'C) Environmental factors are most important',
        'D) Technological factors are most important'
      ],
      correctAnswerIndex: 1, // Index of the correct option
      explanation: 'The document concludes that social factors play the most important role in the context studied.'
    }
  ]
}