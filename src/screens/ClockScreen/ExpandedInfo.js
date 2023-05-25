import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

import Text from 'components/Text';

// import useIsMountedRef from 'hooks/useIsMountedRef';

const renderInfoRows = (timeDetails) => {
  // const displayDetails = [
  //   { 'Current Timezone': timeDetails?.timeZone.full },
  //   { 'Day of the Year': timeDetails?.dayOfYear },
  //   { 'Day of the Week': timeDetails?.dayOfWeek },
  //   {'Week Number': timeDetails?.weekNumber },
  // ];

  const displayDetails = {
    'Current Timezone': timeDetails?.timeZone.full,
    'Day of the Year': timeDetails?.dayOfYear,
    'Day of the Week': timeDetails?.dayOfWeek,
    'Week Number': timeDetails?.weekNumber,
  };

  const infoRows = [];

  for (const [label, val] of Object.entries(displayDetails)) {
    infoRows.push(
      <View style={styles.row}>
        <Text style={styles.leftColText}>{label}</Text>
        <Text style={styles.rightColText}>{val}</Text>
      </View>
    );
  }

  return infoRows;
};

const MainInfo = ({timeDetails = null, style, ...rest}) => {

  // {
  //   'Current Timezone': timeDetails?.timeZone.full,
  //   'Day of the Year': timeDetails?.dayOfYear,
  //   'Day of the Week': timeDetails?.dayOfWeek,
  //   'Week Number': timeDetails?.weekNumber,
  // };

  const displayDetails = [
    { 'Current Timezone': timeDetails?.timeZone.full },
    { 'Day of the Year': timeDetails?.dayOfYear },
    { 'Day of the Week': timeDetails?.dayOfWeek },
    {'Week Number': timeDetails?.weekNumber },
  ];

  return (
    <View style={[styles.container, style]} {...rest}>
      { renderInfoRows(timeDetails) }
      {/* { displayDetails.map((label) => (
        <View style={styles.row}>
          <Text style={styles.leftColText}>{label}</Text>
          <Text style={styles.rightColText}>{}</Text>
        </View>
      )) } */}
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
    // textTransform: 'uppercase',
    // letterSpacing: 2,
    textAlignVertical: 'center',
  },
});

export default MainInfo;