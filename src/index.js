import { ModeProvider } from 'contexts/Mode';
import ClockScreen from 'screens/ClockScreen';
import Main from 'layouts/Main';

const App = () => {
  return (
    <ModeProvider>
      <Main>
        <ClockScreen />
      </Main>
    </ModeProvider>
  );
};

export default App;