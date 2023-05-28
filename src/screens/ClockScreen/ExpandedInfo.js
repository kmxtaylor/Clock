import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import PaddingContainer from 'layouts/PaddingContainer';

const renderInfoRows = (timeDetails) => {
  const displayDetails = {
    'Current Timezone': timeDetails?.timeZone.full,
    'Day of the Year': timeDetails?.dayOfYear,
    'Day of the Week': timeDetails?.dayOfWeek,
    'Week Number': timeDetails?.weekNumber,
  };

  const infoRows = [];

  for (const [label, val] of Object.entries(displayDetails)) {
    infoRows.push(
      <View key={label} style={styles.row}>
        <Text style={styles.leftColText}>{label}</Text>
        <Text style={styles.rightColText}>{val}</Text>
      </View>
    );
  }

  return infoRows;
};

const ExpandedInfo = ({timeDetails = null, style, ...rest}) => {
  if (!timeDetails) {
    return null;
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      <PaddingContainer>
        { renderInfoRows(timeDetails) }
      </PaddingContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 200,
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColText: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlignVertical: 'center',
  },
  rightColText: {
    fontSize: 18,
    fontWeight: '700',
    textAlignVertical: 'center',
  },
});

export default ExpandedInfo;