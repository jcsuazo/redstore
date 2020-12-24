import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { Link } from 'react-router-dom';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleClass = () => {
    console.log('enter');
    console.log(toggleMenu);
    setToggleMenu(!toggleMenu);
  };
  //HANDLERS
  const logoutHandler = () => {
    dispatch(logout());
  };
  //HTML CONDITIONALS
  const loggedHTMl = (
    <NavDropdown title={userInfo ? userInfo.name : ''} id='username'>
      <LinkContainer to='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
  const adminMenuHTMl = (
    <NavDropdown title='Admin' id='adminmenu'>
      <LinkContainer to='/admin/userlist'>
        <NavDropdown.Item>Users</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/admin/productlist'>
        <NavDropdown.Item>Products</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/admin/orderlist'>
        <NavDropdown.Item>Orders</NavDropdown.Item>
      </LinkContainer>
    </NavDropdown>
  );

  const guestHTML = (
    <LinkContainer to='/login'>
      <Nav.Link>
        <i className='fas fa-user'></i> Sign In
      </Nav.Link>
    </LinkContainer>
  );

  const oldHtml = (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? loggedHTMl : guestHTML}
              {userInfo && userInfo.isAdmin && adminMenuHTMl}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
  const newHeader = (
    <>
      <div className='redHeader'>
        <div className='redContainer'>
          <div className='redNavbar'>
            <div className='logo'>
              <Link to='/'>
                <img src='images/logo.png' alt='logo' width='125px' />
              </Link>
            </div>
            <nav className='redNav'>
              <ul
                id='MenuItems'
                style={
                  toggleMenu ? { maxHeight: '220px' } : { maxHeight: '0px' }
                }
              >
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <a href='/'>Products</a>
                </li>
                <li>
                  <a href='/'>About</a>
                </li>
                <li>
                  <a href='/'>Contact</a>
                </li>
                <li>
                  <a href='/'>Account</a>
                </li>
              </ul>
            </nav>
            <Link to='/cart'>
              <img
                src='images/cart.png'
                width='30px'
                height='30px'
                alt='cart'
              />
            </Link>
            <img
              className='menu-icon'
              onClick={toggleClass}
              src='images/menu.png'
              alt='menu'
            />
          </div>
        </div>
      </div>
    </>
  );

  return newHeader;
};

export default Header;
