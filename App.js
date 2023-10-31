import EstoqueProvider, { estoqueContext } from './services/EstoqueProvider';
import Home from './Home';
export default function App() {

  return (
    <EstoqueProvider>
      <Home />
    </EstoqueProvider>
  );
}

