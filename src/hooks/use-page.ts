import uniqby from 'lodash.uniqby';
import { Page, RawPage } from '../types';
import useFetch from './use-fetch';

const baseUrl = 'https://today.line.me/api/v6/portals/tw/pages';

export default function usePage(portalPageId: string) {
  return useFetch<Page, RawPage>(`${baseUrl}/${portalPageId}`, {
    transform: page => {
      return {
        id: page.id,
        name: page.name,
        listings: uniqby(
          page.modules
            .filter(m => m.source === 'LISTING' && Array.isArray(m.listings))
            .flatMap(m =>
              m.listings.map(listing => ({
                id: listing.id,
                offset: listing.offset,
                length: listing.length,
              })),
            ),
          'id',
        ),
      };
    },
  });
}
