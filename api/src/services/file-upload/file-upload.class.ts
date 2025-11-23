// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import feathersBlob from 'feathers-blob';
import FSBlobStore from 'fs-blob-store';
import type { Application } from '../../declarations';
import {
  type FileUpload,
  type FileUploadData,
  type FileUploadPatch,
  type FileUploadQuery
} from './file-upload.schema';
import { join } from 'path';

export type { FileUpload, FileUploadData, FileUploadPatch, FileUploadQuery };

export type FileUploadService = ReturnType<typeof feathersBlob>;

// This service handles file uploads
export const getOptions = (app: Application) => {
  const storage = app.get('storage').driver;
  const path = join(process.cwd(), app.get('storage').directory || './uploads');

  let store;

  switch (storage) {
    case 'local':
      store = FSBlobStore(path);
      break;
    default:
      store = FSBlobStore(path);
      break;
  }

  return {
    Model: store,
    returnBuffer: false,
    returnUri: false,
  } satisfies feathersBlob.InitOptions
}
