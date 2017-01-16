#!/usr/bin/env node
const path = require('path');
const converter = require('../index.js');

const dir = process.argv.slice(2)[0];

console.log('Translating "t.plan" tests into "t.end" tests of ' + dir);

converter(dir);

console.log('Converted!');
