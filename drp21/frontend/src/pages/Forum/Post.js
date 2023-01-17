
import React, { useContext, useState } from 'react';
import CreateComment from './CreateComment'
import Comments from './Comments'
import UserDetails from './UserDetails';
import PostDetails from './PostDetails';
import './Post.css';
import { UserContext } from '../../UserContext';

function Post(props) {
    const { user } = useContext(UserContext);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [reload, setReload] = useState(true)
    const [displayComments, setDisplayComments] = useState([])

    function updateDisplay(event) {
        setDisplayComments(event)
    }

    return (
        <div className="FullPost">
            <div key={props.id} className="Post">
                <div className="Left-section-post">
                    <UserDetails email={props.authorEmail} />
                    <PostDetails dateTime={[props.time, <br />, props.date]} />
                </div>

                <div className="Center-section-post">
                    <h6 className="TitleOfPost">{props.title}</h6>
                    <p className="Post-body"> {props.text} </p>
                </div>
                <div className="Right-section-post">
                    <div className="Category">
                        <p className="Category-text">{props.category}</p>
                    </div>
                    <button className="Comment-button"
                        onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? 'Show' : 'Hide'} Comments
                    </button>
                </div>
            </div>

            <div className="Comment-section">
                {isCollapsed
                    ? <div />
                    : <div>
                        {user
                            ? <CreateComment setReload={setReload} id={props.id} />
                            : <p>Sign in to comment!</p>
                        }
                        <Comments reload={reload}
                            setReload={setReload}
                            updateDisplay={updateDisplay}
                            getReq={displayComments}
                            id={props.id}
                            comments={props.comments} />
                    </div>}
            </div>
        </div>

    )
}

export default Post;