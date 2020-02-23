import { createSelector } from 'reselect';

const getCoins = state => state.coins;

export const coinsSelector = createSelector([getCoins], coin => coin && coin.data);

export const isLoadingSelector = createSelector([getCoins], coin => coin && coin.isLoading);

export const statusSelector = createSelector([getCoins], coin => coin && coin.status);

export const coinSelector = createSelector([getCoins], coin => coin && coin.coinData);

export const historySelector = createSelector([getCoins], coin => coin && coin.history);

export const currencySelector = createSelector([getCoins], coin => coin && coin.currencyUnit);

export const marketSelector = createSelector([getCoins], coin => coin && coin.marketsData);
