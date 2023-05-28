
import { render, waitFor } from '@testing-library/react-native';
import ClockScreen from 'screens/ClockScreen';

const TIMEOUT = { timeout: 20000 };

describe('Clock screen tests', () => {
  // test if the app renders correctly without crashing: jest-expo is required
  // uses a specific element as reference
  test('should render the clock screen', async () => {
    let renderedScreen;
    await waitFor(() => {
      renderedScreen = render(<ClockScreen />);
    }, TIMEOUT);
    const { getByTestId } = renderedScreen;
    // const time = getByTestId('time');

    // expect(time).toBeDefined();

    // const { getByTestId } = renderedScreen;
    const clockScreen = getByTestId('clock-screen');

    expect(clockScreen).toBeDefined();
  });
});