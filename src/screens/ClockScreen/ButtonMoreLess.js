import { StyleSheet, Pressable, View } from 'react-native';

import Text from 'components/Text';
import IconArrowUp from 'components/svgs/IconArrowUp';

const ButtonMoreLess = ({ isShowingMore, setIsShowingMore, style, ...rest }) => {
  if (isShowingMore) {
    // Less btn
    return (
      <Pressable
        style={[styles.btn, style]}
        onPress={() => (
          setIsShowingMore(prevIsShowingMore => !prevIsShowingMore)
        )}
        {...rest}
      >
        <View style={[styles.btn, styles.btnPadded, styles.btnBordered]}>
          <Text style={styles.text}>
            Less
          </Text>
          <IconArrowUp />
        </View>
      </Pressable>
    );
  }
  else {
    // More btn
    return (
      <Pressable
        style={[styles.btn, styles.btnPadded, style]}
        onPress={() => (
          setIsShowingMore(prevIsShowingMore => !prevIsShowingMore)
        )}
        {...rest}
      >
        <Text style={styles.text}>
          More
        </Text>
        <IconArrowUp style={{transform: [{ rotate: '180deg' }]}} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: 140,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  btnPadded: {
    padding: 5,
  },
  btnBordered: {
    // show border when expanded:
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'purple',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginLeft: 15,
  },
});

export default ButtonMoreLess;