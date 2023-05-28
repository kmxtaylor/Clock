import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  ImageBackground
} from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

import ClockScreen from 'screens/ClockScreen';
import { ModeProvider } from 'contexts/Mode';
import Main from './layouts/Main';
import BackgroundContainer from 'layouts/BackgroundContainer';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // all hooks calls must be before return
  }

  return (
    <ModeProvider>
      <Main
        onLayout={onLayoutRootView}
      >
        <ClockScreen />
      </Main>
    </ModeProvider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   // paddingContainer: {
//   //   flex: 1,
//   //   padding: 20,
//   //   // paddingHorizontal: 15,
//   //   // paddingVertical: 20,
//   //   justifyContent: 'space-between',
//   // },
// });

export default App;