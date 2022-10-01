import React, { useState } from 'react';
import Spinner from 'ink-spinner';
import chunk from 'lodash.chunk';
import { Text, Box, useInput } from 'ink';
import useTab from '../hooks/use-tab';
import type { Tab } from '../types';
import { useConfigSetter } from '../hooks/use-config';

const Col = 6;

export default function TabsView() {
  const { status, data } = useTab();

  const [index, setIndex] = useState(0);
  const setter = useConfigSetter();

  useInput((input, key) => {
    if (!data) return;
    if (key.leftArrow || input.toLowerCase() === 'a') {
      setIndex(i =>
        i % Col === 0 ? Math.min(i + Col - 1, data.length - 1) : i - 1,
      );
    }

    if (key.rightArrow || input.toLowerCase() === 'd') {
      setIndex(i =>
        i % Col === Col - 1
          ? Math.max(0, i - Col + 1)
          : i + 1 > data.length - 1
          ? Math.floor(data.length / Col) * Col
          : i + 1,
      );
    }

    if (key.upArrow || input.toLowerCase() === 'w') {
      setIndex(i => {
        const base = Math.floor(data.length / Col) * Col;
        return i < Col
          ? i + base >= data.length
            ? base - Col + i
            : base + i
          : i - Col;
      });
    }

    if (key.downArrow || input.toLowerCase() === 's') {
      setIndex(i => (i + Col > data.length - 1 ? i % Col : i + Col));
    }

    if (key.return) {
      setter({ page: 'page', extra: data[index].portalPageUrlPath });
    }
  });

  if (status === 'loading') return <Spinner />;

  return (
    <Box flexDirection="column">
      {chunk(data, Col).map((tabs, i) => (
        <Box key={i} marginTop={1}>
          {tabs.map((item, j) => (
            <TabItem key={item.id} active={i * Col + j === index} item={item} />
          ))}
        </Box>
      ))}
    </Box>
  );
}

const TabItem = ({ item, active }: { item: Tab; active: boolean }) => {
  return (
    <Box
      borderStyle={active ? 'bold' : 'round'}
      borderColor={active ? 'cyan' : 'white'}
      paddingX={1}
      marginRight={1}>
      <Text bold={active} color={active ? 'cyan' : 'white'}>
        {item.name}({item.portalPageUrlPath})
      </Text>
    </Box>
  );
};
