import { MdFile, PdfCreationOptions } from './types';

export class MdFileCollection {
  public readonly files: MdFile[] = [];
  private readonly options: PdfCreationOptions;
  private heading?: string;

  public constructor(
    options: PdfCreationOptions,
  ) {
    this.options = options;
    this.heading = options.heading;
  }

  public setTopHeading(heading: string): void {
    if (typeof this.heading !== 'string') {
      this.heading = heading;
    }
  }

  public addFile(file: MdFile): void {
    this.files.push(file);
  }

  public generateFullFile(): string {
    let fullFile = `\n\n# ${this.heading}\n\n`;

    if (this.options.generateToc === true) {
      fullFile += this.generateTableOfContents();
    }

    fullFile += this.files.map((file): string => {
      return `
\n\n#${'#'.repeat(file.level.length)} ${file.level.join('.')} - ${file.heading}\n\n
${file.content}\n`;
    }).join('');

    return fullFile;
  }

  private generateTableOfContents(): string {
    return this.files.map((file): string => {
      return `\n\n${file.level.join('.')} - ${file.heading}\n\n`;
    }).join('');
  }
}
