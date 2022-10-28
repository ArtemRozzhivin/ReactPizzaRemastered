import React from 'react';
import { Link } from 'react-router-dom';

import emtyCartPhoto from '../assets/img/empty-cart.png';

function CartEmpty() {
  return (
    <div className="content ">
      <div className=" container  container--cart">
        <div className=" cart cart--empty">
          <h2>
            Кошик порожній <span>😕</span>
          </h2>
          <p>
            Найімовірніше, ви не замовляли ще піцу.
            <br />
            Щоб замовити піцу, перейди на головну сторінку .
          </p>
          <img src={emtyCartPhoto} alt="Empty cart" />
          <Link to="/" className=" button button--black">
            <span>Повернутися назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartEmpty;
