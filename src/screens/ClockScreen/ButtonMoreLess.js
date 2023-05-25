import { StyleSheet, Pressable } from 'react-native';

import Text from 'components/Text';

// expansion should probably be handled in ClockScreen b/c affects ExpandedInfo
const ButtonMoreLess = ({ isExpanded, setIsExpanded, style, ...rest }) => {
  return (
    <Pressable
      style={[styles.btn, style]}
      onPress={() => setIsExpanded(!isExpanded)}
      {...rest}
    >
      <Text style={styles.text}>
        {isExpanded ? 'Less' : 'More'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 140,
    backgroundColor: 'white',
    borderRadius: 25,
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
    letterSpacing: 2,
  },
});

export default ButtonMoreLess;