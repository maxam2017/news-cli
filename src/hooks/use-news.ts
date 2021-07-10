import { useEffect, useReducer } from 'react';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import { RawNews, News } from '../types';

const BASE_URL = 'https://today.line.me/api/v6/listings';
const LISTING_ID = '66d43f54-6e45-4231-81d8-9b132a897254';

const transform = (raw: RawNews): News => {
  return {
    id: raw.id,
    title: raw.title,
    excerpt: raw.shortDescription,
    publisher: raw.publisher,
    publishedAt: format(new Date(raw.publishTimeUnix), 'yyyy-MM-dd HH:mm:ss'),
    thumbnail: `https://obs.line-scdn.net/${raw.thumbnail.hash}`,
    url: `https://today.line.me/tw/v2/article/${raw.url.hash}`,
  };
};

interface Result {
  data: News[];
  status: 'init' | 'loading' | 'fetched' | 'error';
}

const initialState: Result = { status: 'init', data: [] };

type ACTIONTYPE =
  | { type: 'INIT' }
  | { type: 'LOADING' }
  | { type: 'FETCHED'; payload: News[] }
  | { type: 'ERROR' };

function reducer(state: typeof initialState, action: ACTIONTYPE): Result {
  switch (action.type) {
    case 'INIT':
      return initialState;
    case 'LOADING':
      return { ...state, status: 'loading' };
    case 'FETCHED':
      return { status: 'fetched', data: [...state.data, ...action.payload] };
    case 'ERROR':
      return { ...state, status: 'error' };
    default:
      return state;
  }
}

export default function useNews() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(
          `${BASE_URL}/${LISTING_ID}?offset=0&length=5`,
        );
        const data = (await response.json()) as { items: RawNews[] };
        dispatch({
          type: 'FETCHED',
          payload: data.items.map(raw => transform(raw)),
        });
      } catch {
        dispatch({ type: 'ERROR' });
      }
    })();
  }, []);

  return state;
}
