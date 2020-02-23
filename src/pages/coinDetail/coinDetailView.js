/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';
import moment from 'moment';
import Chart from 'react-google-charts';
import { DatePicker } from 'antd';
import { coinsDataById, coinHistoryById, marketsDataById } from '../../redux/action';
import './coinDetailStyles.scss';

// Selectors
import {
  coinSelector,
  historySelector,
  currencySelector,
  marketSelector,
} from '../../redux/selectors';

// Components
import { MarketTable } from '../../components';

// helpers
import { findCurrencyUnit, findCurrencyValue, numberToStringFormatter } from '../../helpers';

const CoinDetail = ({
  history,
  coinsDataById,
  coin,
  coinHistory,
  currency,
  coinHistoryById,
  marketsDataById,
  market,
}) => {
  const [chartData, setChartData] = useState([]);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    moment()
      .utc()
      .subtract(1, 'week')
      .startOf('day'),
  );
  const [endDate, setEndDate] = useState(
    moment()
      .utc()
      .endOf('day'),
  );
  const { state } = useLocation();

  const options = {
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      baselineColor: '#fff',
      gridlineColor: '#fff',
      textPosition: 'none',
    },
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };

  useEffect(() => {
    async function fetchData(id) {
      await coinsDataById(id);
    }

    if (get(state, 'coin')) {
      fetchData(get(state, 'coin.id'));
    } else {
      history.push('/');
    }
  }, [state]);

  useEffect(() => {
    async function fetchData(id) {
      await marketsDataById(id);
    }

    if (get(state, 'coin')) {
      const queryParam = get(state, 'coin.symbol')
        .toLowerCase()
        .concat('-', get(state, 'coin.id'));

      fetchData(queryParam);
    } else {
      history.push('/');
    }
  }, [state]);

  useEffect(() => {
    async function fetchData(queryParam, startDate, endDate) {
      await coinHistoryById(queryParam, startDate, endDate);
    }

    if (get(state, 'coin')) {
      const queryParam = get(state, 'coin.symbol')
        .toLowerCase()
        .concat('-', get(state, 'coin.id'));
      fetchData(queryParam, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    } else {
      history.push('/');
    }
  }, [state, startDate, endDate]);

  useEffect(() => {
    const dataSource = [['Date', 'Price']];
    function fillData() {
      coinHistory.forEach(history => {
        const formattedDate = moment(get(history, 'time_close', '')).format('YYYY-MM-DD');
        const parsedPrice = get(history, 'high', '') * findCurrencyValue(currency);
        dataSource.push([formattedDate, parsedPrice]);
      });

      setChartData(dataSource);
    }
    fillData();
  }, [coinHistory, currency]);

  return (
    <div className="wrapper">
      <div className="background" />
      <div className="coin-detail">
        <div className="coin-rank">
          <h1>{get(coin, 'rank', '')}</h1>
          <p>Rank</p>
        </div>
        <div className="coin-value">
          {get(coin, 'name', '').concat(' (', get(state, 'coin.symbol'), ')')}
          <br />
          {findCurrencyUnit(currency)}
          {numberToStringFormatter(get(coin, 'priceUsd', '') * findCurrencyValue(currency), 1)}
        </div>
      </div>
      <div />
      <div className="range-picker">
        <DatePicker
          format="YYYY-MM-DD"
          value={startDate}
          onChange={value => setStartDate(value)}
          onOpenChange={handleStartOpenChange}
        />
        <DatePicker
          format="YYYY-MM-DD"
          value={endDate}
          onChange={value => setEndDate(value)}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
        />
      </div>
      <div className="chart-styles">
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={chartData}
          options={options}
          formatters={[
            {
              type: 'NumberFormat',
              column: 1,
              options: {
                prefix: findCurrencyUnit(currency),
              },
            },
          ]}
        />
      </div>
      <div className="market-styles">
        <MarketTable data={market} />
      </div>
    </div>
  );
};

CoinDetail.propTypes = {
  history: PropTypes.object.isRequired,
  coinsDataById: PropTypes.func.isRequired,
  coin: PropTypes.object.isRequired,
  coinHistory: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  coinHistoryById: PropTypes.func.isRequired,
  marketsDataById: PropTypes.func.isRequired,
  market: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
  coinsDataById,
  coinHistoryById,
  marketsDataById,
};

const mapStateToProps = state => ({
  coin: coinSelector(state),
  coinHistory: historySelector(state),
  currency: currencySelector(state),
  market: marketSelector(state),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinDetail));
