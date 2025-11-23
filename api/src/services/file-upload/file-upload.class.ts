// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import {
  type FileUpload,
  type FileUploadData,
  type FileUploadPatch,
  type FileUploadQuery
} from './file-upload.schema'
import { join } from 'path'

export type { FileUpload, FileUploadData, FileUploadPatch, FileUploadQuery }

export interface FileUploadServiceOptions {
  app: Application
  uploadDir?: string
}

export interface FileUploadParams extends Params<FileUploadQuery> {}

// This service handles file uploads
export class FileUploadService<ServiceParams extends FileUploadParams = FileUploadParams>
  implements ServiceInterface<FileUpload, FileUploadData, ServiceParams, FileUploadPatch>
{
  app: Application
  uploadDir: string

  constructor(public options: FileUploadServiceOptions) {
    this.app = options.app
    this.uploadDir = options.uploadDir || join(process.cwd(), 'public', 'uploads')
  }

  async create(data: FileUploadData, params?: ServiceParams): Promise<FileUpload> {
    // The actual file data is already processed by the handleFileUpload hook
    // This method just returns the processed result
    return (params as any).fileInfo || data as any;
  }
}

export const getOptions = (app: Application) => {
  return { app, uploadDir: join(app.get('public'), 'uploads') }
}