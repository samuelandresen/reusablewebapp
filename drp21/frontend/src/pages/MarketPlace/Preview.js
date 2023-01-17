import './Preview.css'
import { useEffect, useContext } from 'react'
import { RequestPost } from '../../RequestPost'
import RequestRow from '../Request/RequestRow'
import axios from 'axios';

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

function Preview(props) {
    const { request, setRequests } = useContext(RequestPost)

    useEffect(() => {
        if (request == null) {
            // TODO: GET request using axios to correct link
            axios.get('https://drp21-backend.herokuapp.com/api/v1/requests')
                .then(response => setRequests(response.data));
        }
    }, [request, setRequests]);

    console.log(props.title)
    console.log(request)

    return (
        props.title === "" || request === null || request === undefined || filter(request.filter(l => l.ownerCharity), props.title).length === 0
            ? <div />
            : <div className="PreviewSection">
                <div className="PreviewText">
                    <p className="CharityPreview">Related charity requests:</p>
                </div>
                <div className="PreviewListings">
                    {splitArray(filter(request.filter(l => l.ownerCharity), props.title), 3).map(listingGroup => <RequestRow listings={listingGroup} />)}
                </div>
            </div>
    )
}

export default Preview