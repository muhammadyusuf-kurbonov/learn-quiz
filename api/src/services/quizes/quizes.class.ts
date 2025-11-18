// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Quizes, QuizesData, QuizesPatch, QuizesQuery } from './quizes.schema'

export type { Quizes, QuizesData, QuizesPatch, QuizesQuery }

export interface QuizesParams extends KnexAdapterParams<QuizesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class QuizesService<ServiceParams extends Params = QuizesParams> extends KnexService<
  Quizes,
  QuizesData,
  QuizesParams,
  QuizesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'quizes'
  }
}
