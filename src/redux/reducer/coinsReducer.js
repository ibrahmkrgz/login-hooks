import get from 'lodash/get';
import {
  SET_COINS_DATA,
  SET_COINS_DATA_FAIL,
  SET_IS_LOADING,
  SET_COINS_DATA_BY_ID,
  SET_COIN_HISTORY,
  SET_CURRENCY_UNIT,
  SET_MARKETS_DATA_BY_ID,
} from '../constants/reduxConstants';

const initialState = {
  status: '',
  data: [],
  isLoading: false,
  coinData: {},
  history: [],
  currencyUnit: 'usd',
  marketsData: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COINS_DATA: {
      const { coins } = action.payload;

      return {
        ...state,
        data: coins,
        isLoading: false,
      };
    }

    case SET_COINS_DATA_BY_ID: {
      const { coin } = action.payload;

      return {
        ...state,
        coinData: coin.data,
      };
    }

    case SET_MARKETS_DATA_BY_ID: {
      const { market } = action.payload;

      return {
        ...state,
        marketsData: market,
      };
    }

    case SET_COIN_HISTORY: {
      const { history } = action.payload;

      return {
        ...state,
        history,
        isLoading: false,
      };
    }

    case SET_COINS_DATA_FAIL:
      const { response } = action.payload;
      return {
        ...state,
        status: get(response, 'data.message', ''),
        isLoading: false,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_CURRENCY_UNIT:
      return {
        ...state,
        currencyUnit: action.payload,
      };

    default:
      return state;
  }
}
