
import { render, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import moment from 'moment';

import ClockScreen from 'screens/ClockScreen';
import ErrorDisplay from 'screens/ClockScreen/ErrorDisplay';
import Colors from 'constants/Colors';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };
// for some reason, the timeout only works when I set both

describe('clock screen test suite', () => {
  // test if the app renders correctly without crashing: jest-expo is required
  // uses a specific element as reference
  test('should render the clock screen', async () => {
    const { getByTestId } = render(<ClockScreen />)

    await waitFor(() => {
      const clockScreen = getByTestId('clock-screen');
      expect(clockScreen).toBeDefined();
    });

    // const mainContent = getByTestId('main-content');
    // expect(mainContent).toBeDefined();
  });

  // check quote (text & author), current time & location render
  test('should render the time, location & quote', async () => {
    const { getByTestId, queryByTestId } = render(<ClockScreen />)

    await waitFor(() => {
      expect(getByTestId('quote-text')).toBeDefined();
      expect(getByTestId('quote-author')).toBeDefined();

      expect(getByTestId('time')).toBeDefined();
      // expect(queryByTestId('time')).not.toBeNull();
      expect(getByTestId('location')).toBeDefined();

      // let time = queryByTestId('time');
      // console.log(time)
    }, TIMEOUT);
  });

  // check that quote changes on press refresh btn
  test('should change quote on press of refresh btn', async () => {
    const { getByTestId } = render(<ClockScreen />)

    let quoteNode, refreshBtn;
    await waitFor(() => {
      // console.log(getByTestId('quote-text').children);
      quoteNode = getByTestId('quote-text');
      refreshBtn = getByTestId('btn-refresh');
    });
    let oldQuoteText = quoteNode.children.reduce((acc, cur) => acc + cur);
    // console.log(oldQuoteText);

    fireEvent.press(refreshBtn);

    await waitFor(() => {
      let newQuoteText = quoteNode.children.reduce((acc, cur) => acc + cur);
      // console.log(oldQuoteText, newQuoteText);
      expect(newQuoteText).not.toEqual(oldQuoteText);
    });
  });
  
  // check that more/less btn toggles expanded info
  test('should toggle expanded info on press of more/less btn', async () => {
    const { getByTestId, getByText, queryByTestId } = render(<ClockScreen />)

    await waitFor(() => {
      // check that expanded info is not rendered initially
      let expandedInfo = queryByTestId('expanded-info'); // return null, instead of throwing err, if not found
      expect(expandedInfo).toBeNull();

      // test show more
      let textMore = getByText('More'); // passes
      fireEvent.press(textMore);
      expandedInfo = queryByTestId('expanded-info'); // not null this time
      expect(expandedInfo).not.toBeNull();

      // test show less
      let textLess = getByText('Less'); // passes
      fireEvent.press(textLess);
      expandedInfo = queryByTestId('expanded-info'); // should be null again
      expect(expandedInfo).toBeNull();
    });
  });

  // check that error message display only displays when error is present
  test('should display error', async () => {
    
    // no errMsg = no ErrorDisplay
    let errMsg = null;
    const { queryByTestId } = render(<ErrorDisplay errMsg={errMsg} />)

    await waitFor(() => {
      const errorDisplay = queryByTestId('error-display');
      expect(errorDisplay).toBeNull();
    });

    // errMsg triggers in ErrorDisplay
    errMsg = 'Clock Unavailable. Check Your Internet Connection.'
    const { getByTestId } = render(<ErrorDisplay errMsg={errMsg} />)

    await waitFor(() => {
      const errorDisplay = getByTestId('error-display');
      const [ errorText ] = errorDisplay.children;
      // console.log(errorText);
      expect(errorText).toEqual(errMsg);
    });
  });

  // check that elements match time of day
  describe('time-dependent tests', () => {
    // check that greeting matches time of day
    test('should match greeting text with time of day', async () => {
      const { getByText, getByTestId } = render(<ClockScreen />);

      await waitFor(() => {
        // determine correct greeting based on time
        let [ time ] = getByTestId('time').children; // passes
        let [ amOrPm ] = getByTestId('am-or-pm').children; // passes
        let timeStr = time + ' ' + amOrPm;
        // let timeStr = '1:00 AM'; // evening
        // let timeStr = '7:00 AM'; // morning
        // let timeStr = '2:00 PM'; // afternoon
        // let timeStr = '8:00 PM'; // evening
        
        const t = moment(timeStr, 'h:mm A');
        const morningStart = moment('5:00 AM', 'h:mm A');
        const afternoonStart = moment('12:00 PM', 'h:mm A');
        const eveningStart = moment('6:00 PM', 'h:mm A');
        
        let greeting = null;
        if (t.isSameOrAfter(morningStart) && t.isBefore(afternoonStart)) {
          greeting = 'Good morning, it\'s currently';
        }
        else if (
          t.isSameOrAfter(afternoonStart) && t.isBefore(eveningStart)
        ) {
          greeting = 'Good afternoon, it\'s currently';
        }
        else {
          greeting = 'Good evening, it\'s currently';
        }
        // console.log(greeting);

        // check that correct greeting is defined/displayed
        let displayedGreeting = getByText(greeting);
        // console.log(displayedGreeting.children);
        expect(displayedGreeting).toBeDefined();
      }, TIMEOUT);
    }); 

    // check that background color of expanded info matches time of day
    test('should match background color with time of day', async () => {
      const { getByTestId, getByText, queryByTestId } = render(<ClockScreen />);

      await waitFor(() => {
        // determine correct mode based on time
        let [ time ] = getByTestId('time').children; // passes
        let [ amOrPm ] = getByTestId('am-or-pm').children; // passes
        let timeStr = time + ' ' + amOrPm;
        // let timeStr = '07:07 AM';
        // console.log(timeStr)
        
        const timeComparable = moment(timeStr, 'h:mm');
        const dayModeStart = moment('5:00 AM', 'h:mm A');
        const nightModeStart = moment('6:00 PM', 'h:mm A');
        
        const isNightMode = timeComparable.isBefore(dayModeStart) || timeComparable.isSameOrAfter(nightModeStart);
        
        let mode = null;
        if (isNightMode) {
          mode = 'night';
        }
        else {
          mode = 'day';
        }

        // open expanded info
        let btnMoreLess = getByTestId('btn-more-less'); // passes
        // console.log(btnMoreLess.props);
        fireEvent.press(btnMoreLess); // passes

        let expandedInfo = getByTestId('expanded-info');
        // console.log(expandedInfo.props.style);

        // if the style is an array, flatten it
        let styles = {};
        if (Array.isArray(expandedInfo.props.style)) {
          styles = expandedInfo.props.style.reduce((acc, cur) => {
            return { ...acc, ...cur };
          }, {});
        } else {
          styles = expandedInfo.props.style;
        }
        // console.log(styles.backgroundColor);
        // console.log(Colors[mode].background);
        expect(styles.backgroundColor).toEqual(Colors[mode].background);
      }, TIMEOUT);

    }); 
  });  
});