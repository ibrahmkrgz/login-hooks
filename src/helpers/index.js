import React from 'react';
import NumberFormat from 'react-number-format';

export const numberFormatter = (num, prefix = '', suffix = '') => {
  if (isNaN(num) || !isFinite(num) || num === 0) {
    if (suffix) return <span>0.00%</span>;
    if (prefix) return <span>$0.00</span>;
    return <span>0</span>;
  }
  return (
    <NumberFormat
      value={num}
      decimalScale={prefix || suffix ? 2 : 0}
      displayType="text"
      thousandSeparator
      fixedDecimalScale
      prefix={prefix}
      suffix={suffix}
    />
  );
};

export const numberToStringFormatter = (num, digits) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  // eslint-disable-next-line no-plusplus
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

export const findCurrencyUnit = currency => {
  const units = [
    {
      unit: 'usd',
      symbol: '$',
    },
    {
      unit: 'euro',
      symbol: '€',
    },
    {
      unit: 'tl',
      symbol: 'TRY',
    },
  ];
  const selectedUnit = units.find(unit => unit.unit === currency);
  return selectedUnit.symbol;
};

export const findCurrencyValue = value => {
  const units = [
    {
      unit: 'usd',
      rate: 1,
    },
    {
      unit: 'euro',
      rate: 1.3,
    },
    {
      unit: 'tl',
      rate: 6,
    },
  ];
  const selectedUnit = units.find(unit => unit.unit === value);
  return selectedUnit.rate;
};
