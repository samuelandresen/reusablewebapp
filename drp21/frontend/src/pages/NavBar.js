import './NavBar.css';
import { Link, useHistory } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function NavBar() {

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const login = () => {
    let path = `login`
    history.push(path)
  }

  return (
    <div className='NavBar'>
      <p>
        <Link className='NavBarLink' to='/'>Home</Link>
        <Link className='NavBarLink' to='/market'>Marketplace</Link>
        <Link className='NavBarLink' to='/requests'>Requests</Link>
        <Link className='NavBarLink' to='/feed'>Repair Forum</Link>
        <div className="UserSection">
          {user !== null
            ? <button className="LogoutBtn" onClick={() => setUser(null)}>Logout</button>
            : <button className='LogoutBtn' onClick={login}>Login</button>
          }
        </div>
      </p>
    </div>
  );
}

export default NavBar;