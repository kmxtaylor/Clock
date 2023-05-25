// import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

import Text from 'components/Text';
import IconSun from 'components/svgs/IconSun';
import IconMoon from 'components/svgs/IconMoon';

// import useIsMountedRef from 'hooks/useIsMountedRef';

const MainInfo = ({currentTime, timeZoneAbbrev, location, style, ...rest}) => {
  // const isMountedRef = useIsMountedRef();

  const Greeting = ({ currentTime }) => {
    // console.log(`currentTime: ${currentTime}`);
    if (!currentTime) {
      return null;
    }

    let hr = moment(currentTime).format('HH');
    let timeCategory = null;
    if (hr >= 5 && hr < 12) {
      timeCategory = 'morning';
    }
    else if (hr >= 12 && hr < 18) {
      timeCategory = 'afternoon';
    }
    else if (hr >= 18 || hr < 5) {
      timeCategory = 'evening';
    }
    else {
      console.log('error while calculating time category for', hr);
    }
    // console.log(`hr: ${hr}; tc: ${tc}`)

    return (
      <>
        { timeCategory === 'evening' ? <IconMoon /> : <IconSun /> }
        <Text style={styles.greetingText}>
          Good {timeCategory}, it's currently
        </Text>
      </>
    );
  };

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.greetingRow}>
        <Greeting currentTime={currentTime} />
      </View>
      <View style={styles.clockRow}>
        <Text style={styles.time}>{currentTime}</Text>
        <View style={styles.abbrevsCol}>
          <Text style={styles.amOrPm}>{moment(currentTime).format('A')}</Text>
          { timeZoneAbbrev && (
            <Text style={styles.timeZoneAbbrev}>{timeZoneAbbrev}</Text>
          )}
        </View>
      </View>
      <View style={styles.locationRow}>
        <Text style={styles.location}>in {location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  greetingRow: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginLeft: 20,
  },
  clockRow: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  time: {
    fontSize: 60,
    fontWeight: '700',
  },
  abbrevsCol: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // textAlign: 'left',
  },
  locationRow: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // textAlign: 'left',
  },
  location: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default MainInfo;