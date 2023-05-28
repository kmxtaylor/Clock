import { createContext, useState } from 'react';

const Modes = ['day', 'night'];

const ModeContext = createContext({
  mode: 'day',
  setMode: () => {},
  // loading: true, // mainly for using async storage -- otherwise unnecessary
});

const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('day');
  // const [loading, setLoading] = useState(true);

  return (
    <ModeContext.Provider 
      value={{
        mode,
        setMode, 
        // loading
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export { ModeContext, ModeProvider, Modes };