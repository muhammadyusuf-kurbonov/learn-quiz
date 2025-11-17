// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  GenerateQuiz,
  GenerateQuizData,
  GenerateQuizPatch,
  GenerateQuizQuery,
  GenerateQuizService
} from './generate-quiz.class'

export type { GenerateQuiz, GenerateQuizData, GenerateQuizPatch, GenerateQuizQuery }

export type GenerateQuizClientService = Pick<
  GenerateQuizService<Params<GenerateQuizQuery>>,
  (typeof generateQuizMethods)[number]
>

export const generateQuizPath = 'generate-quiz'

export const generateQuizMethods: Array<keyof GenerateQuizService> = [
  'create',
]

export const generateQuizClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(generateQuizPath, connection.service(generateQuizPath), {
    methods: generateQuizMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [generateQuizPath]: GenerateQuizClientService
  }
}
