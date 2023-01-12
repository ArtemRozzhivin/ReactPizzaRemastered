import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Loading from './components/Loading/Loading';

import './App.css';
import './scss/app.scss';

const Home = React.lazy(() => import('./pages/Home'));
const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const PizzaPage = React.lazy(() => import('./pages/PizzaPage'));
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="wrapper">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/pizzas/:id" element={<PizzaPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </Provider>
  );
}

export default App;
