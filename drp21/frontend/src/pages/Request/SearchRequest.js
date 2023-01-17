import './SearchRequest.css'
import { useState } from 'react'

function SearchRequest(props) {

    const [search, setSearch] = useState("")

    const handleTextChange = (event) => {
        setSearch(event.target.value)
    }

    const applySearch = () => {
        props.setSearch(search)
        props.setRefresh(true)
    }

    const cancel = () => {
        props.setSearch("")
        setSearch("")
        props.setRefresh(true)
    }

    const handleClick = () => {
        props.setSearchBar(false)
    }


    return (
        <div className="SearchBar">
            <div className="CreateRequest">
                <button className="CreateButton" onClick={handleClick}>Create Request</button>
            </div>
            <div className="SearchRequest">
                <textarea className="SearchText" type="text" value={search} onChange={handleTextChange} placeholder="Search"/>
            </div>
            <div className="SearchButtons">
                <button className="Search" type="submit" onClick={applySearch}>Search</button>
                <button className="Cancel" type="button" onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}


export default SearchRequest;