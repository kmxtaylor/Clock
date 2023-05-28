import { SafeAreaView, StatusBar } from 'react-native';

const Main = ({children, ...rest}) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }} {...rest}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default Main;
