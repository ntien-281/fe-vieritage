import { PaperProvider } from 'react-native-paper';
import App from './src/App';

const App = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

export default App;