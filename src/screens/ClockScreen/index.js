import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import Text from 'components/Text';
import Header from './Header';
import MainInfo from './MainInfo';
import ButtonMoreLess from './ButtonMoreLess';
import ExpandedInfo from './ExpandedInfo';

import { useMode } from 'hooks/useMode';
import useIsMountedRef from 'hooks/useIsMountedRef';
import CustomBackground from 'layouts/BackgroundContainer';
import PaddingContainer from 'layouts/PaddingContainer';

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
  const [isShowingMore, setIsShowingMore] = useState(false);

  const isMountedRef = useIsMountedRef();

  const { mode, setMode } = useMode();

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const ipResponse = await axios.get('http://worldtimeapi.org/api/ip');
        // const ipResponse = null; // for testing only
        const ipData = ipResponse.data;
        // console.log(`ipData: ${JSON.stringify(ipData, null, 2)}`);
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
      }
      catch (error) {
        console.log(
          'Error fetching time data:',
          error,
          // JSON.stringify(error, null, 2)
        );
        setTimeDetails(null);
        setTimeErrMsg("Clock Unavailable. Check Your Internet Connection.");
      }
    };

    fetchTimeData();
      
    const msInMin = 60000;
    // const msIn3Sec = 3000;
    // const msInSec = 1000;
    const intervalMS = msInMin;
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

  // update day/night mode based on current time
  // (decoupled from greeting for flexibility)
  useEffect(() => {
    let hourOfDay = moment(currentTime).format('HH');
    if ((hourOfDay >= 18 || hourOfDay < 5) && mode !== 'night') {
      setMode('night');
      // console.log('just set mode to night');
    }
    else if ((hourOfDay < 18 && hourOfDay >= 5) && mode !== 'day') {
      setMode('day');
      // console.log('just set mode to day');
    }
  }, [currentTime]);

  const MainContent = (props) => {
    // const { testID } = props;
    // console.log(testID)
    if (timeErrMsg) {
      return (
        <Text
          style={styles.timeErrMsg}
          testID={'error-message'}
          // testID={testID}
          {...props}
        >{timeErrMsg}</Text>
      );
    }
    else {
      if (!currentTime) {
        return <View testID="temp" />;
      }
      return (
        <View
          style={{gap: 40}}
          // testID={testID}
          {...props}
        >
          <MainInfo 
            currentTime={currentTime}
            timeErrMsg={timeErrMsg}
            timeZoneAbbrev={timeDetails?.timeZone?.abbrev}
            location={location}
            testID='main-info'
          />
          <ButtonMoreLess
            isShowingMore={isShowingMore}
            setIsShowingMore={setIsShowingMore}
            testID='btn-more-less'
          />
        </View>
      );
    }
  };
    

  return (
    <CustomBackground testID='clock-screen'>
      <PaddingContainer>
        <Header />
        <MainContent
          // testID='main-content'
        />
      </PaddingContainer>
      {/* Pop up content */}
      { isShowingMore && (
        <ExpandedInfo timeDetails={timeDetails} testID='expanded-info' />
      )}
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  timeErrMsg: {
    fontSize: 60,
    fontWeight: '700',
    color: 'red',
    marginBottom: '50%', // centers timeErrMsg w/o changing item alignment
  },
});

export default ClockScreen;
