import React from 'react';
import './notFoundPageStyles.scss';
import NOT_FOUND from '../../assets/images/notfound.svg';

const NotFoundPage = () => (
  <div>
    <img alt={NOT_FOUND} className="not-found-image" src={NOT_FOUND} />
  </div>
);
export default NotFoundPage;
