import { NavLink } from 'react-router-dom';

const Header = () => {
  const walletId = localStorage.getItem('walletId');
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid max-content-width">
        <a className="navbar-brand" href="/">WalletApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">

              <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/transactions/${walletId}`} className="nav-link" activeClassName="active">Transactions</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Header;
