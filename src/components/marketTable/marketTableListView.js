/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './marketTableListStyles.scss';

// functions
import { findMarkeTableDataSource } from './functions';

// Selector
import { currencySelector } from '../../redux/selectors';

// Components
import { marketColumns } from '../columns/tableColumns';

const MarketTable = ({ data, currencyUnit }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const dataSource = findMarkeTableDataSource(data, currencyUnit);
    setTableData(dataSource);
  }, [data, currencyUnit]);

  return (
    <div className="market-wrapper">
      <Row>
        <Col>
          <div className="market-list-wrapper">
            <Table
              style={{
                overflowY: 'auto',
              }}
              size="small"
              bordered
              loading={tableData.length <= 0}
              columns={marketColumns}
              dataSource={tableData}
              pagination={{
                pageSize: 10,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
MarketTable.propTypes = {
  data: PropTypes.array.isRequired,
  currencyUnit: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currencyUnit: currencySelector(state),
});

export default withRouter(connect(mapStateToProps)(MarketTable));
