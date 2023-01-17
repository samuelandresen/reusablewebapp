import './Comment.css'
import UserDetails from './UserDetails';
import PostDetails from './PostDetails';
import Video from './Video';

function Comment(props) {
    console.log(props.video)
    return (
        
        <div key={props.id} className="Comment">
            <div className="Left-section">
                <UserDetails email={props.authorEmail} />
                <PostDetails dateTime={props.dateTime} />
            </div>
            <div className="Right-section">

                {props.video && props.video !== ""
                    ? <div className="CommentBodyWithVideo">
                        <div className="LeftVideo">
                            <Video video={props.video} />
                        </div>
                        <div className="RightVide">
                            <p className="Comment-body"> {props.body} </p>
                        </div>
                    </div>
                    : <p className="Comment-body"> {props.body} </p>}
            </div>
        </div>
    )
}

export default Comment