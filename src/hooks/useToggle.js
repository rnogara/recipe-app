import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((stt) => !stt), []);

  return [state, toggle];
};

export default useToggle; // imported by https://www.usehooks.com
