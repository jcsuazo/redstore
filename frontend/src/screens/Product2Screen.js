import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductsDetails,
  relatedProducts,
} from '../actions/productActions';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const Product2Screen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
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
    dispatch(listProductsDetails(id));
    dispatch(relatedProducts(id));
  }, [dispatch, id]);

  //ADD CARD HANDLER
  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };
  //   HTML
  const singleProductDetails = (
    <div className='small-container single-product'>
      <div className='redRow adj-col'>
        <div className='red-col-2 '>
          <div className='hideOnLarge'>
            <p>
              <Link to='/'>Home </Link>/ {product.category}
            </p>
            <h1>{product.name}</h1>
          </div>
          <img src={product.image} alt={product.name} />
          <div className='small-img-row'>
            <div className='small-img-col'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='small-img-col'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='small-img-col'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='small-img-col'>
              <img src={product.image} alt={product.name} />
            </div>
          </div>
        </div>
        <div className='red-col-2 productDetailsHeading'>
          <p className='hideOnSmall'>
            <Link to='/'>Home </Link>/ {product.category}
          </p>
          <h1 className='hideOnSmall'>{product.name}</h1>
          <h4>${product.price}</h4>
          {product.closeSize && (
            <select name='' id=''>
              <option>Select Size</option>
              <option>XXL</option>
              <option>XL</option>
              <option>Large</option>
              <option>Medium</option>
              <option>Small</option>
            </select>
          )}
          {/* <input
            type='number'
            placeholder='1'
            onChange={(e) => setQty(e.target.value || 1)}
          /> */}
          {product.countInStock > 0 && (
            <select
              name=''
              id=''
              value={product.qty}
              onChange={(e) => setQty(e.target.value || 1)}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1}>{x + 1}</option>
              ))}
            </select>
          )}
          <button
            className='red-btn'
            onClick={addToCartHandler}
            style={
              product.countInStock === 0
                ? { color: '#fff', backgroundColor: 'gray' }
                : {}
            }
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? (
              <span>Out Of Stock</span>
            ) : (
              <span>Add To Cart</span>
            )}
          </button>

          <h3>
            Product Details <i className='fa fa-indent'></i>
          </h3>
          <br />
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
  const relatedProductsHeading = (
    <div className='small-container'>
      <div className='redRow redRow2'>
        <h2>Related Products</h2>
        <p>
          <Link to='/'>View More</Link>
        </p>
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

  return (
    <>
      <Meta title='All Products - RedStore' />
      <Header />
      {loading ? <Loader /> : singleProductDetails}
      {relatedProductsHeading}
      {loadingList ? <Loader /> : featuredProducts}
    </>
  );
};

export default Product2Screen;
