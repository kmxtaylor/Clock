import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';

import useIsMountedRef from 'hooks/useIsMountedRef';

const Header = ({style, ...rest}) => {
  const isMountedRef = useIsMountedRef();

  // ...

  return (
    <View style={[styles.container, style]} {...rest}>
      <View>
        <Text style={styles.quoteText}>Quote Text</Text>
        <Text style={styles.quoteAuthor}>Author</Text>
      </View>
      {/* SVG: icon refresh */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  quoteText: {},
  quoteAuthor: {},
});

export default Header;