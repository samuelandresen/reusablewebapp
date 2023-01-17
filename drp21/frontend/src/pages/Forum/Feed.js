import './Feed.css';
import React, { useState } from 'react';
import Posts from './Posts'
import CreatePost from './CreatePost'
import SearchPosts from './SearchPosts';

function Feed() {

    const [reload, setReload] = useState(true)
    const [createPost, setCreatePost] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState([])


    const ops = [
        { value: 'recycle', label: 'Recycle' },
        { value: 'reuse', label: 'Reuse' },
        { value: 'reduce', label: 'Reduce' },
        { value: 'repair', label: 'Repair' }
    ];

    return (
        <div className="Feed">
            <header className="Feed-header">
                <div className="Forum" style={{ width: "90%" }}>
                    {createPost
                        ? <CreatePost setReload={setReload} setCreatePost={setCreatePost} ops={ops} />
                        : <>
                            <SearchPosts ops={ops} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} setReload={setReload} setSearchTerm={setSearchTerm} setCreatePost={setCreatePost} searchTerm={searchTerm} />
                        </>

                    }
                    {searchTerm !== "" ? <p>Showing search results for term: {searchTerm}</p> : <div></div>}
                    {categoryFilter.length !== 0 ? <p>Showing search results for categor{categoryFilter.length === 1 ? "y" : "ies"}: {categoryFilter.join(", ")}</p> : <div></div>}
                    <Posts reload={reload}
                        setReload={setReload}
                        searchTerm={searchTerm}
                        categoryFilter={categoryFilter} />
                </div>
            </header>
        </div>
    );
}

export default Feed;
