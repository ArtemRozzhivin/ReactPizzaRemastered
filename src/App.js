import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './App.css';
import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
	const [search, setSearch] = useState('');

	
  return (
		<Provider store={store}>
			<SearchContext.Provider value={{search, setSearch}}>
				<div className="App">
					<div className="wrapper">
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
			</Provider>
  );
}

export default App;
