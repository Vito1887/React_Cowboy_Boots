import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onCloseCart, onRemove, items = [], opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://62b99ef9ff109cd1dc96cce0.mockapi.io/favorites', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62b99ef9ff109cd1dc96cce0.mockapi.io/cart' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('При создании заказа возникла ошибка :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between align-center mb-30">
          Корзина{' '}
          <img
            onClick={onCloseCart}
            className="remove-btn cu-p"
            width={16}
            height={16}
            src="/img/remove0.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cart-item d-flex align-center mb-20">
                  <img
                    className="mr-20 cart-item-image"
                    width={70}
                    height={70}
                    src={`${obj.imageUrl}`}
                    alt="Boots"
                  />
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="remove-btn"
                    width={14}
                    height={14}
                    src="/img/remove1.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cart-total-block">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="green-button">
                Оформить заказ <img width={28} height={28} src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пуста'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан службе курьерской доставки.`
                : 'Для того, чтобы оформить заказ, необходимо добавить в корзину какой-либо товар.'
            }
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
