// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Quizes, QuizesData, QuizesPatch, QuizesQuery, QuizesService } from './quizes.class'

export type { Quizes, QuizesData, QuizesPatch, QuizesQuery }

export type QuizesClientService = Pick<QuizesService<Params<QuizesQuery>>, (typeof quizesMethods)[number]>

export const quizesPath = 'quizes'

export const quizesMethods: Array<keyof QuizesService> = ['find', 'get', 'create', 'patch', 'remove']

export const quizesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(quizesPath, connection.service(quizesPath), {
    methods: quizesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [quizesPath]: QuizesClientService
  }
}
