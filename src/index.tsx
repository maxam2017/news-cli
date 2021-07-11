import parseArgs from 'minimist';
import React from 'react';
import { render } from 'ink';

import Help from './components/help';
import App from './components/app';
import { ConfigProvider } from './context/config-context';

const argv = parseArgs(process.argv.slice(2), {
  boolean: ['help'],
  alias: { h: 'help' },
});

if (argv.h) {
  render(<Help />);
} else {
  render(
    <ConfigProvider>
      <App />
    </ConfigProvider>,
  );
}
