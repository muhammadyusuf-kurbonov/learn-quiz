// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { QuizQuestionsService } from './quiz-questions.class'
import { quizesSchema } from '../quizes/quizes.schema'

// Main data model schema
export const quizQuestionsSchema = Type.Object(
  {
    id: Type.Number(),
    quiz_id: Type.Number(),
    question_data: Type.Object({
      question: Type.String(),
      correctAnswerIndex: Type.Number(),
      options: Type.Array(Type.String()),
    }),
    quiz: Type.Ref(quizesSchema),
  },
  { $id: 'QuizQuestions', additionalProperties: false }
)
export type QuizQuestions = Static<typeof quizQuestionsSchema>
export const quizQuestionsValidator = getValidator(quizQuestionsSchema, dataValidator)
export const quizQuestionsResolver = resolve<QuizQuestions, HookContext<QuizQuestionsService>>({});

export const quizQuestionsExternalResolver = resolve<QuizQuestions, HookContext<QuizQuestionsService>>({
  quiz: virtual(async (question, context) => {
    return context.app.service('quizes').get(question.quiz_id);
  }),
});

// Schema for creating new entries
export const quizQuestionsDataSchema = Type.Pick(quizQuestionsSchema, ['quiz_id', 'question_data'], {
  $id: 'QuizQuestionsData'
})
export type QuizQuestionsData = Static<typeof quizQuestionsDataSchema>
export const quizQuestionsDataValidator = getValidator(quizQuestionsDataSchema, dataValidator)
export const quizQuestionsDataResolver = resolve<QuizQuestionsData, HookContext<QuizQuestionsService>>({})

// Schema for updating existing entries
export const quizQuestionsPatchSchema = Type.Partial(quizQuestionsSchema, {
  $id: 'QuizQuestionsPatch'
})
export type QuizQuestionsPatch = Static<typeof quizQuestionsPatchSchema>
export const quizQuestionsPatchValidator = getValidator(quizQuestionsPatchSchema, dataValidator)
export const quizQuestionsPatchResolver = resolve<QuizQuestionsPatch, HookContext<QuizQuestionsService>>({})

// Schema for allowed query properties
export const quizQuestionsQueryProperties = Type.Pick(quizQuestionsSchema, ['id', 'quiz_id'])
export const quizQuestionsQuerySchema = Type.Intersect(
  [
    querySyntax(quizQuestionsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type QuizQuestionsQuery = Static<typeof quizQuestionsQuerySchema>
export const quizQuestionsQueryValidator = getValidator(quizQuestionsQuerySchema, queryValidator)
export const quizQuestionsQueryResolver = resolve<QuizQuestionsQuery, HookContext<QuizQuestionsService>>({})
