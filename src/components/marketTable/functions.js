import get from 'lodash/get';
import {
  numberFormatter,
  numberToStringFormatter,
  findCurrencyUnit,
  findCurrencyValue,
} from '../../helpers';
import './marketTableListStyles.scss';

export const findMarkeTableDataSource = (data, currencyUnit) => {
  const dataSource = [];

  data.forEach((market, index) => {
    dataSource.push({
      key: `${get(market, 'exchange_id', '')} - ${index}`,
      id: get(market, 'exchange_id', ''),
      exchange: get(market, 'exchange_name', ''),
      pair: get(market, 'pair', ''),
      price: numberFormatter(
        get(market, 'quotes.USD.price', '') * findCurrencyValue(currencyUnit),
        findCurrencyUnit(currencyUnit),
      ),
      volume: numberToStringFormatter(get(market, 'quotes.USD.volume_24h', ''), 1),
    });
  });

  return dataSource;
};
