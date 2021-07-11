import React from 'react';
import { Box } from 'ink';
import Spinner from 'ink-spinner';
import usePage from '../hooks/use-page';
import ListingView from './listing-view';

export default function PageView({ portalPageId }: { portalPageId: string }) {
  const { data, status } = usePage(portalPageId);

  if (status === 'loading') return <Spinner />;

  return (
    <Box>
      {data?.listings.map(listing => (
        <ListingView
          key={listing.id}
          listingId={listing.id}
          offset={listing.offset}
          length={listing.length}
        />
      ))}
    </Box>
  );
}
