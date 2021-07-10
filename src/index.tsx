import parseArgs from 'minimist';
import React from 'react';
import { render } from 'ink';
import App from './components/app';
import Help from './components/help';

const argv = parseArgs(process.argv.slice(2), {
  boolean: ['help'],
  alias: { h: 'help' },
});

if (argv.h) {
  render(<Help />);
} else {
  render(<App />);
}
