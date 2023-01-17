import axios from 'axios';
import './LoginPage.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import {Link, useHistory} from 'react-router-dom'
import LoginDetails from './LoginDetails';

function LoginPage() {
  const { user, setUser } = useContext(UserContext); 
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false)

  const history = useHistory();

  const handleEmail = event => {
    setEmail(event.target.value);
    setEmailError(false)
  };

  const attemptLogin = email => {
    console.log(email)
    if (email === "") {
      setEmailError(true)
      return
    }
    axios.get(`https://drp21-backend.herokuapp.com/api/v1/users/${email}`)
      .then(response => {
        setUser(response.data);
        setEmail('');
        setEmailError(false)
        let path = ``
        history.push(path)
      })
      .catch(() => {
        setEmailError(true)
      }) 
  };

  return (
    <div className='LoginPage' align='center'>
      {
        user
        ? <>
            <h2>Hi, {user.firstname}</h2> 
            <button onClick={() => setUser(null)}>logout</button> 
          </>
        : <>
            <LoginDetails
              email={email}
              handleEmail={handleEmail}
              attemptLogin={attemptLogin}
              emailError={emailError}
            />
            <div className='CreateAccountText'>
              <p>Don't have an account?
                <Link className='CreateAccountLink' to='/createAccount'>Click here to create one.</Link>
              </p>
            </div>
          </>
      }
    </div>
  );
}

export default LoginPage;