// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  DocumentQuiz,
  DocumentQuizData,
  DocumentQuizPatch,
  DocumentQuizQuery,
  DocumentQuizService
} from './document-quiz.class'

export type { DocumentQuiz, DocumentQuizData, DocumentQuizPatch, DocumentQuizQuery }

export type DocumentQuizClientService = Pick<
  DocumentQuizService<Params<DocumentQuizQuery>>,
  (typeof documentQuizMethods)[number]
>

export const documentQuizPath = 'document-quiz'

export const documentQuizMethods: Array<keyof DocumentQuizService> = [
  'create',
]

export const documentQuizClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(documentQuizPath, connection.service(documentQuizPath), {
    methods: documentQuizMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [documentQuizPath]: DocumentQuizClientService
  }
}