import React from 'react';
import { Static, Text } from 'ink';
import Spinner from 'ink-spinner';
import NewsEntry from '../components/news-entry';
import useNews from '../hooks/use-news';

export default function App() {
  const { data, status } = useNews();

  if (status === 'loading') {
    return (
      <Text color="white">
        <Spinner type="dots" /> fetching
      </Text>
    );
  }

  return (
    <Static items={data}>
      {item => <NewsEntry key={item.id} item={item} />}
    </Static>
  );
}
