import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { basename } from 'path';
import { MdFileCollection } from './MdFileCollection';
import { PdfCreationOptions } from './types';

export default function readMdFiles(docPath: string, options: PdfCreationOptions): MdFileCollection|never {
  if (existsSync(docPath) === false) {
    throw new Error(`Doc Path Not found! "${docPath}" does not exists!`);
  }

  const collection = new MdFileCollection(options);

  readFiles([], docPath, collection);
  
  return collection;
}

function readFiles(level: number[], path: string, collection: MdFileCollection): false|void {
  const files = readdirSync(path);

  if (files.length === 0) {
    console.warn(`> Warning: "${path}" is empty!`);
    return false;
  }

  if (level.length !== 0) {
    collection.addFile({
      heading: basename(path),
      content: '',
      level: [...level],
      path,
    });
  } else {
    collection.setTopHeading(basename(path));
  }

  level = [...level];
  level.push(0);

  files.forEach(file => {
    level[level.length - 1]++;

    const filePath = `${path}/${file}`;
    const fileStats = lstatSync(filePath);
    if (fileStats.isDirectory() === true) {
      if (readFiles(level, `${filePath}`, collection) === false) {
        level[level.length - 1]--;
      }
      return;
    }

    if (file.endsWith('.md') === false) {
      console.warn(`> Warning: "${filePath}" is not a MarkDown file!`);
      level[level.length - 1]--;
      return;
    }

    const content = readFileSync(`${filePath}`).toString();

    collection.addFile({
      content,
      path: filePath,
      heading: file.slice(0, -3),
      level: [...level],
    });
  });
}
