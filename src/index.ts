import { resolve } from 'path';
import { PdfCreationOptions } from './types';
import createPdf from './createPdf';
import convertMarkDownToHtml from './convertMarkDownToHtml';
import readMdFiles from './readMdFiles';
import { writeFileSync } from 'fs';

export async function pdfFromMdFiles(
  docPath: string,
  outPath: string,
  options: PdfCreationOptions = {},
): Promise<boolean> {
  docPath = resolve(docPath);
  outPath = resolve(outPath);

  const fileCollection = readMdFiles(docPath, options);
  writeFileSync('out.md', fileCollection.generateFullFile());
  const htmlString = convertMarkDownToHtml(fileCollection.generateFullFile());
  return createPdf(htmlString, outPath, options);
}
