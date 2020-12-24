import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  const oldHTML = (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy;ProShop</Col>
        </Row>
      </Container>
    </footer>
  );
  const footer = (
    <div className='footer'>
      <div className='redContainer'>
        <div className='redRow'>
          <div className='footer-col-1'>
            <h3>Download Our App</h3>
            <p>Download App for Android and IOS mobile phone.</p>
            <div className='app-logo'>
              <img src='images/play-store.png' alt='play-store' />
              <img src='images/app-store.png' alt='app-store' />
            </div>
          </div>
          <div className='footer-col-2'>
            <img src='images/logo-white.png' alt='logo' />
            <p>
              Out Purpose is to sustainable make the pleasure and benefits of
              sports accessible to the many.
            </p>
          </div>
          <div className='footer-col-3'>
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div className='footer-col-4'>
            <h3>Follow us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className='copyright'>Copyright 2020 &copy;ProShop</p>
      </div>
    </div>
  );
  return footer;
};

export default Footer;
