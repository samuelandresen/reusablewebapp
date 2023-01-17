import './PostDetails.css';

function PostDetails(props) {
    return (
        <p className="Date">{props.dateTime}</p>
    );
}

export default PostDetails;