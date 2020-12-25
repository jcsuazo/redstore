import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = ({ color }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          display: 'block',
          color,
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};
Loader.defaultProps = {
  color: '#ff523b',
};
export default Loader;
