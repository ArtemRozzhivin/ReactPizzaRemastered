import React from 'react';

import emtyCartPhoto from '../assets/img/empty-cart.png';

function CartEmpty() {

	return (
		<div class="content ">
			<div class=" container  container--cart">
				<div class=" cart cart--empty">
					<h2>
						Кошик порожній <icon>😕</icon>
					</h2>
					<p>
						Найімовірніше, ви не замовляли ще піцу.
						<br />
						Щоб замовити піцу, перейди на головну сторінку .
					</p>
					<img src={emtyCartPhoto} alt="Empty cart" />
					<a href="/" class=" button button--black">
						<span>Повернутися назад</span>
					</a>
				</div>
			</div>
		</div>
	);
}

export default CartEmpty;
