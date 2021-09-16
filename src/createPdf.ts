import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'path';
import puppeteer from 'puppeteer';
import { PdfCreationOptions } from './types';

export default async function createPdf(htmlString: string, savePath: string, options: PdfCreationOptions): Promise<boolean> {
  const cssFile = resolve(__dirname, '..', 'src', 'markdown.css');
  const highlightCss = resolve(
    dirname(require.resolve('highlight.js')),
    '..',
    'styles',
    'github.css',
  );
  const css = readFileSync(cssFile).toString() + readFileSync(highlightCss).toString();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlString);
  await page.addStyleTag({ content: css });

  outputHtml(await page.content(), options);

  await page.pdf({
    path: savePath,
    format: 'a4',
    printBackground: true,
    margin: {
      top: '30mm',
      right: '40mm',
      bottom: '30mm',
      left: '20mm',
    },
  });
  await browser.close();

  return false;
}

function outputHtml(html: string, options: PdfCreationOptions): void {
  if (options.outputHtml === undefined) {
    return;
  }

  const htmlPath = resolve(options.outputHtml);
  writeFileSync(htmlPath, html);
}
