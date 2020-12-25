import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts, listFeaturedProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Rating from '../components/Rating';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productFeatured = useSelector((state) => state.productFeatured);
  const { products: productsFeatured } = productFeatured;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(listFeaturedProducts());
  }, [dispatch, keyword, pageNumber]);

  function showProducts() {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant='danger'>{error}</Message>;
    } else {
      return (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      );
    }
  }
  const oldHTML = (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go back
        </Link>
      )}
      <h1>Latest Products</h1>
      {showProducts()}
    </>
  );
  const heroHtml = (
    <div className='redContainer'>
      <div className='redRow'>
        <div className='red-col-2'>
          <h1>
            Give Your Workout
            <br />A New Style!
          </h1>
          <p>
            Success isn't always about greatness. It's about consistency.
            Consistent
            <br />
            Hard work gains success. Greatness will come.
          </p>
          <a href='/' className='red-btn'>
            Explore Now &#8594;
          </a>
        </div>
        <div className='red-col-2'>
          <img src='images/image1.png' alt='image1' />
        </div>
      </div>
    </div>
  );
  const featuredCategoriesHtml = (
    <div className='categories'>
      <div className='small-container'>
        <div className='redRow'>
          <div className='red-col-3'>
            <img src='images/category-1.jpg' alt='category1' />
          </div>
          <div className='red-col-3'>
            <img src='images/category-2.jpg' alt='category2' />
          </div>
          <div className='red-col-3'>
            <img src='images/category-3.jpg' alt='category3' />
          </div>
        </div>
      </div>
    </div>
  );
  const featuredProducts = (
    <div className='featuredProducts red-gb-white'>
      <div className='small-container red-gb-white'>
        <h2 className='red-title'>Featured Products</h2>
        <div className='redRow'>
          {productsFeatured.map((featured) => (
            <div className='red-col-4'>
              <Link to={`/product/${featured._id}`}>
                <img src={featured.image} alt={featured.name} />
                <h4>{featured.name}</h4>
                <Rating
                  color='#ff523b'
                  value={featured.rating || 0}
                  text={``}
                />
                <p>${featured.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const featuredProducts2 = (
    <div className='featuredProducts red-gb-white'>
      <div className='small-container red-gb-white'>
        <h2 className='red-title'>Featured Products</h2>
        <div className='redRow'>
          <div className='red-col-4'>
            <img src='images/product-1.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-2.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-3.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-4.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
      </div>
    </div>
  );
  const latestProducts = (
    <div className='featuredProducts red-gb-white'>
      <div className='small-container red-gb-white'>
        <h2 className='red-title'>Leatest Products</h2>
        <div className='redRow'>
          <div className='red-col-4'>
            <img src='images/product-5.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-6.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-7.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-8.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-9.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-10.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-11.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className='red-col-4'>
            <img src='images/product-12.jpg' alt='product3' />
            <h4>Red Printed T-Shirt</h4>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
      </div>
    </div>
  );
  const offers = (
    <div className='offer'>
      <div className='small-container'>
        <div className='redRow'>
          <div className='red-col-2'>
            <img
              className='offer-img'
              src='images/exclusive.png'
              alt='offer-img'
            />
          </div>
          <div className='red-col-2'>
            <p>Exclisively Available on RedStore</p>
            <h1>Smart Band 4</h1>
            <div>
              <small>
                The Mi Smart Band 4 features a 39.9% larger (then Mi Band 3)
                AMOLED color full-touch display with adjustable brightness, so
                everything is clear as can be.
              </small>
            </div>
            <a href='/' className='red-btn'>
              Buy Now &#8594;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  const testimonials = (
    <div className='testimonial red-gb-white'>
      <div className='small-container'>
        <div className='redRow'>
          <div className='red-col-3'>
            <i className='fa fa-quote-left'></i>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis itaque quaerat eum non perspiciatis quae soluta quam?
              Quia tempore magni, recusandae dolorum dignissimos itaque
              reiciendis, sit inventore quod voluptate odio.
            </p>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <img src='images/user-1.png' alt='profile_img' />
            <h3>Sean Parker</h3>
          </div>
          <div className='red-col-3'>
            <i className='fa fa-quote-left'></i>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis itaque quaerat eum non perspiciatis quae soluta quam?
              Quia tempore magni, recusandae dolorum dignissimos itaque
              reiciendis, sit inventore quod voluptate odio.
            </p>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <img src='images/user-2.png' alt='profile_img' />
            <h3>Mike Smith</h3>
          </div>
          <div className='red-col-3'>
            <i className='fa fa-quote-left'></i>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis itaque quaerat eum non perspiciatis quae soluta quam?
              Quia tempore magni, recusandae dolorum dignissimos itaque
              reiciendis, sit inventore quod voluptate odio.
            </p>
            <div className='rating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-0'></i>
            </div>
            <img src='images/user-3.png' alt='profile_img' />
            <h3>Mabel Joe</h3>
          </div>
        </div>
      </div>
    </div>
  );
  const brands = (
    <div className='brands red-gb-white'>
      <div className='small-container'>
        <div className='redRow'>
          <div className='red-col-5'>
            <img src='images/logo-godrej.png' alt='logo-review' />
          </div>
          <div className='red-col-5'>
            <img src='images/logo-oppo.png' alt='logo-review' />
          </div>
          <div className='red-col-5'>
            <img src='images/logo-coca-cola.png' alt='logo-review' />
          </div>
          <div className='red-col-5'>
            <img src='images/logo-paypal.png' alt='logo-review' />
          </div>
          <div className='red-col-5'>
            <img src='images/logo-philips.png' alt='logo-review' />
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Meta />
      <div className='bg-gradiant'>
        <Header />
        {heroHtml}
      </div>
      {featuredCategoriesHtml}
      {featuredProducts}
      {latestProducts}
      {offers}
      {testimonials}
      {brands}
    </>
  );
};

export default HomeScreen;
