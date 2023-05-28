import { StyleSheet, View } from 'react-native';

const PaddingContainer = ({ style, children, ...rest }) => {
  return (
    <View style={[styles.paddingContainer, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
});

export default PaddingContainer;