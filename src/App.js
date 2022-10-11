import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CartEmpty from './pages/CartEmpty';
import './App.css';
import './scss/app.scss';
import NotFound from './pages/NotFound';

export const SearchContext = React.createContext();

function App() {
	const [search, setSearch] = useState('');
	
  return (
			<SearchContext.Provider value={{search, setSearch}}>
				<div className="App">
					<div className="wrapper">
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/cartEmpty" element={<CartEmpty />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
  );
}

export default App;
