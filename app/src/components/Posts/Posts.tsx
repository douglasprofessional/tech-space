import { Post } from "../../models/interfaces/Post"

import "./Posts.css"

function Posts({ posts }: { posts: Array<Post>}) {

    function renderPosts({
        author,
        title,
        content,
        imageUrl,
        creationDate,
        userEmail
    }: Post, index: Number, posts: Array<Post>){
        return (
            <li key={crypto.randomUUID()} className="posts__item transition">
                {imageUrl && (                  
                    <img className="posts__item-thumbnail" src={imageUrl} alt={title} />
                )}

                {content && (
                    <div className="posts__item-wrap">                    
                        <div className="posts__item-wrap-info">
                            {author && (
                                <div className="posts__item-author">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                        />
                                    </svg>

                                    <span> {author} </span>
                                </div>
                            )}

                            {userEmail && (
                                <p className="posts__item-email">
                                    <strong>Email: </strong> {userEmail}
                                </p>
                            )}

                            {creationDate && (
                                <p className="posts__item-creation-date">
                                    <strong>Criação: </strong> {creationDate}
                                </p>
                            )}
                        </div>

                        <div className="posts__item-wrap-content">
                            {title && (
                                <h3 className="posts__item-title">{title}</h3>
                            )}

                            <p className="posts__item-content">{content.trim()}</p>
                        </div>
                    </div>
                )}
            </li>
        )
    }

    return (
        <div className="posts">
            <h5 className="posts__title">
                List of author posts
            </h5>

            <ul className="posts__list">
                {posts.length > 0 && posts.map(renderPosts)}
            </ul>
        </div>
    )
}

export default Posts