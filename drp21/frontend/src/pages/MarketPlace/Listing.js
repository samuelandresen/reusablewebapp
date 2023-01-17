import './Listing.css';
import defaultListing from '../../images/noImageAvailable.png';
import Carousel from 'react-elastic-carousel';

function Listing(props) {

    const url = props.listing.photos.length 
        ? `https://drp21-backend.herokuapp.com/api/v1/downloadPhoto/`
        : defaultListing;

    return (
        <div className='Listing'>
            <Carousel className='Carousel'>
              {props.listing.photos.map(
                photo => 
                  <img src={url + `${photo.id}`} className='DefaultListingPicture' alt="img"/>

              )}
            </Carousel>
            <h3 className="Title">{props.listing.title}</h3>
            <p className="Description"> {props.listing.description} </p>
            <div id='bottom'>
            {/* <p className="TimeRemaining"> Available until: {props.listing.timeRemaining} </p> */}
            <p className="TimeRemaining"> Available until: {props.listing.availableUntil} </p>
                <p className="TimeRemaining"> {props.listing.ownerEmail} </p>
                {/* <Link className='MessageOwner' to='/'>Message the owner</Link> */}
            </div>
        </div>
    );
}

export default Listing;