import './CreateComment.css';
import React, { useContext, useState } from 'react';
import axios from 'axios'
import { UserContext } from '../../UserContext';

function CreateComment(props) {
    const { user } = useContext(UserContext);

    const [description, setDescription] = useState("")
    const [video, setVideo] = useState("")

    const handleTextChange = (event) => {
        setDescription(event.target.value)
    }

    const handleVideoChange = (event) => {
        setVideo(event.target.value)
    }

    const handleCancel = () => {
        setDescription("")
    }

    const handleSubmit = (event) => {
        //POST method
        if (description === "") {
            console.log("empty comment")
            return
        }

        axios.post(`https://drp21-backend.herokuapp.com/api/v1/comments`, {
            post: props.id,
            author: user.email,
            body: description,
            video: video
        }, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/html; charset=UTF-8'
        }).then(() => props.setReload(true))

        setDescription("")
        setVideo("")
        event.preventDefault();
        props.setReload(true);
    }

    return (
        <div className="CreateComment">
            <div className="CommentBody">
                <textarea className="CommentText" type="text" onChange={handleTextChange} value={description} placeholder="Create Comment" />
                <textarea className="CommentVideo" type="text" onChange={handleVideoChange} value={video} placeholder="Video if required (otherwise leave empty)" />
            </div>
            <div className="SubmitButtons">
                <button className="SubmitComment" type="submit" onClick={handleSubmit}>Comment</button>
                <button className="CancelComment" type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateComment;