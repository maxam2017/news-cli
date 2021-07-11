import { useInput } from 'ink';
import React, { useState } from 'react';
import { useConfigState } from '../hooks/use-config';
import PageView from './page-view';
import ShortcutDialog from './shortcut-dialog';
import TabsView from './tabs-view';

export default function App() {
  const config = useConfigState();

  const [open, setOpen] = useState(false);
  useInput((input, key) => {
    if (input === '?') setOpen(true);
    if (input === 'q' || key.escape) setOpen(false);
  });

  if (open) {
    return <ShortcutDialog />;
  }

  if (config.page === 'tab') {
    return <TabsView />;
  }

  if (config.page === 'page' && config.extra) {
    return <PageView portalPageId={config.extra} />;
  }

  return null;
}
