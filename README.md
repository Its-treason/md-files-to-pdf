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
}
```

## CLI-Usage Options
```
--doc-path "path/to/md-files" // Requiered, Path to Folder with MarkDown files
--out-path "path/to/pdf" // Requiered, Path where the PDF should me saved
--heading "Example" // Optional, Heading at the top. Default: Folder-Name
```

## Development

```
npm run start -- --doc-path ./example_docs --out-path out.pdf --heading Doc-Test
```

## Thanks

Thanks to [Simon Hänisch](https://github.com/simonhaenisch) and [Contributors](https://github.com/simonhaenisch/md-to-pdf/graphs/contributors) for creating [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) where i looked up some code.
