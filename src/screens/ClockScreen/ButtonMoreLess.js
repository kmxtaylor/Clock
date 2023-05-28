import { StyleSheet, Pressable, View } from 'react-native';

import Text from 'components/Text';
import IconArrowUp from 'components/svgs/IconArrowUp';

import { useMode } from 'hooks/useMode'; // temp, for testing

// const IconArrow = ({ isShowingMore }) => {
//   if (isShowingMore) {
//     return (
//       <IconArrowUp /> // arrow up
//     );
//   }
//   else {
//     return (
//       <IconArrowUp style={{transform: [{ rotate: '180deg' }]}} /> // arrow down
//     );
//   }
// };

// expansion should probably be handled in ClockScreen b/c affects ExpandedInfo
const ButtonMoreLess = ({ isShowingMore, setIsShowingMore, style, ...rest }) => {
  const { mode, setMode } = useMode(); // temp, for testing

  if (isShowingMore) {
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
          setIsShowingMore(prevIsShowingMore => {
            console.log(`setting isShowingMore: ${!prevIsShowingMore}`);
            return !prevIsShowingMore;
          });
        }}
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
    return (
      <Pressable
        style={[styles.btn, styles.btnPadded, style]}
        onPress={() => {
          console.log(`setting isShowingMore: ${!isShowingMore}`);
          setIsShowingMore(!isShowingMore);
        }}
        {...rest}
      >
        <Text style={styles.text}>
          More
        </Text>
        <IconArrowUp style={{transform: [{ rotate: '180deg' }]}} />
      </Pressable>
    );
  }
  // return (
  //   <Pressable
  //     style={[styles.btn, style]}
  //     onPress={() => {
  //       console.log(`setting isShowingMore: ${!isShowingMore}`);
  //       setIsShowingMore(!isShowingMore);
  //     }}
  //     {...rest}
  //   >
  //     <Text style={styles.text}>
  //       {isShowingMore ? 'Less' : 'More'}
  //     </Text>
  //     <IconArrow isShowingMore={isShowingMore} />
  //   </Pressable>
  // );
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
    // padding: 5,

    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // paddingVertical: 10,
    // textAlign: 'left',
    // textAlignVertical: 'center',
  },
  btnPadded: {
    padding: 5,
  },
  btnBordered: {
    // padding: 5,

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