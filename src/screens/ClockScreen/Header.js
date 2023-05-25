import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import axios from 'axios';

import Text from 'components/Text';
import IconRefresh from 'components/svgs/IconRefresh';

import useIsMountedRef from 'hooks/useIsMountedRef';

const Header = ({ style, ...rest }) => {
  const [quoteText, setQuoteText] = useState(null);
  const [quoteAuthor, setQuoteAuthor] = useState(null);

  const isMountedRef = useIsMountedRef();

  const fetchQuoteData = useCallback(async () => {
    // console.log();
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const quoteData = response.data;
      console.log(quoteData);

      if (isMountedRef.current) {
        setQuoteText(quoteData.content);
        setQuoteAuthor(quoteData.author);
      }
    } catch (error) {
      console.log('error fetching quote data', error);
    }
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
      {/* <View style={styles.btnCol}> */}
        <Pressable style={[styles.btn]} onPress={fetchQuoteData}>
          <IconRefresh />
          {/* <Text>Placeholder</Text> */}
        </Pressable>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
  },
  quoteCol: {
    flex: 1, // Take up remaining space in the row
  },
  quoteText: {
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
  btn: {
    // width: 50, // Set a fixed width for the btnCol
    marginLeft: 20, // Add spacing between quoteCol and btnCol
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Header;