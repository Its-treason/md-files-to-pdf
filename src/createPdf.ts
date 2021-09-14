import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'path';
import puppeteer from 'puppeteer';

export default async function createPdf(htmlString: string, savePath: string): Promise<boolean> {
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
  await page.addStyleTag({content: css});

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
