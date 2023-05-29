import { StyleSheet, View } from 'react-native';

import Text from 'components/Text';
import PaddingContainer from 'layouts/PaddingContainer';

import { useMode } from 'hooks/useMode';

const renderInfoRows = (timeDetails) => {
  const { colors } = useMode();

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
        <Text style={[{color: colors?.text ?? '#3A3A3A'}, styles.leftColText]}>{label}</Text>
        <Text style={[{color: colors?.text ?? '#3A3A3A'}, styles.rightColText]}>{val}</Text>
      </View>
    );
  }

  return infoRows;
};

const ExpandedInfo = ({timeDetails = null, style, ...rest}) => {
  const { colors } = useMode();

  if (!timeDetails) {
    return null;
  }

  return (
    <View
      style={[{backgroundColor: colors?.background ?? '#E9E9E9'}, styles.container, style]}
      {...rest}
    >
      <PaddingContainer>
        { renderInfoRows(timeDetails) }
      </PaddingContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColText: {
    fontSize: 11,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlignVertical: 'center',
  },
  rightColText: {
    fontSize: 18,
    fontWeight: '700',
    textAlignVertical: 'center',
  },
});

export default ExpandedInfo;