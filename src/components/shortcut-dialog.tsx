import { Box, Spacer, Text } from 'ink';
import Gradient from 'ink-gradient';
import React from 'react';
import { useConfigState } from '../hooks/use-config';

export default function ShortcutDialog() {
  const { page } = useConfigState();
  return (
    <Box
      borderStyle="double"
      borderColor="#006aa6"
      width={80}
      paddingX={10}
      flexDirection="column">
      <Box marginLeft={20} marginY={1}>
        <Gradient name="pastel">
          <Text>Shortcut Cheat Sheet</Text>
        </Gradient>
      </Box>

      <Box>
        <Text>[{'<ESC>'}/q]: go back</Text>
        <Spacer />
        <Text>[^C]: leave</Text>
      </Box>
      <Box marginTop={3}>
        <Text>
          {page === 'tab'
            ? 'Please use the arrow keys (or WASD) to select the type of news you want to watch, then press Enter...'
            : 'Please use the left arrow (A) or right arrow (D) key to switch between the previous page and the next page. '}
        </Text>
      </Box>
    </Box>
  );
}
