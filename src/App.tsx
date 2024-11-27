import './App.css';
import { Header, Border, Result, Roulette } from './components';
import { RouletteProvider } from './context';

function App() {
  return (
    <>
      <RouletteProvider>
        <div className="roulette-layout">
          <Header />
          <div className="container">
            <Border />
            <Roulette />
          </div>
        </div>
        <Result />
      </RouletteProvider>
    </>
  );
}

export default App;
