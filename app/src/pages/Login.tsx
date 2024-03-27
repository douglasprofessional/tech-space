import React, { useState } from "react"

import loginImg from "../assets/daniel-korpai-HyTwtsk8XqA-unsplash.jpg"
import "./Login.css"

function Login(){
    const [displayLogin, setDisplayLogin] = useState(true)
    const [displaySignUp, setDisplaySignUp] = useState(false)

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
                            <form className="login__form">
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
                                        className="login__form-input"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Digite seu melhor email"
                                    />
                                </div>

                                <div className="login__form-group">
                                    <label
                                        className="login__form-label"
                                        htmlFor="password">
                                        Senha
                                    </label>
                                    <input
                                        className="login__form-input"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Digite sua senha"
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
                                        onClick={(event) => handleDisplayLogin(event)}
                                        >
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        )}

                        {displaySignUp && (
                            <form className="signup__form">
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
                                        className="signup__form-input"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Digite seu melhor email"
                                    />
                                </div>

                                <div className="signup__form-group">
                                    <label
                                        className="signup__form-label"
                                        htmlFor="password">
                                        Senha
                                    </label>
                                    <input
                                        className="signup__form-input"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Crie sua senha (de 6 a 10 caracteres)"
                                        minLength={6}
                                        maxLength={10}
                                    />
                                </div>

                                <div className="signup__form-group">
                                    <button 
                                        className="signup__form-button" 
                                        type="button"
                                        onClick={(event) => handleDisplayCreateAccount(event)}
                                        >
                                        Fazer login
                                    </button>
                                </div>

                                <div className="signup__form-group">
                                    <button 
                                        className="signup__form-submit" 
                                        type="submit"
                                        onClick={(event) => handleDisplayLogin(event)}
                                        >
                                        Criar conta
                                    </button>
                                </div>
                            </form>                            
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login