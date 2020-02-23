import axios from 'axios';
import get from 'lodash/get';

const coinUrl = id => `https://api.coincap.io/v2/assets/${id}`;

const coinHistoryUrl = (queryParam, startDate, endDate) =>
  `https://api.coinpaprika.com/v1/coins/${queryParam}/ohlcv/historical?start=${startDate}&end=${endDate}`;

const marketUrl = id => `https://api.coinpaprika.com/v1/coins/${id}/markets`;

export const getCoins = () =>
  new Promise((resolve, reject) => {
    axios
      .get('https://api.coincap.io/v2/assets')
      .then(res => {
        resolve(get(res, 'data.data'));
      })
      .catch(error => {
        reject(error);
      });
  });

export const getCoinsById = id =>
  new Promise((resolve, reject) => {
    axios
      .get(coinUrl(id))
      .then(res => {
        resolve(get(res, 'data'));
      })
      .catch(error => {
        reject(error);
      });
  });

export const getCoinsHistory = (queryParam, startDate, endDate) =>
  new Promise((resolve, reject) => {
    axios
      .get(coinHistoryUrl(queryParam, startDate, endDate))
      .then(res => {
        resolve(get(res, 'data'));
      })
      .catch(error => {
        reject(error);
      });
  });

export const getMarketsById = id =>
  new Promise((resolve, reject) => {
    axios
      .get(marketUrl(id))
      .then(res => {
        resolve(get(res, 'data'));
      })
      .catch(error => {
        reject(error);
      });
  });
