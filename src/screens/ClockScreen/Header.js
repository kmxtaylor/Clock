import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import axios from 'axios';

import Text from 'components/Text';

import useIsMountedRef from 'hooks/useIsMountedRef';

const Header = ({style, ...rest}) => {
  const [quoteText, setQuoteText] = useState(null);
  const [quoteAuthor, setQuoteAuthor] = useState(null);

  const isMountedRef = useIsMountedRef();

  const fetchQuoteData = useCallback(async () => { // in useCallback so I can use the function in multiple other places
    // const fetchQuoteData = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        const quoteData = response.data;
        console.log(quoteData);

        if (isMountedRef.current) {
          setQuoteText(quoteData.content);
          setQuoteAuthor(quoteData.author);
        }
      }
      catch (error) {
        console.log('error fetching quote data', error);
      }
    // };
    // fetchQuoteData();
  }, []);

  useEffect(() => {
    fetchQuoteData();
  }, []);

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.quoteCol}>
        <Text style={styles.quoteText}>"{quoteText}"</Text>
        <Text style={styles.quoteAuthor}>{quoteAuthor}</Text>
      </View>
      <View style={styles.btnCol}>
        <Pressable onClick={fetchQuoteData}>
          {/* SVG: icon refresh */}
          <Text>Placeholder</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%', // for some reason extending beyond 100% of screen width
    // width: 80,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    alignItems: 'space-between',
  },
  quoteText: {
    // width: '80%',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 15,
  },
  quoteAuthor: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'left',
  },
  btnCol: {
    width: '20%',
  },
});

export default Header;