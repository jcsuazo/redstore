import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listProductsDetails } from '../actions/productActions';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const Product2Screen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  //HELPERS
  let id = match.params.id;
  //STATE
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingList,
    products,
    pages,
    currentPage,
    sort,
  } = productList;

  function truncate(str) {
    return str.length > 40 ? str.substring(0, 40) + '...' : str;
  }

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listProductsDetails(id));
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
          <input type='number' placeholder='1' />
          <a href='/' className='red-btn'>
            Add To Cart
          </a>
          <h3>
            Product Details <i className='fa fa-indent'></i>
          </h3>
          <br />
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
  const relatedProducts = (
    <div className='small-container'>
      <div className='redRow redRow2'>
        <h2>Related Products</h2>
        <p>View More</p>
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
      {singleProductDetails}
      {relatedProducts}
      {loading ? <Loader /> : featuredProducts}
    </>
  );
};

export default Product2Screen;
