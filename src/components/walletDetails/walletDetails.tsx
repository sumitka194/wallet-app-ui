import { NavLink } from 'react-router-dom'

const WalletDetails = (props: { balance: number; name: string; walletId: string }) => {
  const { balance, name, walletId } = props;
  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div className="card-header">
        <NavLink to={`/transactions/${walletId}`} className="nav-link" activeClassName="active">
          Wallet Details
        </NavLink>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Name : {name}
        </li>
        <li className="list-group-item">
          Balance : {balance}
        </li>
      </ul>
    </div>
  );
}

export default WalletDetails;
