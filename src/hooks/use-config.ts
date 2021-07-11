import { useContext } from 'react';
import { ConfigContext, ConfigSetterContext } from '../context/config-context';

function useConfigState() {
  const state = useContext(ConfigContext);
  if (typeof state === 'undefined') {
    throw new TypeError('useConfigState must be used within a ConfigProvider');
  }

  return state;
}

function useConfigSetter() {
  const setter = useContext(ConfigSetterContext);
  if (typeof setter === 'undefined') {
    throw new TypeError('useConfigSetter must be used within a ConfigProvider');
  }

  return setter;
}

export { useConfigState, useConfigSetter };
