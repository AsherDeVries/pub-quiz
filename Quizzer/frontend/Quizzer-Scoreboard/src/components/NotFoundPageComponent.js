import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPageComponent = () => {
  return (
    <div>
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPageComponent;
