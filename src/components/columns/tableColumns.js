export const tableColumns = filter => [
  {
    title: 'Rank',
    dataIndex: 'rank',
    sorter: (a, b) => a.rank - b.rank,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Name',
    dataIndex: 'name',
    filters: filter,
    onFilter: (value, record) => record.filterName.indexOf(value) === 0,
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
  },
  {
    title: 'Volume (24Hr)',
    dataIndex: 'volume',
  },
  {
    title: 'Change (24Hr)',
    dataIndex: 'change',
  },
];

export const marketColumns = [
  {
    title: 'Exchange',
    dataIndex: 'exchange',
  },
  {
    title: 'Pair',
    dataIndex: 'pair',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Volume (24Hr)',
    dataIndex: 'volume',
  },
];
