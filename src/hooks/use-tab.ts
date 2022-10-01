import type { Tab } from '../types';
import useFetch from './use-fetch';

export default function useTab() {
  return useFetch<Tab[]>(
    'https://today.line.me/webapi/portal/tabs?country=tw',
    {
      transform: items =>
        items.filter(
          item =>
            !['recommendation', 'subscription'].includes(
              item.portalPageUrlPath,
            ),
        ), // Filter out empty recommendation list
    },
  );
}
