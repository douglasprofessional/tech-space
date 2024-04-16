import { Post } from "../../models/interfaces/Post"

import "./Posts.css"

function Posts({ posts }: { posts: Array<Post>}) {

    function renderPosts({
        author,
        title,
        content,
        imageUrl
    }: Post, index: Number, posts: Array<Post>){
        return (
            <li key={`${index}${title}`} className="posts__item">
                <p>{author}</p>
                <h1>{title}</h1>
                <p>{content}</p>
                <img src={imageUrl} alt={title} />
            </li>
        )
    }

    return (
        <div className="posts">
            <h5 className="posts__title">
                Post component
            </h5>

            <ul className="posts__list">
                {posts.map(renderPosts)}
            </ul>
        </div>
    )
}

export default Posts