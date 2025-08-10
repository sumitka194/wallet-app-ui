import { useState } from 'react';
import { Input } from '../input';
import { Select } from '../select';
import { Button } from '../button';

import { startTransactions, type TransactionType } from '../../utils/request';

const options = [{ label: 'select type', value: '' }, { label: 'CREDIT', value: 'CREDIT' }, { label: 'DEBIT', value: 'DEBIT' }];

const WalletTransactionForm = ({ fetchWalletDetails }: { fetchWalletDetails: () => void }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('CREDIT');
  const onSubmit = () => {
    const walletId = localStorage.getItem('walletId') || '';
    const val = type === 'CREDIT' ? amount : -amount;
    startTransactions(walletId, { amount: Number(val), description: type })
      .then((res) => {
        console.log(res);
        fetchWalletDetails();
        setAmount('');
        setType('CREDIT');
      }).catch(err => {
        console.log(err);
      });
  }
  return (
    <div className="card text-dark bg-light mb-3">
      <div className="card-header">Update Wallet</div>
      <form className="wallet-form">
        <div className="mb-3">
          <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
          <div className="col-sm-10">
          <Input name='amount' placeholder='Amount' value={amount} onChange={(_: string, value: string) => setAmount(value)} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
          <div className="col-sm-10">
          <Select options={options} selected={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as TransactionType)} />
          </div>
        </div>
        <Button name='Submit' onSubmit={onSubmit} />
      </form>
    </div>
  );
}

export default WalletTransactionForm;
