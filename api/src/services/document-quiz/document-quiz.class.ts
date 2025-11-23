// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import {
  type DocumentQuiz,
  type DocumentQuizData,
  type DocumentQuizPatch,
  type DocumentQuizQuery
} from './document-quiz.schema'
import { extractTextFromDocument } from '../../utils/document-processor'

export type { DocumentQuiz, DocumentQuizData, DocumentQuizPatch, DocumentQuizQuery }

export interface DocumentQuizServiceOptions {
  app: Application
}

export interface DocumentQuizParams extends Params<DocumentQuizQuery> {}

// This service orchestrates the complete document-to-quiz flow
export class DocumentQuizService<ServiceParams extends DocumentQuizParams = DocumentQuizParams>
  implements ServiceInterface<DocumentQuiz, DocumentQuizData, ServiceParams, DocumentQuizPatch>
{
  app: Application

  constructor(public options: DocumentQuizServiceOptions) {
    this.app = options.app
  }

  async create(data: DocumentQuizData, params?: ServiceParams): Promise<DocumentQuiz> {
    // Note: The actual processing will be done in a hook
    // This service is just a placeholder for the architecture
    throw new Error('Direct service call not supported. Use proper multipart upload handling.')
  }
}

export const getOptions = (app: Application) => {
  return { app }
}