import type { Reducer } from 'react';
import { useEffect, useReducer, useMemo, useRef } from 'react';
import fetch from 'node-fetch';

type State<T> = {
  data?: T;
  status: 'init' | 'loading' | 'fetched' | 'error';
};

type ActionType<T> =
  | { type: 'INIT' }
  | { type: 'LOADING' }
  | { type: 'FETCHED'; payload: T }
  | { type: 'ERROR' };

type ApiReducer<T> = Reducer<State<T>, ActionType<T>>;

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
  options?: { refresh?: boolean; transform?(raw: S): T },
) {
  const optionsRef = useRef(options);
  const [state, dispatch] = useReducer<ApiReducer<T>>(
    (state, action) => {
      switch (action.type) {
        case 'INIT':
          return { status: 'init' };
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
    if (options?.refresh) {
      dispatch({ type: 'INIT' });
    }

    (async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(url);
        const data = (await response.json()) as S;
        dispatch({
          type: 'FETCHED',
          payload:
            optionsRef.current?.transform?.(data) ?? (data as unknown as T),
        });
      } catch {
        dispatch({ type: 'ERROR' });
      }
    })();
  }, [url]);

  return useMemo(
    () => ({
      status: state.status,
      data: state.data,
    }),
    [state.data, state.status],
  );
}
