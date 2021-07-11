import React from 'react';
import { useConfigState } from '../hooks/use-config';
import PageView from './page-view';
import TabsView from './tabs-view';

export default function App() {
  const config = useConfigState();

  if (config.page === 'tab') {
    return <TabsView />;
  }

  if (config.page === 'page' && config.extra) {
    return <PageView portalPageId={config.extra} />;
  }

  return null;
}
