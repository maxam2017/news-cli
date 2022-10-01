import React from 'react';
import Spinner from 'ink-spinner';
import usePage from '../hooks/use-page';
import ListCarousel from './listing-carousel';

export default function PageView({
  portalPageUrlPath,
}: {
  portalPageUrlPath: string;
}) {
  const { data, status } = usePage(portalPageUrlPath);

  if (status === 'loading') return <Spinner />;

  return <ListCarousel items={data?.listings ?? []} />;
}
