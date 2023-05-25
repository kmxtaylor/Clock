import { useCallback } from 'react';
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
    return null;
  }

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView
        style={styles.container}
        onLayout={onLayoutRootView}
        testID='app-screen'
      >
        <ImageBackground
          // source={require('/../assets/images/bg-image-daytime.jpg')}
          source={require('/../assets/images/bg-image-nighttime.jpg')}
          style={[styles.paddingContainer, styles.bgImage]}
          resizeMode='cover'
        >
          <ClockScreen />
        </ImageBackground>
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

    // backgroundColor:'black',
  },
  bgImage: {
    // opacity: 0.9,
  },
});

export default App;