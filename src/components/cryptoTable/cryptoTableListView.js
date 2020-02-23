/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './cryptoTableList.scss';

// functions
import { findCryptoTableDataSource } from './functions';

// Selector
import { currencySelector } from '../../redux/selectors';

// Components
import { tableColumns } from '../columns/tableColumns';

const CryptoTable = ({ data, history, currencyUnit }) => {
  const [tableData, setTableData] = useState([]);
  const [column, setColumns] = useState([]);

  useEffect(() => {
    const dataSources = findCryptoTableDataSource(data, currencyUnit);
    const column = tableColumns(dataSources.filteredData);
    setColumns(column);
    setTableData(dataSources.dataSource);
  }, [data, currencyUnit]);

  return (
    <div className="table-wrapper">
      <Row gutter={32}>
        <Col>
          <div className="list-wrapper">
            <Table
              style={{
                overflowY: 'auto',
              }}
              size="small"
              bordered
              loading={tableData.length <= 0}
              columns={column}
              dataSource={tableData}
              pagination={{
                pageSize: 10,
              }}
              onRow={record => ({
                onClick: () => {
                  history.push({
                    pathname: `/${record.symbol.toLowerCase()}`,
                    state: {
                      coin: {
                        id: record.id,
                        symbol: record.symbol,
                      },
                    },
                  });
                },
              })}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
CryptoTable.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  currencyUnit: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currencyUnit: currencySelector(state),
});

export default withRouter(connect(mapStateToProps)(CryptoTable));
