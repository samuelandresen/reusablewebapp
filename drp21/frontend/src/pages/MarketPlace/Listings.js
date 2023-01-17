import { useContext, useEffect } from 'react';
import ListingRow from './ListingRow';
import axios from 'axios';
import { ListingPost } from '../../ListingPost'
import TimeDateSort from '../TimeDateSort'

function splitArray(array, groupSize) {
    const numGroups = Math.ceil(array.length / groupSize);
    return new Array(numGroups)
        .fill('')
        .map((_, i) => array.slice(i * groupSize, (i + 1) * groupSize));
}

function filter(listings, search) {
    if (search !== "") {
        return listings.filter(e => e.title.toLowerCase().includes(search.toLowerCase())
            || e.description.toLowerCase().includes(search.toLowerCase()))
    }
    return listings
}


function Listings(props) {

    const { listing, setListings } = useContext(ListingPost);

    //TODO: GET request to fetch listings and display
    useEffect(() => {
        if (props.refresh) {
            // GET request using axios inside useEffect React hook
            axios.get('https://drp21-backend.herokuapp.com/api/v1/listings')
                .then(response => setListings(response.data));
        }
        props.setRefresh(false)
    }, [props, setListings]);

    return (
        <div className="Listings">
            {listing === null || listing === undefined
                ? <p> No Listings </p>
                : splitArray(filter(listing, props.search).sort(TimeDateSort), 4).map(listingGroup =>
                    <ListingRow listings={listingGroup} />)
            }
        </div>
    );
}

export default Listings;
