import './CreateListing.css'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../UserContext';
import Preview from './Preview';

function CreateListing(props) {

    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [imagesToUpload, setImagesToUpload] = useState([]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value + ":00")
    }

    const handleFileSelected = event => {
        setImagesToUpload(event.target.files);
    }

    const handleCancel = (event) => {
        props.setSearchBar(true)
        props.setRefresh(true)
    }

    const submit = (event) => {
        props.setSearchBar(true)

        var id = null;

        axios.post('https://drp21-backend.herokuapp.com/api/v1/listings', {
            title: title,
            description: description,
            availableUntil: dateTime,
            owner: user.email
        }, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/html; charset=UTF-8'
        })
            .then(response => {
                id = response.data.id;

                for (var i = 0; i < imagesToUpload.length; i++) {
                    const fd = new FormData();
                    fd.append('photo', imagesToUpload[i]);
                    fd.append('listing', id);

                    axios.post('https://drp21-backend.herokuapp.com/api/v1/uploadPhoto', fd, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .then(response => console.log(response.data));
                }
                
            })
            .then(() => props.setRefresh(true));

        event.preventDefault();
    }

    return (
        user ?
            <div className="Content">
                <div className="Create">
                    <div className="ListingFields">
                        <div className="ListingTop">
                            <textarea className="ListingTitle" type="text" onChange={handleTitleChange} value={title} placeholder="title" />
                            <div className="TimeInput">
                                <p className="DateTimeText">Enter the date and time your listing will expire:</p>
                                <input className="DateTimeInput" type="datetime-local" onChange={handleDateTimeChange} />
                            </div>
                        </div>
                        <div className="ListingBottom">
                            <textarea className="ListingDescription" type="text" onChange={handleDescriptionChange} value={description} placeholder="description" />
                            <div className="UploadSection">
                                <label for="photoUpload"> Upload Photos: </label> <br /><br />
                                <input id="photoUpload" type="file" multiple onChange={handleFileSelected} />
                            </div>
                        </div>
                    </div>
                    <div className="Buttons">
                        <button className="SubmitList" type="submit" onClick={submit}>Submit</button>
                        <button className="CancelList" type="submit" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                <div className="Preview">
                    <Preview title={title} setRefresh={props.setRefresh} />
                </div>
            </div>
            :
            <div className='Login'>
                <h3 className='LoginText'> Please log in to create a post. </h3>
                <button className="Return" type="button" onClick={handleCancel}>Return</button>
            </div>
    )
}

export default CreateListing