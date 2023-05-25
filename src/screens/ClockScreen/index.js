import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import Text from 'components/Text';
import Header from './Header';
import MainInfo from './MainInfo';
import ButtonMoreLess from './ButtonMoreLess';
import ExpandedInfo from './ExpandedInfo';

import useIsMountedRef from 'hooks/useIsMountedRef';

const ClockScreen = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [location, setLocation] = useState(null);

  /**
   * timeDetails:
   * {
   *  timeZone: {
   *    abbrev: "PDT",
   *    full: 'America/Los_Angeles',
   *  },
   *  dayOfYear: 144,
   *  dayOfWeek: 2,
   *  weekNumber: 21,
   * }
   * */ 
  const [timeDetails, setTimeDetails] = useState(null);

  const [timeErrMsg, setTimeErrMsg] = useState(null);

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const ipResponse = await axios.get('http://worldtimeapi.org/api/ip');
        // const ipResponse = null; // for testing only
        const ipData = ipResponse.data;
        // if (ipData) {
          // console.log(`ipData: ${JSON.stringify(ipData, null, 2)}`);
          // const currentTime = moment(ipData.datetime).format('HH:mm:ss');
          const currentTime = moment(ipData.datetime).format('YYYY-MM-DD HH:mm:ss');
          
          if (isMountedRef.current) {
            setIpAddress(ipData.client_ip);
            setCurrentTime(currentTime);
            let td = {
              timeZone: {
                abbrev: ipData.abbreviation,
                full: ipData?.timezone.replace(/_/g, " "), // replace _ w/ spaces
              },
              dayOfYear: ipData.day_of_year,
              dayOfWeek: ipData.day_of_week,
              weekNumber: ipData.week_number,
            };
            setTimeDetails(td);
            // console.log(JSON.stringify(td, null, 2))
            setTimeErrMsg(null);
          }
        // }
        // else {
        //   setTimeErrMsg("Can't get time");
        // }
      }
      catch (error) {
        console.log(
          'Error fetching time data:',
          error,
          // JSON.stringify(error, null, 2)
        );
        setTimeDetails(null);
        setTimeErrMsg("Clock Unavailable");
      }
    };

    fetchTimeData();
      
    // const msInMin = 60000;
    // const msIn3Sec = 3000;
    const msInSec = 1000;
    const intervalMS = msInSec;
    let intervalId = null;

    // uncomment this only when needed (avoid getting blocked by API again)
    // if (intervalMS >= 1000) { // sets hard limit to avoid over-querying API
    //   intervalId = setInterval( // exec on an interval
    //     fetchTimeData,
    //     intervalMS,
    //   );
    // }

    // clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        // fetch location data
        const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        // const locationResponse = null;  // for testing only
        const locationData = locationResponse?.data;
        // console.log(locationData);

        const location = (locationData.city && locationData.region)
          ? `${locationData.city}, ${locationData.region}`
          : null;

        if (isMountedRef.current) {
          setLocation(location);
        }
      }
      catch (error) {
        console.log('Error fetching time data:', error);
      }
    };
    fetchLocationData();
  }, [ipAddress]); // only update location if ip address changes

  return (
    <>
    {/* <View style={styles.container}> */}
      {/* <Text style={styles.text}>{currentTime || timeErrMsg}</Text>
      <Text style={styles.text}>{location}</Text> */}
    {/* </View> */}
      <Header />
      { timeErrMsg ? (
        <Text style={styles.timeErrMsg}>{timeErrMsg}</Text>
      ) : (
        <View
          style={{gap: 40}}
        >
          <MainInfo 
            // style={styles.mainInfo}
            currentTime={currentTime}
            timeErrMsg={timeErrMsg}
            timeZoneAbbrev={timeDetails?.timeZone?.abbrev}
            location={location}
          />
          <ButtonMoreLess  />
        </View>
      )}
      <ExpandedInfo timeDetails={timeDetails} />
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // backgroundColor:'black',
  // },
  text: {
    fontSize: 24,
  },
  timeErrMsg: {
    fontSize: 60,
    fontWeight: '700',
    color: 'red',
    marginBottom: '100%', // centers timeErrMsg w/o changing item alignment
  },
  // mainInfo: {
  //   margin: 20,
  // },
});

export default ClockScreen;
