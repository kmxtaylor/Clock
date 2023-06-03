import { useEffect, useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import ErrorDisplay from './ErrorDisplay';
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
    const msInMin = 60000;
    // const msIn3Sec = 3000;
    // const msInSec = 1000;
    const intervalMS = msInMin;
    let intervalId = null;

    const fetchTimeData = async () => {
      try {
        const ipResponse = await axios.get('http://worldtimeapi.org/api/ip');
        // const ipResponse = null; // for testing only
        const ipData = ipResponse.data;
        const fetchedTime = moment(ipData.datetime).format('YYYY-MM-DD HH:mm:ss');

        if (isMountedRef.current) {
          setIpAddress(ipData.client_ip);
          setCurrentTime(fetchedTime);
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
          setTimeErrMsg(null);
        }
    
        // calculate millisec left until start of next minute after fetchedTime
        let nextMinStart = moment(fetchedTime)
          .startOf('minute')
          .add(1, 'minute')
        let syncDelay = nextMinStart.diff(fetchedTime, 'milliseconds');
        // console.log('nextMinStart:', nextMinStart);
        // console.log('inner syncDelay:', syncDelay);

        return syncDelay;
      }
      catch (error) {
        console.log('Error fetching time data:', error);
        setCurrentTime(null);
        setTimeDetails(null);
        setIsShowingMore(false);
        setTimeErrMsg("Clock not available. Check internet connection.");
      }
    };

    const fetchTimeDataOnInterval = async () => {
      let syncDelay = parseInt(await fetchTimeData()) ?? 1000;

      // sync w/ start of next minute
      setTimeout(async () => { // delay interval so clock syncs w/ min start
        // set interval for time data fetching
        // if (intervalMS >= 1000) { // sets hard limit to avoid over-querying API
        intervalId = setInterval( // exec on an interval
          fetchTimeData,
          intervalMS,
        );
        // }

        // fetch time data at start of 1st next minute
        fetchTimeData();
      }, syncDelay);
    };

    fetchTimeDataOnInterval();

    // clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        // const locationResponse = null;  // for testing only
        const locationData = locationResponse?.data;

        const location = (locationData.city && locationData.region)
          ? `${locationData.city}, ${locationData.region}`
          : null;

        if (isMountedRef.current) {
          setLocation(location);
        }
      }
      catch (error) {
        console.log('Error fetching time data:', error);
        setLocation(null);
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
    }
    else if ((hourOfDay < 18 && hourOfDay >= 5) && mode !== 'day') {
      setMode('day');
    }
  }, [currentTime]);

  const MainContent = (props) => {
    if (!currentTime) {
      return null;
    }

    return (
      <View {...props}>
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
  };


  return (
    <CustomBackground testID='clock-screen'>
      <PaddingContainer>
        <Header isShowingMore={isShowingMore} />
        <ErrorDisplay errMsg={timeErrMsg} />
        <MainContent />
      </PaddingContainer>
      {/* Pop up content */}
      {isShowingMore && (
        <ExpandedInfo timeDetails={timeDetails} />
      )}
    </CustomBackground>
  );
};

export default ClockScreen;
