import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const ClockScreen = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchCurrentTimeAndLocation = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/ip');
        const data = response.data;
        const currentTime = moment(data.datetime).format('YYYY-MM-DD HH:mm:ss');
    
        const locationResponse = await axios.get(`http://ip-api.com/json/${data.client_ip}`);
        const locationData = locationResponse.data;
        const location = `${locationData.city}, ${locationData.regionName}, ${locationData.country}`;
    
        setCurrentTime(currentTime);
        setLocation(location);
      } catch (error) {
        console.log('Error fetching current time and location:', error);
      }
    };    

    fetchCurrentTimeAndLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentTime}</Text>
      <Text style={styles.text}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default ClockScreen;
