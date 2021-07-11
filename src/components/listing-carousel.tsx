import { Box, Text, useInput } from 'ink';
import React, { useState } from 'react';

import { Listing } from '../types';
import { useConfigSetter } from '../hooks/use-config';
import ListingView from './listing-view';

interface Props {
  items: Listing[];
}

export default function ListCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const setter = useConfigSetter();

  useInput((input, key) => {
    if (key.leftArrow || input.toLowerCase() === 'a') {
      setIndex(i => (i - 1 + items.length) % items.length);
    }

    if (key.rightArrow || input.toLowerCase() === 'd') {
      setIndex(i => (i + 1) % items.length);
    }

    if (input.toLowerCase() === 'q' || key.escape) {
      setter({ page: 'tab' });
    }
  });

  const item = items[index];

  return (
    <>
      {item && (
        <ListingView
          listingId={item.id}
          offset={item.offset}
          length={Math.min(item.length, 5)}
        />
      )}
      <Box justifyContent="flex-end" width={80}>
        <Text>
          {index + 1} / {items.length}
        </Text>
      </Box>
    </>
  );
}
