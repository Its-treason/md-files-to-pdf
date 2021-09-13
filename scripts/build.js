const { execSync } = require('child_process');
const { rmSync } = require('fs');

console.log('> Building pdf-from-md-files...');

rmSync('dist', {force: true, recursive: true});
execSync('node node_modules/typescript/bin/tsc -p "tsconfig.json"');

console.log('> Building pdf-from-md-files Succeded!');
