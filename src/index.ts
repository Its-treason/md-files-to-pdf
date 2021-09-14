import {resolve, basename, dirname} from 'path';
import {existsSync, readdirSync, lstatSync, readFileSync} from 'fs';
import puppeteer from 'puppeteer';
import marked from 'marked';
import hljs from 'highlight.js';
import {PdfCreatenOptions} from './types';

module.exports = async function PdfFromMdFiles(docPath: string, outPath: string, options: PdfCreatenOptions = {}): Promise<boolean> {
  docPath = resolve(docPath);
  outPath = resolve(outPath);

  const markDownString = generateFullMdString(docPath, options);
  const htmlString = convertMdToHtml(markDownString);
  return renderHtml(htmlString, outPath);
};

function generateFullMdString(docPath: string, options: PdfCreatenOptions): string|never {
  if (existsSync(docPath) === false) {
    throw new Error(`Doc Path Not found! "${docPath}" does not exists!`);
  }

  return readFiles([], docPath, options);
}

function readFiles(level: number[], path: string, options: PdfCreatenOptions): string {
  const files = readdirSync(path);

  if (files.length === 0) {
    console.warn(`> Warning: "${path}" is empty!`);
    return '';
  }

  const currentLevel = level.length;
  let levelString = '';
  if (level.length > 0) {
    levelString = `${level.join('.')} - `;
  }

  let heading = `\n\n${'#'.repeat(currentLevel + 1)} ${levelString}${basename(path)}\n\n`;
  if (options.heading !== undefined && levelString === '') {
    heading = `\n\n# ${levelString}${options.heading}\n\n`;
  }

  level = [...level];
  level.push(0);

  return heading + files.reduce<string>((acc, item) => {
    level[level.length - 1]++;
    const currentLevel = level.length;

    const filePath = `${path}/${item}`;
    const fileStats = lstatSync(filePath);
    if (fileStats.isDirectory() === true) {
      return acc + readFiles(level, `${filePath}`, options);
    }

    if (item.endsWith('.md') === false) {
      console.warn(`> Warning: "${filePath}" is not a MarkDown file!`);
      return acc;
    }

    const heading = `\n\n${'#'.repeat(currentLevel + 1)} ${level.join('.')} - ${item.slice(0, -3)}\n\n`;
    const content = heading + readFileSync(`${filePath}`);

    return acc + content;
  }, '');
}

async function renderHtml(htmlString: string, savePath: string): Promise<boolean> {
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

function convertMdToHtml(markDownString: string): string {
  const renderer = new marked.Renderer();

  renderer.code = (code, languageName) => {
    // if the given language is not available in highlight.js, fall back to plaintext
    const language = languageName && hljs.getLanguage(languageName) ? languageName : 'plaintext';

    return `<pre><code class="hljs ${language}">${hljs.highlight(code, {language}).value}</code></pre>`;
  };

  marked.setOptions({renderer});

  const htmlString = marked(markDownString);

  return `
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    ${htmlString}
  </body>
</html>
  `;
}
