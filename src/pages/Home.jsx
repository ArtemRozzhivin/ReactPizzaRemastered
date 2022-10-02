import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import '../scss/app.scss';

function Home() {
	const [pizzas, setPizzas] = useState([]);
	const [activeCategory, setActiveCategory] = React.useState(0);
	const [isLoading, setIsLoading] = useState(false);

	console.log(pizzas)

	const fetchPizzas = async () => {
		await axios
			.get(`https://633058daf5fda801f8df1ccd.mockapi.io/pizzas?${activeCategory ? `category=${activeCategory}` : ''}`)
			.then((res) => setPizzas(res.data))
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(true));
	};

	useEffect(() => {
		fetchPizzas();
	}, [activeCategory]);

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Categories value={activeCategory} onChangeCategory={(item) => setActiveCategory(item)} />
					<SortPopup />
				</div>
				<h2 className="content__title">Усі піци</h2>

				<div className="content__items">
					{isLoading
						? pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
						: [...new Array(12)].map((_, index) => <PizzaBlockSkeleton key={index} />)}
				</div>
			</div>
		</div>
	);
}

export default Home;

//Сделать сортировку пицц
//сделать фильтрацию пицц
//сделать корзину
//
