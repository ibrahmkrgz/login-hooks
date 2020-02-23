import React from 'react';
import get from 'lodash/get';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import {
  numberFormatter,
  numberToStringFormatter,
  findCurrencyUnit,
  findCurrencyValue,
} from '../../helpers';
import './cryptoTableList.scss';

export const findCryptoTableDataSource = (data, currencyUnit) => {
  const dataSources = {
    dataSource: [],
    filteredData: [],
  };

  data.forEach(currency => {
    dataSources.dataSource.push({
      key: get(currency, 'id', ''),
      id: get(currency, 'id', ''),
      rank: get(currency, 'rank', ''),
      symbol: get(currency, 'symbol', ''),
      filterName: get(currency, 'name', ''),
      name: (
        <div>
          {get(currency, 'name', '')}
          <br />
          <span className="symbol">{get(currency, 'symbol', '')}</span>
        </div>
      ),
      price: numberFormatter(
        get(currency, 'priceUsd', '') * findCurrencyValue(currencyUnit),
        findCurrencyUnit(currencyUnit),
      ),
      marketCap: (
        <div>
          {numberToStringFormatter(
            get(currency, 'marketCapUsd', '') * findCurrencyValue(currencyUnit),
            1,
          )}
        </div>
      ),
      volume: numberToStringFormatter(
        get(currency, 'volumeUsd24Hr', '') * findCurrencyValue(currencyUnit),
        1,
      ),
      change: (
        <div>
          <NumberInfo
            subTotal={numberFormatter(get(currency, 'changePercent24Hr', ''), null, '%')}
            status={parseFloat(get(currency, 'changePercent24Hr', '')) > 0 ? 'up' : 'down'}
          />
        </div>
      ),
    });

    dataSources.filteredData.push({
      text: get(currency, 'name', ''),
      value: get(currency, 'name', ''),
    });
  });
  return dataSources;
};
