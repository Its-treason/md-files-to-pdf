import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { basename } from 'path';
import { PdfCreationOptions } from './types';

export default function readMdFiles(docPath: string, options: PdfCreationOptions): string|never {
  if (existsSync(docPath) === false) {
    throw new Error(`Doc Path Not found! "${docPath}" does not exists!`);
  }

  return readFiles([], docPath, options);
}

function readFiles(level: number[], path: string, options: PdfCreationOptions): string {
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
