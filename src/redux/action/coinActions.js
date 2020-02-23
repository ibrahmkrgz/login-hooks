import {
  SET_COINS_DATA,
  SET_COINS_DATA_FAIL,
  SET_IS_LOADING,
  SET_COINS_DATA_BY_ID,
  SET_COINS_DATA_BY_ID_FAIL,
  SET_COIN_HISTORY,
  SET_COIN_HISTORY_FAIL,
  SET_CURRENCY_UNIT,
  SET_MARKETS_DATA_BY_ID,
  SET_MARKETS_DATA_BY_ID_FAIL,
} from '../constants/reduxConstants';

import {
  getCoins,
  getCoinsById,
  getCoinsHistory,
  getMarketsById,
} from '../../api/providers/external';

export const coinsData = () => dispatch => {
  setIsLoading(dispatch, true);

  getCoins()
    .then(coins => {
      dispatch({
        type: SET_COINS_DATA,
        payload: { coins },
      });
    })
    .catch(error => {
      dispatch({
        type: SET_COINS_DATA_FAIL,
        payload: { ...error },
      });
    });
};

export const coinsDataById = id => dispatch => {
  setIsLoading(dispatch, true);

  getCoinsById(id)
    .then(coin => {
      dispatch({
        type: SET_COINS_DATA_BY_ID,
        payload: { coin },
      });
    })
    .catch(error => {
      dispatch({
        type: SET_COINS_DATA_BY_ID_FAIL,
        payload: { ...error },
      });
    });
};

export const coinHistoryById = (queryParam, startDate, endDate) => dispatch => {
  getCoinsHistory(queryParam, startDate, endDate)
    .then(history => {
      dispatch({
        type: SET_COIN_HISTORY,
        payload: { history },
      });
    })
    .catch(error => {
      dispatch({
        type: SET_COIN_HISTORY_FAIL,
        payload: { ...error },
      });
    });
};

export const marketsDataById = id => dispatch => {
  getMarketsById(id)
    .then(market => {
      dispatch({
        type: SET_MARKETS_DATA_BY_ID,
        payload: { market },
      });
    })
    .catch(error => {
      dispatch({
        type: SET_MARKETS_DATA_BY_ID_FAIL,
        payload: { ...error },
      });
    });
};

export const setLoadingTrue = () => dispatch => {
  setIsLoading(dispatch, true);
};

export const currencyUnit = id => dispatch => {
  setCurrencyUnit(dispatch, id);
};

export const setCoinsData = data => ({
  type: SET_COINS_DATA,
  payload: data,
});

export const setCoinsDataById = data => ({
  type: SET_COINS_DATA_BY_ID,
  payload: data,
});

export const setMarketsDataById = data => ({
  type: SET_MARKETS_DATA_BY_ID,
  payload: data,
});

export const setCoinHistoryById = data => ({
  type: SET_COIN_HISTORY,
  payload: data,
});

export const setCoinsDataFail = data => ({
  type: SET_COINS_DATA_FAIL,
  payload: data,
});

export const setCoinsDataByIdFail = data => ({
  type: SET_COINS_DATA_BY_ID_FAIL,
  payload: data,
});

export const setIsLoading = (dispatch, data) => {
  dispatch({
    type: SET_IS_LOADING,
    payload: data,
  });
};

export const setCurrencyUnit = (dispatch, data) => {
  dispatch({
    type: SET_CURRENCY_UNIT,
    payload: data,
  });
};
