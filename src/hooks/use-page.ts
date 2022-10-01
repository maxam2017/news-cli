import uniqby from 'lodash.uniqby';
import type { Page, RawPage } from '../types';
import useFetch from './use-fetch';

const baseUrl = 'https://today.line.me/webapi/portal/page';

export default function usePage(portalPageUrlPath: string) {
  return useFetch<Page, RawPage>(`${baseUrl}/${portalPageUrlPath}?country=tw`, {
    transform(page) {
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
