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
    padding: 20,
    // paddingHorizontal: 15,
    // paddingVertical: 20,
    justifyContent: 'space-between',
  },
});

export default PaddingContainer;