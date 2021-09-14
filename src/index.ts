import {resolve} from 'path';
import {PdfCreatenOptions} from './types';
import createPdf from './createPdf';
import convertMarkDownToHtml from './convertMarkDownToHtml';
import readMdFiles from './readMdFiles';

export async function pdfFromMdFiles(
  docPath: string,
  outPath: string,
  options: PdfCreatenOptions = {},
): Promise<boolean> {
  docPath = resolve(docPath);
  outPath = resolve(outPath);

  const markDownString = readMdFiles(docPath, options);
  const htmlString = convertMarkDownToHtml(markDownString);
  return createPdf(htmlString, outPath);
}
