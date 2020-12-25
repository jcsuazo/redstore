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
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page: myPage, pages } = productList;

  useEffect(() => {
    dispatch(listProducts('', pageNumber));
  }, [dispatch, pageNumber]);

  function truncate(str) {
    return str.length > 40 ? str.substring(0, 40) + '...' : str;
  }
  const productsHeading = (
    <div className='small-container red-gb-white'>
      <div className='redRow redRow2'>
        <h2>All Products</h2>
        <select name='' id='' className='redSelect'>
          <option value=''>Default Sorting</option>
          <option value=''>Sort by price</option>
          <option value=''>Sort by latest</option>
          <option value=''>Sort by oldest</option>
          <option value=''>Sort by rating</option>
          <option value=''>Sort by sale</option>
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
        {pageNumber > 1 && (
          <Link
            to={`/products/page/${Number(pageNumber) - 1}`}
            className='redRotate redSpan'
          >
            &#8594;
          </Link>
        )}
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={`/products/page/${x + 1}`}
            className={`redSpan ${
              Number(pageNumber) === x + 1 ? 'redActive' : ''
            }`}
          >
            {x + 1}
          </Link>
        ))}
        {pageNumber < pages && (
          <Link
            to={`/products/page/${Number(pageNumber) + 1}`}
            className='redSpan'
          >
            &#8594;
          </Link>
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
