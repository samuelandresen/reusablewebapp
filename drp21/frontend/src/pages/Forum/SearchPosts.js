import './SearchPosts.css'
import React, { useState } from 'react';
import MultiSelect from '../MultiSelect'


function SearchPosts(props) {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState([])

    const handleSelectChange = (event) => {
        setCategory(event.map(e => e.label))
    }

    const handleCreatePost = () => {
        props.setCreatePost(true)
    }

    const handleTextChange = (event) => {
        setSearch(event.target.value)
    }

    const applySearch = () => {
        props.setCategoryFilter(category)
        props.setSearchTerm(search)
        props.setReload(true)
    }

    const cancel = () => {
        props.setSearchTerm("")
        props.setCategoryFilter([])
        setSearch("")
        props.setReload(true)
    }

    const styles = {
        option: provided => ({
            ...provided,
            color: 'black'
        }),
        control: provided => ({
            ...provided,
            color: 'black'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black'
        })
    }

    return (
        <div className="SearchPosts">
            <div className="CreatePostButton">
                <button className="CreateButton" type="button" onClick={handleCreatePost}>Create new Post!</button>
            </div>
            <div className="SearchPost">
                <textarea className="SearchText" type="text" value={search} onChange={handleTextChange} placeholder="Search" />
            </div>
            <div className="FilterByCategory">
                <h3 className="FilterText">Filter by Category: </h3>
                <div className="FilterOptions">
                    <MultiSelect options={props.ops} styles={styles} value={category} onChange={handleSelectChange} />
                </div>
            </div>
            <div className="SearchSubmit">
                <button className="Search" type="submit" onClick={applySearch}>Search</button>
                <button className="Cancel" type="button" onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default SearchPosts;