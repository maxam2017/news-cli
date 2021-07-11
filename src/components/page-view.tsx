import React from 'react';
import Spinner from 'ink-spinner';
import usePage from '../hooks/use-page';
import ListCarousel from './listing-carousel';

export default function PageView({ portalPageId }: { portalPageId: string }) {
  const { data, status } = usePage(portalPageId);

  if (status === 'loading') return <Spinner />;

  return <ListCarousel items={data?.listings ?? []} />;
}
