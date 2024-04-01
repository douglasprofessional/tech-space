import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css"

import loginImg from "../assets/daniel-korpai-HyTwtsk8XqA-unsplash.jpg"
import { auth } from "../firebase/firebaseConnection";
import "./Login.css"

function Login(){
    const [displayLogin, setDisplayLogin] = useState(true)
    const [displaySignUp, setDisplaySignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loginEmailInput, setLoginEmailInput] = useState('')
    const [loginPasswordInput, setLoginPasswordInput] = useState('')
    const [isLoginFormValid, setIsLoginFormValid] = useState(true)
    const [signUpEmailInput, setSignUpEmailInput] = useState('')
    const [signUpPasswordInput, setSignUpPasswordInput] = useState('')
    const [isSignUpFormValid, setIsSignUpFormValid] = useState(true)

    const errorMessage = (
        <div className="login__form-group">
            <p className="login__form-valid">
                Preencha os campos e tente novamente
            </p>
        </div>        
    )

    const handleDisplayCreateAccount = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()

        setDisplayLogin(false)
        setDisplaySignUp(true)
    }

    const handleDisplayLogin = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()

        setDisplayLogin(true)
        setDisplaySignUp(false)
    }

    const handleInputForm = (
        event: React.FormEvent<HTMLInputElement>,
        state: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const eventTarget = event.currentTarget as HTMLInputElement
        const eventValue = eventTarget.value

        eventValue && state(eventValue)
    }

    const handleExecuteLogin = (
        event: React.MouseEvent<HTMLFormElement, MouseEvent>
    ) => {
        event.preventDefault()        

        loginEmailInput.trim().length > 0 && loginPasswordInput.trim().length > 0
        ? setIsLoginFormValid(true)
        : setIsLoginFormValid(false)
        
        setLoginEmailInput('')
        setLoginPasswordInput('')
    }

    const handleExecuteSignUp = async (
        event: React.MouseEvent<HTMLFormElement, MouseEvent>
    ) => {
        setIsLoading(true)

        event.preventDefault()        

        signUpEmailInput.trim().length > 0 && signUpPasswordInput.trim().length > 0
        ? setIsSignUpFormValid(true)
        : setIsSignUpFormValid(false)

        await createUserWithEmailAndPassword(
            auth, 
            signUpEmailInput,
            signUpPasswordInput
        ).then(() => {

            setDisplayLogin(true)
            setDisplaySignUp(false)
            setIsLoading(false)

            toast.success('Usuário criado!')

        }).catch((err: { code: string }) => {

            if (err.code === 'auth/weak-password') {
                toast.warning('Senha muito fraca, utilize outra senha!')
            }else if (err.code === 'auth/email-already-in-use') {
                toast.warning('E-mail já cadastrado!')
            } else {
                toast.error('Erro ao criar usuário!')
            }

            setIsLoading(false)
            setIsSignUpFormValid(false)

        })
        
        setSignUpEmailInput('')
        setSignUpPasswordInput('')
    }

    return (
        <React.Fragment>
            <div className="login">
                <div className="login__content">
                    <div className="login__column">
                        <img className="login__illustration" fetchpriority="high" src={loginImg} title="Login image" alt="Login image" />
                    </div>

                    <div className="login__column">
                        <h1 className="login__title">
                            Tech Space
                        </h1>

                        {displayLogin && (
                            <form onSubmit={handleExecuteLogin} className="login__form">
                                <div className="login__form-group">
                                    <h2 className="login__form-subtitle">
                                        Login
                                    </h2>
                                </div>

                                <div className="login__form-group">
                                    <label
                                        className="login__form-label"
                                        htmlFor="email">
                                        E-mail
                                    </label>
                                    <input
                                        className={`login__form-input ${!isLoginFormValid ? `login__form-input--invalid` : ``}`}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Digite seu melhor email"
                                        value={loginEmailInput}
                                        onChange={(e) => handleInputForm(e, setLoginEmailInput)}
                                    />
                                </div>

                                <div className="login__form-group">
                                    <label
                                        className="login__form-label"
                                        htmlFor="password">
                                        Senha
                                    </label>
                                    <input
                                        className={`login__form-input ${!isLoginFormValid ? `login__form-input--invalid` : ``}`}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Digite sua senha"
                                        value={loginPasswordInput}
                                        onChange={(e) => handleInputForm(e, setLoginPasswordInput)}
                                        minLength={6}
                                        maxLength={10}
                                    />
                                </div>

                                <div className="login__form-group">
                                    <button 
                                        className="login__form-button" 
                                        type="button"
                                        onClick={(event) => handleDisplayCreateAccount(event)}
                                        >
                                        Criar conta
                                    </button>
                                </div>

                                <div className="login__form-group">
                                    <button 
                                        className="login__form-submit" 
                                        type="submit"
                                        >
                                        Entrar
                                    </button>
                                </div>

                                { !isLoginFormValid && errorMessage }
                            </form>
                        )}

                        {displaySignUp && (
                            <form onSubmit={handleExecuteSignUp} className="signup__form">
                                <div className="signup__form-group">
                                    <h2 className="signup__form-subtitle">
                                        Criar conta
                                    </h2>
                                </div>

                                <div className="signup__form-group">
                                    <label
                                        className="signup__form-label"
                                        htmlFor="email">
                                        E-mail
                                    </label>
                                    <input
                                        className={`signup__form-input ${!isSignUpFormValid ? `signup__form-input--invalid` : ``}`}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Digite seu melhor email"
                                        value={signUpEmailInput}
                                        onChange={(e) => handleInputForm(e, setSignUpEmailInput)}
                                    />
                                </div>

                                <div className="signup__form-group">
                                    <label
                                        className="signup__form-label"
                                        htmlFor="password">
                                        Senha
                                    </label>
                                    <input
                                        className={`signup__form-input ${!isSignUpFormValid ? `signup__form-input--invalid` : ``}`}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Crie sua senha (de 6 a 10 caracteres)"
                                        value={signUpPasswordInput}
                                        onChange={(e) => handleInputForm(e, setSignUpPasswordInput)}
                                        minLength={6}
                                        maxLength={10}
                                    />
                                </div>

                                <div className="signup__form-group">
                                    <button 
                                        className="signup__form-button" 
                                        type="button"
                                        onClick={(event) => handleDisplayLogin(event)}
                                        >
                                        Fazer login
                                    </button>
                                </div>

                                <div className="signup__form-group">
                                    <button 
                                        className="signup__form-submit" 
                                        type="submit"
                                        disabled={isLoading}
                                        >
                                        { isLoading ? 'Carregando...' : 'Criar conta' }
                                    </button>
                                </div>

                                { !isSignUpFormValid && errorMessage }
                            </form>                            
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login