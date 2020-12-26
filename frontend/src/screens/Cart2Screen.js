import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductsDetails,
  relatedProducts,
} from '../actions/productActions';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart2Screen = ({ match, location, history }) => {
  const productId = match.params.id;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // const checkoutHandler = () => {
  //   history.push('/login?redirect=shipping');
  // };

  //HELPERS
  let id = match.params.id;
  //STATE
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productRelated = useSelector((state) => state.productRelated);
  const { loading: loadingList, products } = productRelated;

  function truncate(str) {
    return str.length > 40 ? str.substring(0, 40) + '...' : str;
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, id, qty]);
  //HANDLERS
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  //   HTML
  const cartItmes = (
    <div className='small-container cart-page'>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>
                <div className='cart-info'>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <small>Price: ${item.price}</small>
                    <br />
                    <span onClick={() => removeFromCartHandler(item.product)}>
                      Remove
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <select
                  name=''
                  id=''
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </td>
              <td className='redEnd'>${(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const totalPrice = (
    <div className='small-container cart-page2'>
      <div className='total-price'>
        <table>
          <tbody>
            <tr>
              <td>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </td>
              <td>
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          className='red-btn btn btn-block'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Meta title='All Products - RedStore' />
      <Header />
      {cartItmes}
      {totalPrice}
    </>
  );
};

export default Cart2Screen;
