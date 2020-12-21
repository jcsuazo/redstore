import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const allSteps = [
    { name: 'Sign In', route: '/login', currentStep: step1 },
    { name: 'Shipping', route: '/shipping', currentStep: step2 },
    { name: 'Payment', route: '/payment', currentStep: step3 },
    { name: 'Place Order', route: '/placeorder', currentStep: step4 },
  ];
  const stepsHTML = allSteps.map((step, i) => {
    return (
      <Nav.Item key={i} className='ml-0'>
        {step.currentStep ? (
          <LinkContainer to={step.route} className='ml-0'>
            <Nav.Link>{step.name}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{step.name}</Nav.Link>
        )}
      </Nav.Item>
    );
  });
  return <Nav className='justify-content-center mb-4'>{stepsHTML}</Nav>;
};

export default CheckoutSteps;
