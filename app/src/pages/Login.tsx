import React from "react"

import loginImg from "../assets/daniel-korpai-HyTwtsk8XqA-unsplash.jpg"
import "./Login.css"

function Login(){
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
                                <button className="login__form-button" type="button">
                                    Criar conta
                                </button>
                            </div>

                            <div className="login__form-group">
                                <button className="login__form-submit" type="submit">
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login