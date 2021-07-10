import React from 'react';
import { Static, Text } from 'ink';
import Spinner from 'ink-spinner';
import useListing from '../hooks/use-listing';
import NewsEntry from './news-entry';

export default function ListingView() {
  const { data, status } = useListing('66d43f54-6e45-4231-81d8-9b132a897254', {
    offset: 0,
    length: 5,
  });

  if (status === 'loading') {
    return (
      <Text color="white">
        <Spinner type="dots" /> fetching
      </Text>
    );
  }

  return (
    <Static items={data ?? []}>
      {item => <NewsEntry key={item.id} item={item} />}
    </Static>
  );
}
