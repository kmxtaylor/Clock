import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import axios from 'axios';

import Text from 'components/Text';
import IconRefresh from 'components/svgs/IconRefresh';

import useIsMountedRef from 'hooks/useIsMountedRef';

const Header = ({ isShowingMore, style, ...rest }) => {
  const [quoteText, setQuoteText] = useState(null);
  const [quoteAuthor, setQuoteAuthor] = useState(null);

  const isMountedRef = useIsMountedRef();

  const fetchQuoteData = useCallback(async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const quoteData = response.data;

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

  if (!quoteText || !quoteAuthor || isShowingMore) {
    // don't re-render data, replace space or otherwise change layout
    return <View style={[styles.container, style]} {...rest} />;
  }
  else {
    return (
      <View style={[styles.container, style]} {...rest}>
        <View style={styles.quoteCol}>
          <Text style={styles.quoteText} testID='quote-text'>
            "{quoteText}"
          </Text>
          <Text style={styles.quoteAuthor} testID='quote-author'>
            {quoteAuthor}
          </Text>
        </View>
        <Pressable
          style={styles.btn}
          onPress={fetchQuoteData}
          testID='btn-refresh'
        >
          <IconRefresh />
        </Pressable>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  quoteCol: {
    flex: 1, // Take up remaining space in the row
  },
  quoteText: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: 0.25,
    marginBottom: 15,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'left',
    letterSpacing: 0.25,
  },
  btn: {
    marginLeft: 15, // Add spacing between quoteCol and btnCol
    alignItems: 'center',
  },
});

export default Header;