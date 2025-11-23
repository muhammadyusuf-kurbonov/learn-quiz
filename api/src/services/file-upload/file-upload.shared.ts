// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  FileUpload,
  FileUploadData,
  FileUploadPatch,
  FileUploadQuery,
  FileUploadService
} from './file-upload.class'

export type { FileUpload, FileUploadData, FileUploadPatch, FileUploadQuery }

export type FileUploadClientService = Pick<
  FileUploadService,
  (typeof fileUploadMethods)[number]
>

export const fileUploadPath = 'file-upload'

export const fileUploadMethods: Array<keyof FileUploadService> = [
  'create',
]

export const fileUploadClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(fileUploadPath, connection.service(fileUploadPath), {
    methods: fileUploadMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [fileUploadPath]: FileUploadClientService
  }
}