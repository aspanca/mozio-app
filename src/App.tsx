import { AppRouterProvider } from './providers';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

function App() {
  return (
    <>
      <ReactQueryProvider>{AppRouterProvider}</ReactQueryProvider>
    </>
  );
}

export default App;
