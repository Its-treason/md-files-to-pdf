export interface PdfCreationOptions {
  heading?: string,
  outputHtml?: string,
  generateToc?: boolean,
}

export interface MdFile {
  path: string,
  level: number[],
  content: string,
  heading: string,
}
