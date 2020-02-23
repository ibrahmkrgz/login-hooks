import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './homePageStyles.scss';

// Selectors
import { coinsSelector } from '../../redux/selectors';

// Components
import { CryptoTable, Summary } from '../../components';

// Actions
import { coinsData } from '../../redux/action';

const HomePage = ({ coins, coinsData }) => {
  useEffect(() => {
    async function fetchData() {
      await setTimeout(() => coinsData(), 1000);
    }
    fetchData();
  }, [coinsData]);

  return (
    <div className="container">
      <div className="home-background" />
      <div className="summary">
        <Summary data={coins} />
      </div>
      {coins && coins.length > 0 ? (
        <CryptoTable data={coins} />
      ) : (
        <strong> There is no data </strong>
      )}
    </div>
  );
};
HomePage.propTypes = {
  coins: PropTypes.array.isRequired,
  coinsData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  coins: coinsSelector(state),
});

const mapDispatchToProps = {
  coinsData,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
