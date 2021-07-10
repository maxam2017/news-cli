import { useEffect, useReducer, Reducer, useMemo } from 'react';
import fetch from 'node-fetch';

type State<T> = {
  data?: T;
  status: 'init' | 'loading' | 'fetched' | 'error';
};

type ACTIONTYPE<T> =
  | { type: 'LOADING' }
  | { type: 'FETCHED'; payload: T }
  | { type: 'ERROR' };

type APIReducer<T> = Reducer<State<T>, ACTIONTYPE<T>>;

function merge<T>(a: T, b: T): T {
  if (typeof a === 'undefined') return b;
  if (typeof b === 'undefined') return a;
  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b] as unknown as T;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    return { ...a, ...b };
  }

  return a;
}

/**
 * @description hook for fetch
 * @example
 * const { data, status } = useFetch('/api/list', { transform: data => data.items });
 * if (status === 'loading') return <Spinner />;
 * if (status === 'error') return <ErrorView />;
 * if (status === 'fetched') return <ListView data={data} />;
 */
export default function useFetch<T = unknown, S = T>(
  url: string,
  options?: { transform?(raw: S): T },
) {
  const [state, dispatch] = useReducer<APIReducer<T>>(
    (state, action) => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, status: 'loading' };
        case 'FETCHED':
          return {
            status: 'fetched',
            data: merge(state.data, action.payload),
          };
        case 'ERROR':
          return { ...state, status: 'error' };
        default:
          return state;
      }
    },
    {
      status: 'init',
    },
  );

  useEffect(() => {
    (async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(url);
        const data = (await response.json()) as S;
        dispatch({
          type: 'FETCHED',
          payload: options?.transform?.(data) ?? (data as unknown as T),
        });
      } catch {
        dispatch({ type: 'ERROR' });
      }
    })();
  }, [url, options?.transform]);

  return useMemo(
    () => ({
      status: state.status,
      data: state.data,
    }),
    [state.data, state.status],
  );
}
