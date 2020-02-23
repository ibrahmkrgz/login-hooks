import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencyUnit } from '../../redux/action';
import './selectBoxStyles.scss';

// Selector
import { currencySelector } from '../../redux/selectors';

const SelectBox = ({ currencyUnit, currency }) => {
  const { Option } = Select;

  const selectOnChange = async e => {
    await currencyUnit(e);
  };

  return (
    <div className="select-wrapper">
      <Select
        onChange={value => selectOnChange(value)}
        defaultValue={currency}
        style={{ width: 80 }}
        size="small"
        placeholder="Select"
      >
        <Option value="usd">USD</Option>
        <Option value="euro">EUR</Option>
        <Option value="tl">TL</Option>
      </Select>
    </div>
  );
};

SelectBox.propTypes = {
  currencyUnit: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currency: currencySelector(state),
});

const mapDispatchToProps = {
  currencyUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBox);
