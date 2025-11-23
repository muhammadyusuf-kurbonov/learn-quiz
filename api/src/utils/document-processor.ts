import { readFile } from 'fs/promises';
import * as path from 'path';

// For PDF processing
import * as pdfParse from 'pdf-parse';

// For DOCX processing
import * as mammoth from 'mammoth';

// For XLSX processing
import * as xlsx from 'xlsx';

/**
 * Extracts text content from a document file (PDF, DOCX, XLSX)
 * @param filePath Path to the document file
 * @returns Extracted text content
 */
export const extractTextFromDocument = async (filePath: string): Promise<string> => {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case '.pdf':
      return await extractTextFromPDF(filePath);
    case '.docx':
      return await extractTextFromDOCX(filePath);
    case '.xlsx':
      return await extractTextFromXLSX(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}. Only PDF, DOCX, and XLSX files are supported.`);
  }
};

/**
 * Extracts text from PDF file
 */
const extractTextFromPDF = async (filePath: string): Promise<string> => {
  try {
    const dataBuffer = await readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    throw new Error(`Error processing PDF file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Extracts text from DOCX file
 */
const extractTextFromDOCX = async (filePath: string): Promise<string> => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    throw new Error(`Error processing DOCX file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Extracts text from XLSX file
 */
const extractTextFromXLSX = async (filePath: string): Promise<string> => {
  try {
    const workbook = xlsx.readFile(filePath);
    let textContent = '';

    // Process each worksheet in the workbook
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const sheetText = xlsx.utils.sheet_to_txt(worksheet);
      textContent += `${sheetText}\n`;
    }

    return textContent;
  } catch (error) {
    throw new Error(`Error processing XLSX file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};