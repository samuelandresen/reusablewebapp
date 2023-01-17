import { UserContext } from '../../UserContext';
import { useState, useContext } from 'react'
import axios from 'axios'

function CreateRequest(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");

    const { user } = useContext(UserContext);

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value + ":00")
    }

    const handleCancel = (event) => {
        props.setSearchBar(true)
    }

    const submit = (event) => {
        props.setSearchBar(true)

        axios.post('https://drp21-backend.herokuapp.com/api/v1/requests', {
            title: title,
            description: description,
            availableUntil: dateTime,
            owner: user.email
        }, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/html; charset=UTF-8'
        }).then(() => props.setRefresh(true));

        event.preventDefault();
    }

    return (
        user ?
            <div className="Create">
                <div className="ListingFields">
                    <div className="ListingTop">
                        <textarea className="ListingTitle" type="text" onChange={handleTitleChange} value={title} placeholder="title" />
                        <div className="TimeInput">
                            <p className="DateTimeText">Enter the date and time your request will expire:</p>
                            <input className="DateTimeInput" type="datetime-local" onChange={handleDateTimeChange} />
                        </div>                    </div>
                    <div className="ListingBottom">
                        <textarea className="ListingDescription" type="text" onChange={handleDescriptionChange} value={description} placeholder="description" />
                    </div>
                </div>
                <div className="Buttons">
                    <button className="SubmitList" type="submit" onClick={submit}>Submit</button>
                    <button className="CancelList" type="submit" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            :
            <div className="Login">
                <h3 className='LoginText'> Please log in to create a request. </h3>
                <button className="Return" type="button" onClick={handleCancel}>Return</button>
            </div>
    )
}

export default CreateRequest;