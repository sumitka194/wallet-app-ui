import { useState, useEffect } from 'react';

import { InitWalletForm } from '../../components/initWalletForm';
import { WalletDetails } from '../../components/walletDetails';
import { WalletTransactionForm } from '../../components/walletTransactionForm';

import { setupWallet, getWallet } from '../../utils/request'

const Wallet = () => {
  const [walletDetails, setWalletDetails] = useState({});
  const [walletId, setWalletId] = useState(localStorage.getItem('walletId'));
  const initWallet = (name, balance) => {
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

  const fetchWalletDetails = () => {
    getWallet(walletId)
      .then((data) => {
        setWalletDetails(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    walletId && fetchWalletDetails();
  }, [walletId]);

  const { name, balance } = walletDetails;

  const walletInfo = (
    <div className="container">
      <div className="row justify-content-md-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-md">
          <div className="col">
            <WalletDetails name={name} balance={balance} />
          </div>
          <div className="col">
            <WalletTransactionForm fetchWalletDetails={fetchWalletDetails} />
          </div>
        </div>
      </div>
    </div>
  )
  
  return walletId
    ? walletInfo
    : <InitWalletForm initWallet={initWallet} />
}

export default Wallet;