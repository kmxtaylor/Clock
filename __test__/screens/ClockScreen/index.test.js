
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ClockScreen from 'screens/ClockScreen';
import Colors from 'constants/Colors';

const TIMEOUT = { timeout: 10000 };

describe('clock screen test suite', () => {
  // test if the app renders correctly without crashing: jest-expo is required
  // uses a specific element as reference
  // test('should render the clock screen', async () => {
  //   const { getByTestId } = render(<ClockScreen />)

  //   await waitFor(() => {
  //     const clockScreen = getByTestId('clock-screen');
  //     expect(clockScreen).toBeDefined();
  //   }, TIMEOUT);

  //   // const mainContent = getByTestId('main-content');
  //   // expect(mainContent).toBeDefined();
  // });

  // check quote (text & author), current time & location render
  // test('should render the time, location & quote', async () => {
  //   const { getByTestId } = render(<ClockScreen />)

  //   await waitFor(() => {
  //     expect([
  //       getByTestId('quote-text'),
  //       getByTestId('quote-author'),
  //       getByTestId('time'),
  //       getByTestId('location'),
  //     ]).toBeDefined();
  //   }, TIMEOUT);
  // });

  // check that quote changes on press refresh btn
  // test('should change quote on press of refresh btn', async () => {
  //   const { getByTestId } = render(<ClockScreen />)

  //   let quoteNode, refreshBtn;
  //   await waitFor(() => {
  //     // console.log(getByTestId('quote-text').children);
  //     quoteNode = getByTestId('quote-text');
  //     refreshBtn = getByTestId('btn-refresh');
  //   }, TIMEOUT);
  //   let oldQuoteText = quoteNode.children.reduce((acc, cur) => acc + cur);
  //   // console.log(oldQuoteText);

  //   fireEvent.press(refreshBtn);

  //   await waitFor(() => {
  //     let newQuoteText = quoteNode.children.reduce((acc, cur) => acc + cur);
  //     // console.log(oldQuoteText, newQuoteText);
  //     expect(newQuoteText).not.toEqual(oldQuoteText);
  //   }, TIMEOUT);
  // });
  
  // check that more/less btn toggles expanded info
  // test('should toggle expanded info on press of more/less btn', async () => {
  //   const { getByTestId, getByText, queryByTestId } = render(<ClockScreen />)

  //   await waitFor(() => {
  //     // check that expanded info is not rendered initially
  //     let expandedInfo = queryByTestId('expanded-info'); // return null, instead of throwing err, if not found
  //     expect(expandedInfo).toBeNull();

  //     // test show more
  //     let textMore = getByText('More'); // passes
  //     fireEvent.press(textMore);
  //     expandedInfo = queryByTestId('expanded-info'); // not null this time
  //     expect(expandedInfo).not.toBeNull();

  //     // test show less
  //     let textLess = getByText('Less'); // passes
  //     fireEvent.press(textLess);
  //     expandedInfo = queryByTestId('expanded-info'); // should be null again
  //     expect(expandedInfo).toBeNull();
  //   }, TIMEOUT);
  // });

  // check that elements match time of day: greeting, greeting icon, expanded info background color & text color
  describe('time-dependent test suite', () => {
    // check that greeting & greeting icon match time of day
    // test('should match greeting text & icon with time of day', async () => {
    //   // fireEvent.press(moreLessBtn);
    // });  

    // check that expanded info background color match time of day
    test('should match expanded info colors with time of day', async () => {
      const { getByTestId, getByText, queryByTestId } = render(<ClockScreen />);

      // await waitFor(() => {
      //   expect(getByTestId('time')).toBeDefined();
      // }, TIMEOUT);

      let time, amOrPm, btnMoreLess, expandedInfo;
      await waitFor(() => {
        time = getByTestId('time'); // passes
        // amOrPm = getByTestId('am-or-pm'); // passes
        console.log(time.props.children)
        
        btnMoreLess = getByTestId('btn-more-less'); // passes
        // console.log(btnMoreLess.props);
        fireEvent.press(btnMoreLess); // passes

        expandedInfo = getByTestId('expanded-info');

        // if the style is an array, flatten it
        // let styles = {};
        if (Array.isArray(expandedInfo.props.style)) {
          styles = expandedInfo.props.style.reduce((acc, cur) => {
            return { ...acc, ...cur };
          }, {});
        } else {
          styles = expandedInfo.props.style;
        }
        // console.log(styles);
        console.log(styles.backgroundColor);
        // expect(styles.backgroundColor).toEqual(Colors[].background);
      });

    }); 
  });  
});