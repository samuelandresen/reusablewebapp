import Request from './Request';
import './RequestRow.css';

function RequestRow(props) {
    return (
        <div className='Row'>
            {
                props.listings === undefined ?
                    <div /> :
                    props.listings.map(l => <Request listing={l} />)
            }
        </div>
    );
}

export default RequestRow;