import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const ProductsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, pages, currentPage, sort } = productList;

  function truncate(str) {
    return str.length > 40 ? str.substring(0, 40) + '...' : str;
  }
  function sortHandler(e) {
    dispatch(listProducts('', currentPage, e.target.value));
  }
  function changePage(nextPage) {
    dispatch(listProducts('', nextPage, sort));
  }
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productsHeading = (
    <div className='small-container red-gb-white'>
      <div className='redRow redRow2'>
        <h2>All Products</h2>
        <select name='' id='' className='redSelect' onChange={sortHandler}>
          <option value='priceDown'>Sort by price: High to Low</option>
          <option value='priceUp'>Sort by price: Low to High</option>
          <option value='latest'>Sort by latest</option>
          <option value='oldest'>Sort by oldest</option>
          <option value='rating'>Sort by rating</option>
        </select>
      </div>
    </div>
  );
  const featuredProducts = (
    <div className='small-container red-gb-white'>
      <div className='redRow fixVisualBug'>
        {products.map((product) => (
          <div className='red-col-4' key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} />
              <h4>{truncate(product.name)}</h4>
              <Rating color='#ff523b' value={product.rating || 0} text={``} />
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  const pagination = (
    <div
      className='small-container red-gb-white'
      style={loading ? { visibility: 'hidden' } : { visibility: 'inherit' }}
    >
      <div className='page-btn'>
        {currentPage > 1 && (
          <span
            onClick={() => changePage(Number(currentPage) - 1)}
            className='redRotate redSpan'
          >
            &#8594;
          </span>
        )}
        {[...Array(pages).keys()].map((x) => (
          <span
            onClick={() => changePage(x + 1)}
            key={x + 1}
            className={`redSpan ${currentPage === x + 1 ? 'redActive' : ''}`}
          >
            {x + 1}
          </span>
        ))}
        {currentPage < pages && (
          <span
            onClick={() => changePage(Number(currentPage) + 1)}
            className='redSpan'
          >
            &#8594;
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Meta title='All Products - RedStore' />
      <Header />
      {productsHeading}
      {loading ? <Loader /> : featuredProducts}
      {pagination}
    </>
  );
};

export default ProductsScreen;
