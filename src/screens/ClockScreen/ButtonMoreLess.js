import { StyleSheet, Pressable, View } from 'react-native';

import Text from 'components/Text';
import IconArrowUp from 'components/svgs/IconArrowUp';
import { useMode } from 'hooks/useMode';

const ButtonMoreLess = ({ isShowingMore, setIsShowingMore, style, ...rest }) => {
  const { mode, setMode, colors } = useMode();

  if (isShowingMore) {
    // Less btn
    return (
      <Pressable
        style={[styles.btn, style]}
        onPress={() => {
          setIsShowingMore(prevIsShowingMore => !prevIsShowingMore)
        }}
        {...rest}
      >
        <View style={[styles.btn, styles.btnPadded, styles.btnBordered]}>
          <Text style={[styles.text, { color: colors?.btnLabel }]}>
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
        <Text style={[styles.text, { color: colors?.btnLabel }]}>
          More
        </Text>
        <IconArrowUp style={{ transform: [{ rotate: '180deg' }] }} />
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
    // show border when info expanded:
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'black',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginLeft: 12,
  },
});

export default ButtonMoreLess;