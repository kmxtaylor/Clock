import { StyleSheet, Pressable, View } from 'react-native';

import Text from 'components/Text';
import IconArrowUp from 'components/svgs/IconArrowUp';
import { useMode } from 'hooks/useMode'; // temp, for testing

const ButtonMoreLess = ({ isShowingMore, setIsShowingMore, style, ...rest }) => {
  const { mode, setMode, colors } = useMode(); // temp, for testing

  if (isShowingMore) {
    // Less btn
    return (
      <Pressable
        style={[styles.btn, style]}
        onPress={() => {
          // setMode(prevMode => {
          //   if (prevMode === 'day') {
          //     console.log(`setting mode: night`);
          //     return 'night';
          //   }
          //   else {
          //     console.log(`setting mode: day`);
          //     return 'day';
          //   }
          // });
          setIsShowingMore(prevIsShowingMore => !prevIsShowingMore)
        }}
        {...rest}
      >
        <View style={[styles.btn, styles.btnPadded, styles.btnBordered]}>
          <Text style={[styles.text, {color: colors?.btnLabel}]}>
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
        <Text style={[styles.text, {color: colors?.btnLabel}]}>
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
    borderColor: 'black',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    // color: 'grey',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginLeft: 12,
  },
});

export default ButtonMoreLess;