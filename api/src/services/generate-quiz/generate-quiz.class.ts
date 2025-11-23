// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers'
import { createOpenRouter, OpenRouterProvider } from '@openrouter/ai-sdk-provider'
import type { Application } from '../../declarations'
import {
  type GenerateQuiz,
  type GenerateQuizData,
  type GenerateQuizPatch,
  type GenerateQuizQuery
} from './generate-quiz.schema'

export type { GenerateQuiz, GenerateQuizData, GenerateQuizPatch, GenerateQuizQuery }

export interface GenerateQuizServiceOptions {
  app: Application
}

export interface GenerateQuizParams extends Params<GenerateQuizQuery> {}

// This is a service class that generates quizzes from text content using an LLM
export class GenerateQuizService<ServiceParams extends GenerateQuizParams = GenerateQuizParams>
  implements ServiceInterface<GenerateQuiz, GenerateQuizData, ServiceParams, GenerateQuizPatch>
{
  provider: OpenRouterProvider
  controller: AbortController = new AbortController();

  constructor(public options: GenerateQuizServiceOptions) {
    this.provider = createOpenRouter({
      apiKey: options.app.get('openrouter').apiKey,
      baseURL: 'http://localhost:11434/v1',
    })
  }

  async create(data: GenerateQuizData, params?: ServiceParams): Promise<GenerateQuiz>
  async create(data: GenerateQuizData, params?: ServiceParams): Promise<GenerateQuiz | GenerateQuiz[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    const model = this.provider.languageModel('qwen3:8b');

    // Use the content provided in the request instead of reading from file
    const content = data.content;

    const stream = await model.doStream({
      abortSignal: this.controller.signal,
      prompt: [
        {
          role: 'system',
          content:
            '/no_think You are expert examinator. Your task is to generate quiz questions - Multiple choice test questions. No need for explanation - just call tools! Only tool calls allowed',
        },
        {
          role: 'user',
          content: [
            { text: 'Generate at least 10! tests only for this text:', type: 'text' },
            { text: content, type: 'text' },
          ],
        },
      ],
      toolChoice: {
        type: 'required'
      },
      maxOutputTokens: 10000,
      responseFormat: {
        type: 'json',
        schema: {
          type: 'array',
          minItems: 10,
          items: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                minLength: 1
              },
              options: {
                type: 'array',
                minItems: 2,
                items: {
                  type: 'string',
                  minLength: 1
                }
              },
              correctAnswerIndex: {
                type: 'integer',
                minimum: 0
              }
            },
            required: ['question', 'options', 'correctAnswerIndex'],
            additionalProperties: false,
            allOf: [
              {
                properties: {
                  correctAnswerIndex: {
                    type: 'integer'
                  },
                  options: {
                    type: 'array'
                  }
                },
              }
            ]
          }
        }
      },
      tools: [
        {
          name: 'saveQuestion',
          type: 'function',
          inputSchema: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                minLength: 1
              },
              options: {
                type: 'array',
                minItems: 2,
                items: {
                  type: 'string',
                  minLength: 1
                }
              },
              correctAnswerIndex: {
                type: 'integer',
                minimum: 0
              }
            },
            required: ['question', 'options', 'correctAnswerIndex'],
            additionalProperties: false,
            allOf: [
              {
                properties: {
                  correctAnswerIndex: {
                    type: 'integer'
                  },
                  options: {
                    type: 'array'
                  }
                },
              }
            ]
          }
        }
      ]
    });

    let responseTxt = '';
    for await (const chunk of stream.stream) {
      // console.log(JSON.stringify(chunk, null, 2));
      switch (chunk.type) {
        case 'error':
          throw chunk.error;
        case 'text-delta':
          responseTxt += chunk.delta;
          continue;
        case 'tool-call':
          if (chunk.toolName != 'saveQuestion') {
            continue;
          }
          console.log(chunk.input);
      }
    }

    const questions = JSON.parse(responseTxt);
    console.log(questions);

    return {
      id: 0,
      content: data.content.substring(0, 100) + '...', // Store only a preview to avoid large payloads
      fileId: data.fileId,
      responseTxt,
    };
  }

  async teardown(app: Application, path: string): Promise<void> {
    return this.controller.abort();
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
