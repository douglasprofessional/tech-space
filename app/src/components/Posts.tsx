import React from "react"
import { Post } from "../models/interfaces/Post"

function Posts({ posts }: { posts: Array<Post>}) {

    function renderPosts({
        author,
        title,
        content,
        imageUrl
    }: Post, index: Number, posts: Array<Post>){
        return (
            <div key={`${index}${title}`}>
                <p>{author}</p>
                <h1>{title}</h1>
                <p>{content}</p>
                <img src={imageUrl} alt={title} />
            </div>
        )
    }

    return (
        <React.Fragment>
            <h5>Post component</h5>

            {posts.map(renderPosts)}
        </React.Fragment>
    )
}

export default Posts