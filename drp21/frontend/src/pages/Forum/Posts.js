import React, { useContext, useEffect } from 'react';
import axios from 'axios'
import Post from './Post'
import { RepairPost } from '../../RepairPost'

function validFilter(text, search) {
    return text !== undefined && text.toLowerCase().includes(search.toLowerCase())
}

function filterPost(post, searchTerm, categoryFilter) {
    var res = post
    if (searchTerm !== undefined && searchTerm !== "") {
        res = res.filter(d => validFilter(d.text, searchTerm) || validFilter(d.title, searchTerm))
    }
    if (categoryFilter !== undefined && categoryFilter.length !== 0) {
        for (let filter of categoryFilter) {
            res = res.filter(d => validFilter(d.category, filter))
        }
    }
    return res
}

function Posts(props) {
    const {post, setPosts } = useContext(RepairPost)

    useEffect(() => {
        if (props.reload) {
            // GET request using axios inside useEffect React hook
            axios.get('https://drp21-backend.herokuapp.com/api/v1/posts')
                // .then(response => );
                .then(response => setPosts(response.data));
        }
        props.setReload(false)
    }, [props, setPosts]);

    return (
        <div>
            {post === undefined || post === null || post.length === 0
                ? <p>No Posts Found</p>
                : filterPost(post, props.searchTerm, props.categoryFilter).map(ele =>
                    <Post
                        id={ele.id}
                        category={ele.category}
                        title={ele.title}
                        text={ele.text}
                        date={ele.dateStr}
                        time={ele.timeStr}
                        authorEmail={ele.authorEmail}
                        comments={ele.comments}
                    />
                )}
        </div>
    )
}

export default Posts;