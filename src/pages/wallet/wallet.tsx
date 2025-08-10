import { useState, useEffect, useCallback } from 'react';

import { InitWalletForm } from '../../components/initWalletForm';
import { WalletDetails } from '../../components/walletDetails';
import { WalletTransactionForm } from '../../components/walletTransactionForm';

import { setupWallet, getWallet, type GetWalletResponse } from '../../utils/request'

const Wallet = () => {
  const [walletDetails, setWalletDetails] = useState<GetWalletResponse>({ _id: '', id: '', name: '', balance: 0, date: '', __v: 0 });
  const [walletId, setWalletId] = useState<string | null>(localStorage.getItem('walletId'));
  const initWallet = (name: string, balance: number) => {
    setupWallet({ name, balance })
      .then((res) => {
        const { id } = res;
        localStorage.setItem('walletId', id);
        setWalletId(id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const fetchWalletDetails = useCallback(() => {
    if (!walletId) return;
    getWallet(walletId)
      .then((data) => {
        setWalletDetails(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [walletId]);

  useEffect(() => {
    if (walletId) {
      fetchWalletDetails();
    }
  }, [walletId, fetchWalletDetails]);

  const { name, balance } = walletDetails;
  
  return walletId
    ? (
    <div className="container">
      <div className="row justify-content-md-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-md">
          <div className="col">
            <WalletDetails name={name} balance={balance} walletId={walletId} />
          </div>
          <div className="col">
            <WalletTransactionForm fetchWalletDetails={fetchWalletDetails} />
          </div>
        </div>
      </div>
    </div>
  )
    : <InitWalletForm initWallet={initWallet} />
}

export default Wallet;