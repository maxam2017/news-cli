import React from 'react';
import { Box, Text } from 'ink';
import Link from 'ink-link';
import { News } from '../types';

interface Props {
  item: News;
}

export default function NewsEntry({ item }: Props) {
  return (
    <Box flexDirection="column" width={80}>
      <Link url={item.url}>
        <Text bold color="#006aa6">
          {item.title}
        </Text>
      </Link>
      <Text dimColor>
        {item.excerpt}
        {'\n'}
      </Text>
    </Box>
  );
}
