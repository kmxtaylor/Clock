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
      {/* all mode management must happen inside mode provider */}
      <StatusBar barStyle='light-content' />
      <SafeAreaView
        style={styles.container}
        onLayout={onLayoutRootView}
        testID='app-screen'
      >
          <BackgroundContainer>
            <View style={styles.overlay} />
            <ClockScreen />
          </BackgroundContainer>
      </SafeAreaView>
    </ModeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // paddingContainer: {
  //   flex: 1,
  //   padding: 20,
  //   // paddingHorizontal: 15,
  //   // paddingVertical: 20,
  //   justifyContent: 'space-between',
  // },
  overlay: { // overlay to slightly darken background image
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)', // (0.5 = 50% transparency)
  },
});

export default App;