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
import { useMode } from 'hooks/useMode';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [bgImg, setBgImg] = useState(null);

  const { mode } = useMode();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  useEffect(() => {
    let requiredBgImg = require('/../assets/images/bg-image-nighttime.jpg');
    if (mode === 'day') {
      requiredBgImg = require('/../assets/images/bg-image-daytime.jpg');
    }
    setBgImg(requiredBgImg);
    console.log('read new mode', mode);
  }, [mode]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // all hooks calls must be before return
  }

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView
        style={styles.container}
        onLayout={onLayoutRootView}
        testID='app-screen'
      >
        <ModeProvider>
          <ImageBackground
            source={bgImg}
            // source={require(getBgImg)}
            // source={bgImg}
            // source={require('/../assets/images/bg-image-nighttime.jpg')}
            style={styles.paddingContainer}
            resizeMode='cover'
          >
            <View style={styles.overlay} />
            <ClockScreen />
          </ImageBackground>
        </ModeProvider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingContainer: {
    flex: 1,
    padding: 20,
    // paddingHorizontal: 15,
    // paddingVertical: 20,
    justifyContent: 'space-between',
  },
  overlay: { // overlay to slightly darken background image
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)', // (0.5 = 50% transparency)
  },
});

export default App;