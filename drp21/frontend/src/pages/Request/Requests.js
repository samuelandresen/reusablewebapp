import { useEffect, useContext } from "react"
import axios from "axios"
import RequestRow from "./RequestRow";
import { RequestPost } from '../../RequestPost'
import TimeDateSort from "../TimeDateSort";

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


function Requests(props) {

    const { request, setRequests } = useContext(RequestPost);

    useEffect(() => {
        if (props.refresh) {
            // TODO: GET request using axios to correct link
            axios.get('https://drp21-backend.herokuapp.com/api/v1/requests')
                .then(response => setRequests(response.data));
        }
        props.setRefresh(false)
    }, [props, setRequests]);


    return (
        <div>
            {request === null || request === undefined || request.length === 0
                ? <p> No Listings </p>
                : splitArray(filter([...(request.filter(l => l.ownerCharity)), ...(request.filter(l => !l.ownerCharity).sort(TimeDateSort))], props.search), 4).map(listingGroup =>
                    <RequestRow listings={listingGroup} />)
            }
        </div>
    )
}

export default Requests