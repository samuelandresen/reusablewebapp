import './LoginDetails.css';

function LoginDetails(props) {
  return (
    <div>
      <h2>Sign into your account</h2>
      <div className="LoginDetails">
        <label for="user"> Email Address: </label>
        <input className="LoginInput" id="user" type='text' onChange={props.handleEmail} value={props.email} placeholder='Enter your email address...' />
        {props.emailError
          ? <p className="EmailError">Please enter a valid email or register</p>
          : <div />
        }
        <button className="LoginButton" onClick={() => props.attemptLogin(props.email)}>Sign in</button>
      </div>
    </div>
  );
}

export default LoginDetails;