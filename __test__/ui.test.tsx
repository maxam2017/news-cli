import React from 'react';
import chalk from 'chalk';
import { test, expect } from '@jest/globals';
import { render } from 'ink-testing-library';
import App from '../commands';

test('greet the world', () => {
  const { lastFrame } = render(<App />);
  expect(lastFrame()).toBe(`Hello ${chalk.hex('#06c755')('World')}`);
});
