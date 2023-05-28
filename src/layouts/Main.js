import { SafeAreaView, StatusBar } from 'react-native';
// import BackgroundContainer from 'layouts/BackgroundContainer';

const Main = ({children, ...rest}) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }} {...rest}>
        {/* <BackgroundContainer> */}
          {children}
        {/* </BackgroundContainer> */}
      </SafeAreaView>
    </>
  );
};

export default Main;
