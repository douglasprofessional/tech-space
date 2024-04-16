import React, 
{ 
    useEffect,
    useState 
} from "react"

import Navbar from "../../components/Navbar/Navbar"

import { Post } from "../../models/interfaces/Post"

import { 
    DocumentData, 
    collection, 
    getDocs
} from "firebase/firestore"
import { db } from "../../firebase/firebaseConnection"

import { CollectionsFirebase } from "../../models/enums/collectionsFirebase"
import Posts from "../../components/Posts/Posts"

function Feed(){
    const [postsList, setPostsList] = useState<Array<Post>>([])

    const handleGetPosts = async (): Promise<void> => {
        const postsArray: Array<DocumentData> = []
        const postsListCollection = collection(db, CollectionsFirebase.POSTS)

        await getDocs(postsListCollection)
        .then((response) => {
            if(response){
                for (const post of response.docs) {
                    postsArray.push(post.data())
                }

                postsArray.length > 0 && setPostsList(postsArray as Array<Post>)

                console.log('LISTA DE POSTS', postsArray);
                
            }else{

            }
        })
        .catch((err) => {

        })
    }

    useEffect(() => {
        void handleGetPosts()
    }, [])

    return (
        <React.Fragment>
            <Navbar handleGetPosts={handleGetPosts} />

            <Posts posts={postsList} />
        </React.Fragment>
    )
}

export default Feed