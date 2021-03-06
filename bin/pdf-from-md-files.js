const { pdfFromMdFiles } = require('../dist/index');
const arg = require('arg');

const args = arg({
  '--doc-path': String,
  '--out-path': String,
  '--heading': String,
  '--output-html': String,
  '--generate-toc': Boolean,
});

if (
  args['--doc-path'] === undefined
  || args['--out-path'] === undefined 
) {
  console.error('Missing Arguments!');
  process.exit(1);
}

const options = {
  heading: args['--heading'],
  outputHtml: args['--output-html'],
  generateToc: args['--generate-toc'],
};

pdfFromMdFiles(args['--doc-path'], args['--out-path'], options);
