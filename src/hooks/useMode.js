import { useContext } from 'react';
import { ModeContext, Modes } from 'contexts/Mode';

export const useMode = () => {
  const { mode, setMode, colors } = useContext(ModeContext);
  return { mode, setMode, colors, Modes };
};