import React, { useState } from 'react';

export interface Context {
  page: 'tab' | 'page';
  extra?: string;
}

function noop() {}
export const ConfigContext = React.createContext<Context>({ page: 'tab' });
export const ConfigSetterContext =
  React.createContext<React.Dispatch<React.SetStateAction<Context>>>(noop);

export function ConfigProvider({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  const [state, setter] = useState<Context>({ page: 'tab' });

  return (
    <ConfigSetterContext.Provider value={setter}>
      <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
    </ConfigSetterContext.Provider>
  );
}
