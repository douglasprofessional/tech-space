import React from "react"

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConnection";

import { toast } from "react-toastify";

import "./Navbar.css";

function Navbar() {
    const handleSignOut = async() => {
        await signOut(auth)
        .then(() => toast.success('LogOut feito com sucesso!'))
        .catch(() => toast.error('Ocorreu um erro, tente novamente!'))
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
                            >
                            <svg className="navbar__button-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            Criar post
                        </button>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Navbar