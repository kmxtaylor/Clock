import { StyleSheet, View } from 'react-native';
import moment from 'moment';

import Text from 'components/Text';
import IconSun from 'components/svgs/IconSun';
import IconMoon from 'components/svgs/IconMoon';

import { useMode } from 'hooks/useMode';

const MainInfo = ({
  currentTime = null, timeErrMsg = null, timeZoneAbbrev = null, location = null, style, ...rest
}) => {
  const { mode } = useMode();

  const Greeting = ({ currentTime }) => {
    // console.log(`currentTime: ${currentTime}, location: ${location}`);
    // console.log(`timeErrMsg: ${timeErrMsg}`);
    if (!currentTime) {
      // console.log('No current time -- hiding greeting');
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
      <View style={styles.greetingRow}>
        { mode === 'night' ? <IconMoon /> : <IconSun /> }
        <Text style={styles.greetingText}>
          Good {timeCategory}, it's currently
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} {...rest}>
      <Greeting currentTime={currentTime} />
      <View style={styles.clockRow}>
        <Text style={styles.time}>
          {moment(currentTime).format('hh:mm')}
          {/* {moment(currentTime).format('hh:mm:ss')} */}
        </Text>
        <View style={styles.abbrevsCol}>
          { currentTime && (
            <Text style={styles.amOrPm}>{moment(currentTime).format('A')}</Text>
          )}
          { timeZoneAbbrev && (
            <Text style={styles.timeZoneAbbrev}>{timeZoneAbbrev}</Text>
          )}
        </View>
      </View>
      { location && (
        <View style={styles.locationRow}>
          <Text style={styles.location}>in {location}</Text>
        </View>
      )}
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
    fontSize: 15,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginLeft: 20,
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // textAlign: 'left',
    marginTop: 5,
  },
  time: {
    fontSize: 85,
    fontWeight: '700',
  },
  abbrevsCol: {
    // justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: 15,
    paddingBottom: 15,
  },
  locationRow: {
    alignItems: 'flex-start',
    marginTop: 15,
  },
  location: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default MainInfo;