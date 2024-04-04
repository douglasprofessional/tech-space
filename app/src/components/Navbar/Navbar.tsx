import React, { 
    useState, 
    useRef, 
    Fragment 
} from "react"

import { addDoc, collection } from "firebase/firestore"
import { 
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
} from "firebase/storage"
import { signOut } from "firebase/auth"
import { 
    auth, 
    db, 
    storage 
} from "../../firebase/firebaseConnection"

import { toast } from "react-toastify"
import { 
    Transition, 
    Dialog 
} from "@headlessui/react"

import { Post } from "../../models/interfaces/Post"

import "./Navbar.css"
import "./Modal.css"

function Navbar() {
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [isNewPostFormValid, setIsNewPostFormValid] = useState(true)
    const [progress, setProgress] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const [postAuthorInput, setPostAuthorInput] = useState('')
    const [postTitleInput, setPostTitleInput] = useState('')
    const [postContentInput, setPostContentInput] = useState('')
    const [postImgFile, setPostImgFile] = useState<File | null>(null)

    const cancelButtonRef = useRef(null)

    const handleSignOut = async() => {
        await signOut(auth)
        .then(() => toast.success('Logout feito com sucesso!'))
        .catch(() => toast.error('Ocorreu um erro, tente novamente!'))
    }

    const handleInputForm = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        state: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const eventTarget = event.currentTarget as HTMLInputElement
        const eventValue = eventTarget.value

        eventValue && state(eventValue)
    }

    const handlePostImageInput = (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        const eventTarget = event.target as HTMLInputElement
        const file: File | null = eventTarget.files && eventTarget.files[0]

        setPostImgFile(file)
    }

    const handleCreateNewPost = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()        

        setIsLoading(true)

        if(
            postAuthorInput.trim().length > 0 && 
            postTitleInput.trim().length > 0 && 
            postContentInput.trim().length > 0
        ){
            setIsNewPostFormValid(true)
        } else {
            setIsNewPostFormValid(false)
        }

        if(!postImgFile) return

        const storageRef = ref(storage, `images/${postImgFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, postImgFile)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                
                setProgress(progress)
            },
            () => {
                toast.error('Ocorreu um erro!')
            },
            async () => {
                void(
                    await getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (url) => {
                        if(url){
                            setImgUrl(url)

                            const currentDate = getCurrentDate()

                            const postObject: Post = {
                                author: postAuthorInput,
                                title: postTitleInput,
                                content: postContentInput,
                                imageUrl: url,
                                userEmail: 'teste1@teste.com',
                                creationDate: currentDate
                            }

                            await addDoc(collection(db, 'posts'), postObject)
                            .then(() => {
                                setIsLoading(false)

                                setPostAuthorInput('')
                                setPostTitleInput('')
                                setPostContentInput('')
                                setImgUrl('')
                                setProgress(0)
                                setOpenModal(false)

                                toast.success('Post criado com sucesso!')
                            })
                            .catch(() => {
                                setIsLoading(false)

                                setPostAuthorInput('')
                                setPostTitleInput('')
                                setPostContentInput('')
                                setImgUrl('')
                                setProgress(0)
                                setOpenModal(false)

                                toast.success('Erro ao criar um post, tente novamente!')
                            })
                        }
                    })
                    .catch(() => {
                        setIsLoading(false)

                        toast.error('Erro ao fazer upload da imagem!')
                    })
                )
            }
        )
    }

    const getCurrentDate = (): string => {
        const date = new Date()

        const currentDay = String(date.getDate()).padStart(2, '0')
        const currentMounth = String(date.getMonth() + 1).padStart(2, '0')
        const currentYear = date.getFullYear()

        return `${currentDay}/${currentMounth}/${currentYear}`
    }

    return (
        <React.Fragment>
            {/* NAVBAR */}
            <header className="navbar">
                <div className="container">
                    <div className="navbar__content">
                        <button
                            className="navbar__button navbar__button--red transition"
                            type="button"
                            onClick={handleSignOut}
                            >
                            <svg className="navbar__button-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>

                            Sair
                        </button>

                        <h1 className="navbar__title">Tech Space</h1>

                        <button
                            type="button"
                            className="navbar__button navbar__button--orange transition"
                            onClick={() => setOpenModal(!openModal)}
                            >
                            <svg className="navbar__button-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            Criar post
                        </button>
                    </div>
                </div>
            </header>

            {/* MODAL POST */}
            <Transition.Root
                show={openModal}
                as={Fragment}
                >
                <Dialog
                    as="div"
                    className="modal__post"
                    initialFocus={cancelButtonRef}
                    onClose={setOpenModal}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <div className="modal__post-overlay"></div>
                        </Transition.Child>

                        <div className="modal__post-wrap">
                            <div className="modal__post-content">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                    <Dialog.Panel>
                                        <div className="modal__post-panel">
                                            <form
                                                className="modal__post-form"
                                                onSubmit={handleCreateNewPost}
                                                >
                                                <div className="modal__post-group">
                                                    <h2 className="modal__post-title">
                                                        Criar post
                                                    </h2>
                                                </div>

                                                <div className="modal__post-group">
                                                    <label className="modal__post-label">Autor</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Digite seu nome"
                                                        className={`modal__post-input ${!isNewPostFormValid ? `modal__post-input--invalid` : ``}`}
                                                        onChange={(event) => handleInputForm(event, setPostAuthorInput)}
                                                    />
                                                </div>

                                                <div className="modal__post-group">
                                                    <label className="modal__post-label">Título</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Digite o título do post"
                                                        className={`modal__post-input ${!isNewPostFormValid ? `modal__post-input--invalid` : ``}`}
                                                        onChange={(event) => handleInputForm(event, setPostTitleInput)}
                                                    />
                                                </div>

                                                <div className="modal__post-group">
                                                    <label className="modal__post-label">Conteúdo</label>
                                                    <textarea
                                                        placeholder="Digite o conteúdo do post"
                                                        className={`modal__post-input ${!isNewPostFormValid ? `modal__post-input--invalid` : ``}`}
                                                        onChange={(event) => handleInputForm(event, setPostContentInput)}
                                                    />
                                                </div>

                                                <div className="modal__post-group">
                                                    <label className="modal__post-label">Capa</label>
                                                    <input
                                                        type="file"
                                                        className="modal__post-input modal__post-input--file"
                                                        onChange={handlePostImageInput}
                                                    />
                                                </div>

                                                {!imgUrl && isLoading && (
                                                    <progress className="w-full" value={progress} max="100" />
                                                )}

                                                {imgUrl && !isLoading && (
                                                    <img className="modal__post-thumbnail" src={imgUrl} alt="Thumbnail" />
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="modal__post-submit"
                                                    >
                                                    { isLoading ? 'Criando post...' : 'Criar' }
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={isLoading}
                                                    className="modal__post-cancel"
                                                    onClick={() => setOpenModal(false)}
                                                    >
                                                    Cancelar
                                                </button>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                </Dialog>
            </Transition.Root>
        </React.Fragment>
    )
}

export default Navbar