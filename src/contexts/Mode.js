import { createContext, useState } from 'react';
import Colors from 'constants/Colors';

const Modes = ['day', 'night'];

const ModeContext = createContext({
  mode: '',
  setMode: () => { },
  colors: {},
});

const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null); // init to null to prevent flickering
  const colors = Colors[mode];

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        colors,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export { ModeContext, ModeProvider, Modes };