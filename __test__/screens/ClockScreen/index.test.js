
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
  //       getByTestId('time'),
  //       getByTestId('location'),
  //       getByTestId('quote-text'),
  //       getByTestId('quote-author'),
  //       getByTestId('quote-author'),
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
  test('should toggle expanded info on press of more/less btn', async () => {
    const { getByTestId, getByText, queryByTestId, queryByText } = render(<ClockScreen />)

    let expandedInfoNode, moreLessBtn, moreText, lessText;
    let text1, text2, testId1;
    await waitFor(() => {
      expandedInfoNode = queryByTestId('expanded-info'); // return null, instead of throwing err, if not found
      expect(expandedInfoNode).toBeNull();
      // console.log(expandedInfoNode);

      moreLessBtn = getByTestId('btn-more-less');  // now passes -- mysteriously
      // moreLessBtn = queryByTestId('btn-more-less'); // now passes -- mysteriously
      // moreText = getByText('More'); // passes

      // text1 = queryByText('Good'); // returns null (but passes)

      // testId1 = getByTestId('btn-refresh');
      // testId1 = getByTestId('main-info'); // passes
    }, TIMEOUT);
    // console.log(moreLessBtn.props); // passes
    // console.log(moreText.props) // passes
    // console.log(text1); // returns null (but passes)
    // // console.log(lessText, text1, text2, text3);
    // console.log(testId1.props.children); /// passes

    // fireEvent.press(moreLessBtn);
    
    await waitFor(() => {
      // test show more
      fireEvent.press(moreLessBtn);
      expandedInfoNode = getByTestId('expanded-info'); // found this time
      // expect(expandedInfoNode).toBeDefined();
      expect(expandedInfoNode).not.toBeNull();
      // console.log(expandedInfoNode);

      // test show less

    }, TIMEOUT);
  });

  // check that elements match time of day: greeting, greeting icon, expanded info background color & text color
  describe('time-dependent test suite', () => {
    // check that greeting & greeting icon match time of day
    // test('should match greeting text & icon with time of day', async () => {
    //   // fireEvent.press(moreLessBtn);
    // });  

    // check that expanded info background color & text color match time of day
    // test('should match expanded info colors with time of day', async () => {
    //   // fireEvent.press(moreLessBtn);
    // }); 
  });


  // test if fails to get time data
  // test('test if fails to get time data', async () => {

  // });
  
});