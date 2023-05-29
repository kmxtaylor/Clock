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
  // currentTime = '2023-05-28 00:24:06';
  // console.log(`currentTime: ${currentTime}`);

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
        { mode === 'night' ?
          <IconMoon testID='icon-moon' /> :
          <IconSun testID='icon-sun' />
        }
        <Text style={styles.greetingText} testID='greeting-text'>
          Good {timeCategory}, it's currently
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]} {...rest}>
      <Greeting currentTime={currentTime} />
      <View style={styles.clockRow}>
        <Text style={styles.time} testID='time'>
          {moment(currentTime).format('h:mm')}
          {/* {moment(currentTime).format('hh:mm:ss')} */}
        </Text>
        <View style={styles.abbrevsCol}>
          { currentTime && (
            <Text style={styles.amOrPm} testID='am-or-pm'>{moment(currentTime).format('A')}</Text>
          )}
          { timeZoneAbbrev && (
            <Text style={styles.timeZoneAbbrev} testID='time-zone-abbrev'>{timeZoneAbbrev}</Text>
          )}
        </View>
      </View>
      { location && (
        <View style={styles.locationRow}>
          <Text style={styles.location} testID='location'>in {location}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  greetingRow: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  greetingText: {
    fontSize: 15,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginLeft: 15,
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // textAlign: 'left',
    // marginTop: 5,
  },
  time: {
    fontSize: 85,
    fontWeight: '700',
  },
  abbrevsCol: {
    // justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: 10,
    paddingBottom: 20,
  },
  locationRow: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  location: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default MainInfo;