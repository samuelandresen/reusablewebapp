import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultProfile from '../../images/default-profile-picture.jpg';
import './UserDetails.css';

function UserDetails(props) {

  const [name, setName] = useState('loading...');
  const [loaded, setLoaded] = useState(false);

  useEffect (() => {
    if (props.email !== null && !loaded) {
      axios.get(`https://drp21-backend.herokuapp.com/api/v1/users/${props.email}`)
        .then(response => {
          setName(`${response.data.firstname} ${response.data.surname}`);
          setLoaded(true);          
        });
    }
  });
  
    return (
        <>
            <img src={defaultProfile} className='ProfilePicture' alt="Profile img"/>
            <p className="Username"> {name} </p>
        </>
    );
}

export default UserDetails;