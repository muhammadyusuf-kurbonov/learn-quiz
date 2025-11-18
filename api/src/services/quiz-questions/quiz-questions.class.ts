// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  QuizQuestions,
  QuizQuestionsData,
  QuizQuestionsPatch,
  QuizQuestionsQuery
} from './quiz-questions.schema'

export type { QuizQuestions, QuizQuestionsData, QuizQuestionsPatch, QuizQuestionsQuery }

export interface QuizQuestionsParams extends KnexAdapterParams<QuizQuestionsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class QuizQuestionsService<ServiceParams extends Params = QuizQuestionsParams> extends KnexService<
  QuizQuestions,
  QuizQuestionsData,
  QuizQuestionsParams,
  QuizQuestionsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'quiz-questions'
  }
}
