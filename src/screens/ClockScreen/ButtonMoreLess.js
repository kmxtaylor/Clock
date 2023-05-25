import { StyleSheet, Pressable } from 'react-native';

import Text from 'components/Text';
import IconArrowUp from 'components/svgs/IconArrowUp';

const IconArrow = ({ showingMore }) => {
  if (showingMore) {
    return (
      <IconArrowUp /> // arrow up
    );
  }
  else {
    return (
      <IconArrowUp style={{transform: [{ rotate: '180deg' }]}} /> // arrow down
    );
  }
};

// expansion should probably be handled in ClockScreen b/c affects ExpandedInfo
const ButtonMoreLess = ({ showingMore, setShowingMore, style, ...rest }) => {
  return (
    <Pressable
      style={[styles.btn, style]}
      onPress={() => setShowingMore(!showingMore)}
      {...rest}
    >
      <Text style={styles.text}>
        {showingMore ? 'Less' : 'More'}
      </Text>
      <IconArrow showingMore={showingMore} />
    </Pressable>
  );
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
    padding: 5,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // paddingVertical: 10,
    // textAlign: 'left',
    // textAlignVertical: 'center',

    // show border when expanded:
    // borderWidth: 2,
    // borderStyle: 'dashed',
    // borderColor: 'purple',
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