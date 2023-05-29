import Text from 'components/Text';
import { StyleSheet } from 'react-native';

const ErrorDisplay = ({errMsg = null, ...rest}) => {
  if (!errMsg) {
    return null;
  }

  return (
    <Text
      style={styles.timeErrMsg}
      testID={'error-message'}
      {...rest}
    >{errMsg}</Text>
  );
};

const styles = StyleSheet.create({
  // text: {
  //   fontSize: 24,
  // },
  timeErrMsg: {
    fontSize: 60,
    fontWeight: '700',
    color: 'red',
    marginBottom: '50%', // centers timeErrMsg w/o changing item alignment
  },
});

export default ErrorDisplay;