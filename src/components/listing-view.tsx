import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import useListing from '../hooks/use-listing';
import NewsEntry from './news-entry';

type Props = {
  listingId: string;
  offset: number;
  length: number;
};

export default function ListingView({ listingId, ...parameters }: Props) {
  const { data, status } = useListing(listingId, parameters);

  if (status === 'loading') {
    return (
      <Text color="white">
        <Spinner type="dots" />
      </Text>
    );
  }

  return (
    <Box flexDirection="column">
      {data?.map(item => (
        <NewsEntry key={item.id} item={item} />
      ))}
    </Box>
  );
}
