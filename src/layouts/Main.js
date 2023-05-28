import { SafeAreaView, StatusBar } from 'react-native';
import BackgroundContainer from 'layouts/BackgroundContainer';

const Main = ({children}) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <BackgroundContainer>
          {children}
        </BackgroundContainer>
      </SafeAreaView>
    </>
  );
};

export default Main;
