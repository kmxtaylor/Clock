// import { useCallback } from 'react';

// import {
//   useFonts,
//   Roboto_400Regular,
//   Roboto_500Medium,
//   Roboto_700Bold
// } from '@expo-google-fonts/roboto';
// import * as SplashScreen from 'expo-splash-screen';

import { ModeProvider } from 'contexts/Mode';
import ClockScreen from 'screens/ClockScreen';
import Main from 'layouts/Main';

// SplashScreen.preventAutoHideAsync();

const App = () => {
  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Roboto_700Bold
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null; // all hooks calls must be before return
  // }

  return (
    <ModeProvider>
      <Main
        // onLayout={onLayoutRootView}
      >
        <ClockScreen />
      </Main>
    </ModeProvider>
  );
};

export default App;