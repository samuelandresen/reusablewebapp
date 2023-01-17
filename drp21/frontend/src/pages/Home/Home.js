import './Home.css';
import React, { useContext } from 'react';
import logo from '../../images/recycle-logo.png'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../UserContext'

function Home() {

    const { user, setUser } = useContext(UserContext)

    const history = useHistory();

    const routeChangeMarketplace = () => {
        let path = `market`;
        history.push(path);
    }

    const routeChangeRequests = () => {
        let path = `requests`;
        history.push(path);
    }

    const routeChangeRepairForum = () => {
        let path = `feed`;
        history.push(path);
    }

    const routeChangeLogin = () => {
        let path = `login`;
        history.push(path);
    }

    return (
        <div className="Home">
            <header className="Home-header">
                <div className="HomeContainer" style={{ width: "90%" }}>
                    <img src={logo} className="Home-logo" alt="logo" />
                    <h3 className="AppTitle">eCycling</h3>
                    <div className="Home-redirects">
                        <button className="Home-btn" onClick={routeChangeMarketplace}>Give or get devices</button>
                        <button className="Home-btn" onClick={routeChangeRequests}>Request some devices</button>
                        <button className="Home-btn" onClick={routeChangeRepairForum}>Need help repairing</button>
                    </div>
                    {user
                        ?
                        <div className="LoggedIn">
                            <p>Welcome {user.firstname} {user.surname}</p>
                            <button className="HomeLogOut btn" onClick={() => setUser(null)}>logout</button>
                        </div>
                        :
                        <button className="Login-btn btn" onClick={routeChangeLogin}>Login</button>
                    }
                </div>
            </header>
        </div>
    );
}

export default Home;
