import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useMode } from 'hooks/useMode';


const BackgroundContainer = ({ children }) => {
  const [bgImg, setBgImg] = useState(null);

  const { mode } = useMode();

  useEffect(() => {
    let requiredBgImg = require('/../assets/images/bg-image-nighttime.jpg');
    if (mode === 'day') {
      requiredBgImg = require('/../assets/images/bg-image-daytime.jpg');
    }
    setBgImg(requiredBgImg);
    console.log('read new mode', mode);
  }, [mode]);

  return (
    <ImageBackground
      source={bgImg}
      // source={require(getBgImg)}
      // source={bgImg}
      // source={require('/../assets/images/bg-image-nighttime.jpg')}
      style={styles.paddingContainer}
      resizeMode='cover'
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  paddingContainer: {
    flex: 1,
    padding: 20,
    // paddingHorizontal: 15,
    // paddingVertical: 20,
    justifyContent: 'space-between',
  },
});

export default BackgroundContainer;