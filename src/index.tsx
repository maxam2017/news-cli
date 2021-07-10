import parseArgs from 'minimist';
import React from 'react';
import { render } from 'ink';

import Help from './components/help';
import TabsView from './components/tabs-view';

const argv = parseArgs(process.argv.slice(2), {
  boolean: ['help'],
  alias: { h: 'help' },
});

if (argv.h) {
  render(<Help />);
} else {
  render(<TabsView />);
}
