import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { TransactionsTable } from '../../components/transactionsTable';

import { getTransactions, type GetTransactionsResponse } from '../../utils/request';

const Transactions = () => {
  const [transactions, setTransactions] = useState<GetTransactionsResponse[]>([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<{ by: string; order: 'asc' | 'desc' }>({ by: '', order: 'asc' });
  const { walletId } = useParams<{ walletId: string }>();

  const sortData = (field: string) => {
    const { by, order } = sort;
    if (by === field) {
      const newOrder = order === 'asc' ? 'desc' : 'asc';
      setSort({ by, order: newOrder });
    } else {
      setSort({ by: field, order: 'desc' });
    }
  }

  useEffect(() => {
    let options = {
      skip: page * 10,
      limit: 10,
    };
    options = sort.by ? { ...options, [sort.by]: sort.order } : options;
    getTransactions(walletId, options)
      .then((res) => {
        setTransactions(res);
      }).catch(err => {
        console.log(err);
      });
  }, [walletId, page, sort]);

  return <TransactionsTable page={page} setPage={setPage} sortData={sortData} transactions={transactions} />;
};

export default Transactions;
