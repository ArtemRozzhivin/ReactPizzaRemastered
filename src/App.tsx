import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import PizzaItem from './components/PizzaItem';
import MainLayout from './layouts/MainLayout';

import './App.css';
import './scss/app.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pizzas/:id" element={<PizzaItem />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;

// adaptive
// animation
// fix excessive renders when change input value
