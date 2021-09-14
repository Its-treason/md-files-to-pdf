const {pdfFromMdFiles} = require('../dist/index');
const arg = require('arg');

const args = arg({
  '--doc-path': String,
  '--out-path': String,
  '--heading': String,
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
};

pdfFromMdFiles(args['--doc-path'], args['--out-path'], options);
