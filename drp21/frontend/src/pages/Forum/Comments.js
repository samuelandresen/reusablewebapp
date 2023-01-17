import React, { useEffect } from 'react';
import axios from 'axios'
import Comment from './Comment'

function Comments(props) {

    useEffect(() => {
      if (props.reload) {
        // GET request using axios inside useEffect React hook
        axios.get(`https://drp21-backend.herokuapp.com/api/v1/posts/${props.id}`)
          .then(response => props.updateDisplay(response));
      }
      props.setReload(false);
    }, [props, props.setReload]);

    console.log(props.getReq.data)

    return (
        <div>
            {props.getReq.data === undefined || props.getReq.data.comments.length === 0
                ? <div className="No-comments">
                    <p>No Comments Found <br /> Be the first to comment!</p>
                </div>
                : props.getReq.data.comments.map(ele =>
                    <Comment
                        id={ele.id}
                        body={ele.body}
                        dateTime={ele.datePosted}
                        authorEmail={ele.authorEmail}
                        video={ele.video}
                    />
                )}
        </div>
    )
}

export default Comments;