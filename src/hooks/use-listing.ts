import { format } from 'date-fns';
import { RawNews, News } from '../types';
import useFetch from './use-fetch';

const baseUrl = 'https://today.line.me/api/v6/listings';

export default function useListing(
  listingId: string,
  parameters: { offset: number; length: number },
) {
  return useFetch<News[], { items: RawNews[] }>(
    `${baseUrl}/${listingId}?offset=${parameters.offset}&length=${parameters.length}`,
    {
      transform: data =>
        data.items.map(raw => ({
          id: raw.id,
          title: raw.title,
          excerpt: raw.shortDescription,
          publisher: raw.publisher,
          publishedAt: format(
            new Date(raw.publishTimeUnix),
            'yyyy-MM-dd HH:mm:ss',
          ),
          thumbnail: `https://obs.line-scdn.net/${raw.thumbnail.hash}`,
          url: `https://today.line.me/tw/v2/article/${raw.url.hash}`,
        })),
    },
  );
}
