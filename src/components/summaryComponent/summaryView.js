/* eslint-disable radix */
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import get from 'lodash/get';

// helpers
import { numberToStringFormatter, findCurrencyUnit, findCurrencyValue } from '../../helpers';

// Selector
import { currencySelector } from '../../redux/selectors';

const Summary = ({ data, currencyUnit }) => {
  const findMarketCap = data => {
    const marketCup = _.sumBy(data, sum => parseInt(get(sum, 'marketCapUsd', '')));

    return numberToStringFormatter(marketCup * findCurrencyValue(currencyUnit), 1);
  };

  const findTotalAssets = data => data.length;

  return (
    <Row>
      <Col span={8}>
        Market Cap
        <br />
        {findCurrencyUnit(currencyUnit)}
        {findMarketCap(data)}
      </Col>
      <Col span={8}>
        <img
          alt="logo"
          className="logo"
          src="https://www.ewallet-optimizer.com/app/uploads/bitcoin_footer.png"
        />
      </Col>
      <Col span={8}>
        Assets
        <br />
        {findTotalAssets(data)}
      </Col>
    </Row>
  );
};

Summary.propTypes = {
  currencyUnit: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  currencyUnit: currencySelector(state),
});

export default connect(mapStateToProps)(Summary);
