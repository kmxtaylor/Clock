import Text from 'components/Text';
import { StyleSheet } from 'react-native';

const ErrorDisplay = ({ errMsg = null, ...rest }) => {
  if (!errMsg) {
    return null;
  }

  return (
    <Text style={styles.timeErrMsg} testID={'error-display'} {...rest}>
      {errMsg}
    </Text>
  );
};

const styles = StyleSheet.create({
  timeErrMsg: {
    fontSize: 50,
    fontWeight: '700',
    color: 'red',
    marginBottom: 100,
  },
});

export default ErrorDisplay;