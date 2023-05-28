
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ClockScreen from 'screens/ClockScreen';
import Colors from 'constants/Colors';

const TIMEOUT = { timeout: 10000 };

describe('clock screen test suite', () => {
  // test if the app renders correctly without crashing: jest-expo is required
  // uses a specific element as reference
  test('should render the clock screen', async () => {
    const { getByTestId } = render(<ClockScreen />)

    await waitFor(() => {
      const clockScreen = getByTestId('clock-screen');
      expect(clockScreen).toBeDefined();
    }, TIMEOUT);

    // const mainContent = getByTestId('main-content');
    // expect(mainContent).toBeDefined();
  });

  // check quote (text & author), current time & location render
  test('should render the time, location & quote', async () => {
    const { getByTestId } = render(<ClockScreen />)

    await waitFor(() => {
      const quoteText = getByTestId('quote-text');
      expect(quoteText).toBeDefined();

      const quoteAuthor = getByTestId('quote-author');
      expect(quoteAuthor).toBeDefined();

      const time = getByTestId('time');
      expect(time).toBeDefined();

      const location = getByTestId('location');
      expect(location).toBeDefined();
    }, TIMEOUT);
  });

  // check that quote changes on press refresh btn
  // test('should change quote on press of refresh btn', async () => {
  //   // fireEvent.press(refreshBtn);
  // });
  
  // check that more/less btn toggles expanded info
  // test('should toggle expanded info on press of more/less btn', async () => {
  //   // fireEvent.press(moreLessBtn);
  // });

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