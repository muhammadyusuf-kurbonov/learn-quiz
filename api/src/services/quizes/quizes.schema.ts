// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { QuizesService } from './quizes.class'

// Main data model schema
export const quizesSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'Quizes', additionalProperties: false }
)
export type Quizes = Static<typeof quizesSchema>
export const quizesValidator = getValidator(quizesSchema, dataValidator)
export const quizesResolver = resolve<QuizesQuery, HookContext<QuizesService>>({})

export const quizesExternalResolver = resolve<Quizes, HookContext<QuizesService>>({})

// Schema for creating new entries
export const quizesDataSchema = Type.Pick(quizesSchema, ['name'], {
  $id: 'QuizesData'
})
export type QuizesData = Static<typeof quizesDataSchema>
export const quizesDataValidator = getValidator(quizesDataSchema, dataValidator)
export const quizesDataResolver = resolve<QuizesData, HookContext<QuizesService>>({})

// Schema for updating existing entries
export const quizesPatchSchema = Type.Partial(quizesSchema, {
  $id: 'QuizesPatch'
})
export type QuizesPatch = Static<typeof quizesPatchSchema>
export const quizesPatchValidator = getValidator(quizesPatchSchema, dataValidator)
export const quizesPatchResolver = resolve<QuizesPatch, HookContext<QuizesService>>({})

// Schema for allowed query properties
export const quizesQueryProperties = Type.Pick(quizesSchema, ['id', 'name'])
export const quizesQuerySchema = Type.Intersect(
  [
    querySyntax(quizesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type QuizesQuery = Static<typeof quizesQuerySchema>
export const quizesQueryValidator = getValidator(quizesQuerySchema, queryValidator)
export const quizesQueryResolver = resolve<QuizesQuery, HookContext<QuizesService>>({})
