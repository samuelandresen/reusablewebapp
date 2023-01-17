import React, { useState } from 'react';
import './SearchMarket.css'

function SearchMarket(props) {


    const [search, setSearch] = useState("")

    const handleTextChange = (event) => {
        setSearch(event.target.value)
    }

    const applySearch = () => {
        props.setRefresh(true)
        props.setSearch(search)
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
            <div className="CreateListing">
                <button className="CreateButton" onClick={handleClick}>Create Listing</button>
            </div>
            <div className="SearchMarket">
                <textarea className="SearchText" type="text" value={search} onChange={handleTextChange} placeholder="Search"/>
            </div>
            <div className="SearchButtons">
                <button className="Search" type="submit" onClick={applySearch}>Search</button>
                <button className="Cancel" type="button" onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}


export default SearchMarket;