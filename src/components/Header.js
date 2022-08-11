import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="header-left d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div className="heade-info">
            <h3>
              React Cowboy Boots <img width={30} height={30} src="img/cactus.svg" alt="Cactus" />{' '}
              Wild West
            </h3>
            <p>Магазин лучших ковбойских сапог</p>
          </div>
        </div>
      </Link>
      <div className="header-center">
        <audio autoPlay controls loop src="audio/WildWest.mp3"></audio>
      </div>
      <ul className="header-right d-flex">
        <li onClick={props.onClickCart} className="mr-20 d-flex cu-p">
          <img width={26} height={26} src="img/cart.svg" alt="Корзина" />
          <span className="d-flex align-center">{totalPrice} руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img width={26} height={26} src="img/star-liked.svg" alt="Избранное" />
          </Link>
        </li>
        <li className="cu-p">
          <Link to="/orders">
            <img width={26} height={26} src="img/user.svg" alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
