import './App.css';
import Header from './components/Header';
import Categories from './components/Categories';
import SortPopup from './components/SortPopup';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock';
import pizzas from './assets/db.json';

function App() {
  console.log(pizzas);
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <SortPopup />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
