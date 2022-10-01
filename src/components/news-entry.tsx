import React from 'react';
import { Box, Text } from 'ink';
import Link from 'ink-link';
import type { News } from '../types';

type Props = {
  item: News;
};

export default function NewsEntry({ item }: Props) {
  return (
    <Box flexDirection="column" width={80} margin={1}>
      {/* @ts-expect-error the children prop of Link should accept React.FC */}
      <Link url={item.url}>
        <Text bold color="#006aa6">
          {item.title}
        </Text>
      </Link>
      <Text dimColor>{item.excerpt}</Text>
    </Box>
  );
}
