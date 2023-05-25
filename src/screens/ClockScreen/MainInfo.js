import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

import Text from 'components/Text';
import IconSun from 'components/svgs/IconSun';
import IconMoon from 'components/svgs/IconMoon';

// import useIsMountedRef from 'hooks/useIsMountedRef';

const MainInfo = ({currentTime, timeZoneAbbrev, location, style, ...rest}) => {
  const [amOrPm, setAmOrPm] = useState(null);
  const [timeCategory, setTimeCategory] = useState(null);

  // const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (currentTime === null) {
      return;
    }

    // console.log(`currentTime: ${currentTime}`);

    let ampm = moment(currentTime).format('A');
    // console.log(`ampm: ${ampm}`)
    setAmOrPm(ampm);

    let hr = moment(currentTime).format('HH');
    let tc = null;
    if (hr >= 5 && hr < 12) {
      tc = 'morning';
    }
    else if (hr >= 12 && hr < 18) {
      tc = 'afternoon';
    }
    else if (hr >= 18 || hr < 5) {
      tc = 'evening';
    }
    else {
      console.log('something went wrong while calculating time category for', hr);
    }
    setTimeCategory(tc);
    // console.log(`hr: ${hr}; tc: ${tc}`)
  }, [currentTime]);

  const GreetingIcon = () => {
    if (timeCategory === 'morning' || timeCategory === 'afternoon') {
      return <IconSun />;
    }
    else if (timeCategory === 'evening') {
      return <IconMoon />;
    }
    else {
      return null;
    }
  };

  // const GreetingText = ({currentTime}) => {
  //   return (
  //     <Text style={styles.greetingText}>
  //       Good {timeCategory}, it's currently
  //     </Text>
  //   );
  // };

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.greetingRow}>
        <GreetingIcon />
        <Text style={styles.greetingText}>
          Good {timeCategory}, it's currently
        </Text>
      </View>
      <View style={styles.clockRow}>
        <Text style={styles.time}>{currentTime}</Text>
        <View style={styles.abbrevsCol}>
          <Text style={styles.amOrPm}>{amOrPm}</Text>
          { 
            timeZoneAbbrev &&
            <Text style={styles.timeZoneAbbrev}>{timeZoneAbbrev}</Text>
          }
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