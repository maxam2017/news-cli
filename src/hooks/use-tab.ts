import type { Tab } from '../types';
import useFetch from './use-fetch';

export default function useTab() {
  return useFetch<Tab[]>('https://today.line.me/api/v6/portals/tw/tabs', {
    transform: items =>
      items.filter(item => item.portalPageUrlPath !== 'recommendation'), // Filter out empty recommendation list
  });
}
