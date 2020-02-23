import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import Favicon from 'react-favicon';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import './applicationPage.scss';

// Pages
import LoginPage from '../../login/loginPageView';

// Selectors
import { isLoadingSelector } from '../../../redux/selectors';

// Constants
import { ROUTES } from '../../../config/routes';

// Components
import { Footer, Loader, Header, PrivateRoute } from '../../../components';

const ApplicationPage = ({ isLoading }) => {
  console.log(isLoading, 'loading');
  return (
    <div className='main'>
      <Favicon url='https://github.com/favicon.ico' />
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Coin Market</title>
      </Helmet>

      {isLoading && <Loader />}

      <Switch>
        <Route path='/login' component={LoginPage} />
        <>
          <Header />
          <div className='body'>
            {Object.keys(ROUTES).map(key => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <PrivateRoute exact key={key} {...ROUTES[key]} />
            ))}
          </div>
          <Footer />
        </>
      </Switch>
    </div>
  );
};

ApplicationPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state)
});

export default withRouter(connect(mapStateToProps)(ApplicationPage));
