import { type GetTransactionsResponse } from '../../utils/request'

type TransactionsTableProps = {
  transactions: GetTransactionsResponse[];
  page: number;
  setPage: (page: number) => void;
  sortData: (field: string) => void;
};

const TransactionsTable = ({ transactions, page, setPage, sortData }: TransactionsTableProps) => {

  const head = transactions.length ? Object.keys(transactions[0]).filter((key) => !key.startsWith('_')) : [];

  const data = transactions?.map((transaction) => Object.keys(transaction)
      .filter((key) => !key.startsWith('_'))
      .map((key) => transaction[key as keyof GetTransactionsResponse])
  );

  return (
    <div className="container max-content-width" style={{ marginTop: '5rem' }}>
      <table className="table table-striped table-bordered caption-top">
        <caption>Wallet Transactions</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            {head?.map((h) => {
              if (h === 'date') {
                return (<th style={{ cursor: 'pointer' }} onClick={() => sortData('sortByDate')} key={h} scope="col">{h}</th>)
              }
              if (h === 'amount') {
                return (<th style={{ cursor: 'pointer' }} onClick={() => sortData('sortByAmount')} key={h} scope="col">{h}</th>)
              }
              return (<th key={h} scope="col">{h}</th>)
            })}
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, i) => {
            const rowData = Object.keys(transaction)
              .filter((key) => !key.startsWith('_'))
              .map((key) => transaction[key as keyof GetTransactionsResponse]);
            const rowKey = transaction.id ?? transaction._id ?? i; // fallback to index if no id
            return (
              <tr key={rowKey}>
                <th key={`row-${rowKey}`} scope="row">{i + 1}</th>
                {rowData?.map((val, j) => (
                  <td key={`${val}-${rowKey}-${j}`}>{val}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!(page === 0 && data?.length < 10) && (<nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              className={`page-link${page === 0 ? ' disabled' : ''}`}
              disabled={page === 0}
              style={{ cursor: page === 0 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              className={`page-link${(page >= 0 && data.length < 10) ? ' disabled' : ''}`}
              disabled={page >= 0 && data.length < 10}
              style={{ cursor: (page >= 0 && data.length < 10) ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>)}
    </div>
  );
}

export default TransactionsTable;
