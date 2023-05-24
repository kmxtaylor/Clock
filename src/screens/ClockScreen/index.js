import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import Text from 'components/Text';

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

  const [timeErrMsg, setTimeErrMsg] = useState(`ERROR`);

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        // console.log('here');
        const response = await axios.get('http://worldtimeapi.org/api/ip');
        const ipData = response.data;
        const currentTime = moment(ipData.datetime).format('YYYY-MM-DD HH:mm:ss');
        // console.log(ipData);
        
        if (isMountedRef.current) {
          setIpAddress(ipData.client_ip);
          setCurrentTime(currentTime);
          let td = {
            timeZone: {
              abbrev: ipData.abbreviation,
              full: ipData.timezone.replace(/_/g, " "), // replace _ w/ spaces
            },
            dayOfYear: ipData.day_of_year,
            dayOfWeek: ipData.day_of_week,
            weekNumber: ipData.week_number,
          };
          setTimeDetails(td);
          // console.log(JSON.stringify(td, null, 2))
        }
      } 
      catch (error) {
        console.log(
          'Error fetching time data:',
          error,
          // JSON.stringify(error, null, 2)
        );
        setTimeErrMsg("Can't get time");
      }
    };

    fetchTimeData();
      
    // const msInMin = 60000;
    // const msIn3Sec = 3000;
    const msInSec = 1000;
    const intervalMS = msInSec;
    let intervalId = null;

    // uncomment this only when needed (avoid getting blocked by API again)
    if (intervalMS >= 1000) { // sets hard limit to avoid over-querying API
      intervalId = setInterval( // exec on an interval
        fetchTimeData,
        intervalMS,
      );
    }

    // clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        // fetch location data
        const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        const locationData = locationResponse.data;
        // console.log(locationData);

        const location = `${locationData.city}, ${locationData.region}`;

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
    <View style={styles.container}>
      <Text style={styles.text}>{currentTime || timeErrMsg}</Text>
      <Text style={styles.text}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'black',
  },
  text: {
    fontSize: 24,
  },
});

export default ClockScreen;
