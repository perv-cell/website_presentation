import React from "react";
import './cssmoduls/signin.css'
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const navigate = useNavigate()

    const handlerGoMainPage = () =>{
        navigate('/')
    }

    return (
        <div className="login_page">
            <button id="buttonback" onClick={handlerGoMainPage}>
                <div>
                    Вернуться на главную
                </div>
            </button>
            <div className="border_registration">
                <div className="header_border">
                    Вход в личный кабинет
                </div>
                <div className="input-group">
                    <div className="icon-container">
                    <span className="input-icon">👤</span>
                    </div>
                    <input 
                    type="text" 
                placeholder="Введите логин"
                className="form-input"
                    />
                    </div>

                    <div className="input-group">
                    <div className="icon-container">
                    <span className="input-icon">🔒</span>
                    </div>
                    <input 
                    type="password" 
                    placeholder="Введите пароль"
                    className="form-input"
                    />
                </div>

                    <button className="login-button">
                    Войти
                    </button>

                    <div className="form-links">
                    <a href="#forgot" className="link">Забыли пароль?</a>
                    <a href="/login" className="link">Регистрация</a>
                    </div>
            </div>
        </div>
    )
}

    
    


