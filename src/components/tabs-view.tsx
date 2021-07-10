import React, { useState } from 'react';
import Spinner from 'ink-spinner';
import chunk from 'lodash.chunk';
import { Text, Box, useInput } from 'ink';
import useFetch from '../hooks/use-fetch';
import { Tab } from '../types';

const COL = 6;

export default function TabsView() {
  const { status, data } = useFetch<Tab[]>(
    'https://today.line.me/api/v6/portals/tw/tabs',
  );

  const [index, setIndex] = useState(0);

  useInput((input, key) => {
    if (!data) return;
    if (key.leftArrow || input.toLowerCase() === 'a') {
      setIndex(i =>
        i % COL === 0 ? Math.min(i + COL - 1, data.length - 1) : i - 1,
      );
    }

    if (key.rightArrow || input.toLowerCase() === 'd') {
      setIndex(i =>
        i % COL === COL - 1
          ? Math.max(0, i - COL + 1)
          : i + 1 > data.length - 1
          ? Math.floor(data.length / COL) * COL
          : i + 1,
      );
    }

    if (key.upArrow || input.toLowerCase() === 'w') {
      setIndex(i => {
        const base = Math.floor(data.length / COL) * COL;
        return i < COL
          ? i + base >= data.length
            ? base - COL + i
            : base + i
          : i - COL;
      });
    }

    if (key.downArrow || input.toLowerCase() === 's') {
      setIndex(i => (i + COL > data.length - 1 ? i % COL : i + COL));
    }
  });

  if (status === 'loading') return <Spinner />;

  return (
    <Box flexDirection="column">
      {chunk(data, COL).map((tabs, i) => (
        <Box key={i} marginTop={1}>
          {tabs.map((item, j) => (
            <TabItem key={item.id} active={i * COL + j === index} item={item} />
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
        {item.name}
      </Text>
    </Box>
  );
};
