import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount () {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [charity, setCharity] = useState(false);
  const [charityLogo, setCharityLogo] = useState(null);

  const history = useHistory();


  const handleEmailInput = event => {
    setEmail(event.target.value);
  }

  const handleFirstnameInput = event => {
    setFirstname(event.target.value);
  }

  const handleSurnameInput = event => {
    setSurname(event.target.value);
  }

  const handleCharity = event => {
    setCharity(!charity);
    setFirstname('');
    setSurname('');
  }

  const handleLogoSelected = event => {
    setCharityLogo(event.target.files[0]);
  }

  const handleSubmit = () => {
    if (email && firstname && (surname || charity)) {
      axios.post('https://drp21-backend.herokuapp.com/api/v1/users/', {
        'email': email,
        'firstname': firstname,
        'surname': surname,
        'charity': charity
      })
      .then(response => {
        const fd = new FormData();
        fd.append('logo', charityLogo);
        fd.append('charity', email);

        axios.post('https://drp21-backend.herokuapp.com/api/v1/uploadLogo', fd,{
          'Content-Type': 'multipart/form-data'
        }).then(response => console.log(response));
        setEmail('')
        setFirstname('');
        setSurname('');
        setCharityLogo(null);
      }).catch(error => console.log(error))
    } else {
      console.log('empty');
    }
    let path = `login`
    history.push(path)

  }

  return (
    <div className='CreateAccountPage' align='center'>
      <h2>Create an account</h2>
      <div className='CreateAccountForm'>
        
        <label className='CharityText' for='charityBox'>
          Do you represent a charity?
        </label>
        <input id='charityBox' type='checkbox' value={charity} onChange={handleCharity}/> 
        <br/><br/>
        <label for='emailInput'> Email Address: </label>
        <input id='emailInput' className='CreateAccountInput' 
          type='text' placeholder='Please enter your email address.'
          onChange={handleEmailInput}
        />
        <br/> <br/>
        { charity 
          ? <>
            <label for='charityInput'> Charity name: </label>
            <input  id='charityInput' className='CreateAccountInput' 
              type='text' placeholder="Please enter your charity's name." 
              value={firstname}
              onChange={handleFirstnameInput}
            />
            <br/><br/>
            <label for="photoUpload"> Upload Charity Logo: </label> <br/>
            <input id="photoUpload"
            type="file"
            onChange={handleLogoSelected}
            />
            </>
          : <>
            <label for='firstNameInput'> First name: </label>
            <input  id='firstNameInput' className='CreateAccountInput' 
              type='text' placeholder='Please enter your firstname.' 
              value={firstname}
              onChange={handleFirstnameInput}
            />
            <br/><br/>
            <label for='surnameInput'> Surname: </label>
            <input id='surnameInput' className='CreateAccountInput'
              type='text' placeholder='Please enter your surname.'
              value={surname}
              onChange={handleSurnameInput}
            /></>
        }
        <button className='CreateAccountButton' onClick={handleSubmit}>Sign Up!</button>
      </div>
    </div>
  );
}

export default CreateAccount;