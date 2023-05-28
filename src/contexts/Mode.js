import { createContext, useState } from 'react';
import Colors from 'constants/Colors';

const Modes = ['day', 'night'];

const ModeContext = createContext({
  mode: '',
  setMode: () => {},
  colors: {},
  // loading: true, // mainly for using async storage -- otherwise unnecessary
});

const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null); // init to null to prevent flickering
  // const [loading, setLoading] = useState(true);
  const colors = Colors[mode];

  return (
    <ModeContext.Provider 
      value={{
        mode,
        setMode, 
        colors,
        // loading
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export { ModeContext, ModeProvider, Modes };