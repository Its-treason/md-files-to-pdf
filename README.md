md-files-to-pdf
===============

Generate a PDF from multiple MarkDown files.

## Usage

```ts
import {pdfFromMdFiles} from 'md-files-to-pdf';

const options = {
  heading: 'Example',
};

pdfFromMdFiles('path/to/md-files', 'path/to/pdf', options);
```

> Options
```ts
{
  heading?: string, // Heading at the top. Default: Folder-Name
  outputHtml?: string, // Path to save the generated HTML file, helpful for debugging
  generateToc?: boolean, // If true, Generate a Table of Contents at the Top of the File
}
```

## CLI-Usage Options
```
--doc-path "path/to/md-files" // Requiered, Path to Folder with MarkDown files
--out-path "path/to/pdf" // Requiered, Path where the PDF should me saved
--heading "Example" // Optional, Heading at the top. Default: Folder-Name
--output-html "path/to/html" // Optional, save the generated HTML file, helpful for debugging
--generate-toc // Optional, Generate a Table of Contents at the Top of the File
```

## Development

```
npm run start -- --doc-path ./example_docs --out-path out.pdf --heading Doc-Test
```

## Thanks

Thanks to [Simon Hänisch](https://github.com/simonhaenisch) and [Contributors](https://github.com/simonhaenisch/md-to-pdf/graphs/contributors) for creating [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) where i looked up some code.
