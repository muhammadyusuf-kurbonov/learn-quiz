import { Hook, HookContext } from '@feathersjs/feathers';
import formidable from 'formidable';
import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { extractTextFromDocument } from '../../utils/document-processor';

export const handleDocumentQuizFlow = (): Hook => {
  return async (context: HookContext) => {
    // Don't process if this is not a multipart request
    if (!context.params.headers || !context.params.headers['content-type']?.includes('multipart/form-data')) {
      return context;
    }

    // Parse the form data
    const form = formidable({
      multiples: false, // Only allow single files
      uploadDir: join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    // Ensure upload directory exists
    await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });

    return new Promise((resolve, reject) => {
      form.parse(context.params.req, async (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        const fileArray = Object.values(files);
        if (!fileArray.length) {
          reject(new Error('No file uploaded'));
          return;
        }

        const file: any = fileArray[0]; // Get the first uploaded file

        // Validate file type
        const allowedMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          reject(new Error('Invalid file type. Only PDF, DOCX, and XLSX files are allowed.'));
          return;
        }

        // Generate a unique filename
        const fileExtension = file.originalFilename.split('.').pop() || '';
        const uniqueFileName = `${randomUUID()}.${fileExtension}`;
        const filePath = join(process.cwd(), 'public', 'uploads', uniqueFileName);

        // Move the file to the final location with unique name
        await writeFile(filePath, file.buffer);

        try {
          // Extract text from the document
          const textContent = await extractTextFromDocument(filePath);

          // Call the generate-quiz service with the extracted content
          const generateQuizService = context.app.service('generate-quiz');
          
          const quizResult = await generateQuizService.create({
            content: textContent,
            fileId: uniqueFileName
          });

          // Clean up the uploaded file after processing
          // In a real application, you might want to keep the file for audit purposes
          // For now, we'll remove it after processing
          // require('fs').unlinkSync(filePath);

          // Return the result
          context.result = {
            id: 0, // This would be a real ID if stored in DB
            fileName: file.originalFilename,
            quizResult: typeof quizResult === 'string' ? quizResult : JSON.stringify(quizResult),
            status: 'completed'
          };

          resolve(context);
        } catch (error) {
          reject(new Error(`Error processing document: ${error instanceof Error ? error.message : 'Unknown error'}`));
        }
      });
    });
  };
};