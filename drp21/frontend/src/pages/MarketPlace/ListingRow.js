import Listing from './Listing';
import './ListingRow.css';

function ListingRow(props) {
    return (
        <div className='Row'>
            {
                props.listings === undefined ?
                    <div /> :
                    props.listings.map(l => <Listing listing={l} />)
            }
        </div>
    );
}

export default ListingRow;