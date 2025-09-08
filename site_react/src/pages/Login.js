import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './cssmoduls/login.css'
import BeautifulAlert from './utilits/beautifulAlert.js'


export const Login = () => {
    const navigate = useNavigate();

    const handlerGoMainPage = () => {
        navigate('/');
    };
    
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [isTouchedPassword1, setIsTouchedPassword1] = useState(false);
    const [isValidLenPassword1, setIsValidLenPassword1] = useState(true);
    const [password2, setPassword2] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isCorrectDate, setIsCorrectDate] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [isTouchedFirstName, setIsTouchedFirstName] = useState(false)
    const [secondname, setSecondname] = useState("");
    const [isTouchedSecondname, setIsTouchedSecondname] = useState(false)
    const [finalPage, setFinalPage] = useState(false)
    const [codeOnEmail, setCodeOnEmail] = useState("")
    const [codeFromUserConfirm, setCodeFromUserConfirm] =useState("")
    const [emailAlreadyExists ,setemailAlreadyExists] = useState(false)
    const [loadingDataBack, setloadingDataBack] = useState(false)
    const [dataUser ,setDataUser] = useState({
        "email":"",
        "firstname":"",
        "secondname":"",
        "password":"" 
    })
    const [showAlert, setShowAlert] = useState(false)

    const HandlerSetEmail = (e) => {
        const emailValue = e.target.value;
        ChangeUserForm(e)
        setEmail(emailValue);
        setIsEmailValid(CheckEmail(emailValue));
    };

    const HandlerSetFirstName = (e) => {
        setIsTouchedFirstName(true)
        setFirstname(e.target.value);
        ChangeUserForm(e)
    }

    const HandlerSetSecondName = (e) => {
        setSecondname(e.target.value);
        setIsTouchedSecondname(true)
        ChangeUserForm(e)
    }

    const HandlerChangePassword1 = (e) => {
        const passwordValue = e.target.value;
        setPassword1(passwordValue);
        setIsValidLenPassword1(CheckPasswordLen(passwordValue));
        setIsTouchedPassword1(true);
        setIsPasswordMatch(passwordValue === password2);
    }; 

    const HandlerChangePassword2 = (e) => {
        const passwordValue = e.target.value;
        setPassword2(passwordValue);
        if (password1 === passwordValue){
            setIsPasswordMatch(true);
            ChangeUserForm(e)
        }
    }; 

    const CheckPasswordLen = (password) => {
        return password.length <= 150;
    };

    const CheckEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const HandlerCheckEmailConfirm = (e) =>{
        CheckEmailCode(e.target.value)
    }

    const CheckEmailCode = (code) =>{
        return codeOnEmail === code
    }

    const ClickButtonEnterPassword = () => {
        if (isEmailValid && firstname !== "" && secondname !== "") {
            setIsCorrectDate(true);
        } else {
            setIsCorrectDate(false);
            setShowAlert(true)
            };
        }

    const ClickButtonEnter = async () => {
        if (isValidLenPassword1 && password1 !== "" && password1 === password2) {
            setFinalPage(true)
        try{
            const respons = await fetch("http://localhost:8080/designePI/api/registration",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(dataUser),
            })
            if(!respons.ok){
               throw new Error('Ошибка при отправке данных');
               
            }
            const result = await respons.json()
            let email_already_exists = result.get("email_already_exists")
            if(email_already_exists=== "yes") {
                setemailAlreadyExists(true)
            }else{
                setemailAlreadyExists(false)
            }
            setFinalPage(true)
            setloadingDataBack(true)
            setShowAlert(true);
        }catch(error){
            alert(error.message)
            setloadingDataBack(false)
        }} else {
            setFinalPage(false)
            setShowAlert(true);
        }
    };
    const ClickConfirmEmail = () => {
        // отправка post запроса на back на golang пароля имени почты и тд 
    
    }

    const ChangeUserForm = (e) =>{
        setDataUser({
            ...dataUser,
            [e.target.name] : e.target.value
        })
    }

    const showErrorFirstName = isTouchedFirstName && firstname!=="";
    const showErrorSecondtName = isTouchedSecondname && secondname!=="";
    const showErrorPass = isTouchedPassword1 && !isValidLenPassword1;
    const showEmailError = email !== "" && !isEmailValid;

    return (
        <>

            <div className={`login_page ${isCorrectDate ? "hidden" : ""}`}>
                <button id="buttonback" onClick={handlerGoMainPage}>
                    <div>Вернуться на главную</div>
                </button>
                
                <div className="border_registration">
                    <div className="header_border">Регистрация - Шаг 1 из 3</div>
                    
                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">📧</span>
                        </div>
                        <input 
                            type="email"
                            name="email" 
                            placeholder="Ваш email:"
                            className={`form-input ${showEmailError ? 'error-email' : ''} ${isEmailValid ? 'success-email' : ''}`}
                            required
                            value={email}
                            onChange={HandlerSetEmail}
                        />
                        {showEmailError && (
                            <div className="error-message">Email некорректный</div>
                        )}
                        {isEmailValid && email !== "" && (
                            <div className="success-message">✓ Email принят</div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">👤</span>
                        </div>
                        <input 
                            type="text"
                            name="firstname" 
                            placeholder="Имя"
                            className={`form-input ${firstname !== "" ? "success-email" : ""}`}
                            required
                            value={firstname}
                            onChange={HandlerSetFirstName}
                        />
                        {showErrorFirstName === "" && (
                            <div className="error-message">Введите имя</div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">👤</span>
                        </div>
                        <input 
                            type="text" 
                            name="secondname"
                            placeholder="Фамилия"
                            className={`form-input ${secondname !== "" ? "success-email" : ""}`}
                            required
                            value={secondname}
                            onChange={HandlerSetSecondName}
                        />
                        {showErrorSecondtName === "" && (
                            <div className="error-message">Введите фамилию</div>
                        )}
                    </div>
                    <BeautifulAlert
                    message="Для продолжение,  необходимо заполнить все поля"
                        type="error"
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
                        /> 
                    <button className="login-button" onClick={ClickButtonEnterPassword}>
                        Далее
                    </button>
                    
                    <div className="form-links">
                        <a href="/signin" className="link">Войти в личный кабинет</a>
                    </div>
                </div>
            </div>

            <div className={`login_page ${isCorrectDate && !finalPage? "" : "hidden"}`}>
                <button id="buttonback" onClick={() => setIsCorrectDate(false)}>
                    <div>Назад</div>
                </button>
                
                <div className="border_registration">
                    <div className="header_border">Регистрация - Шаг 2 из 3</div>

                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">📧</span>
                        </div>
                        <input 
                            type="email" 
                            value={email}
                            className="form-input"
                            readOnly
                        />
                        <div className="success-message">✓ Email введён верно</div>
                    </div>

                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">🔒</span>
                        </div>
                        <input 
                            type="password" 
                            placeholder="Введите пароль"
                            className={`form-input ${showErrorPass ? 'error-password-len' : ''} ${isValidLenPassword1 && password1 !== '' ? 'success-password' : ''}`}
                            required
                            value={password1}
                            onChange={HandlerChangePassword1}
                        />
                        {showErrorPass && (
                            <div className="error-message">Пароль должен быть не более 150 символов</div>
                        )}
                        {isValidLenPassword1 && password1 !== "" && !showErrorPass && (
                            <div className="success-message">✓ Пароль корректен</div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">🔒</span>
                        </div>
                        <input 
                            type="password"
                            name="password" 
                            placeholder="Повторите пароль"
                            className={`form-input ${!isPasswordMatch && password2 !== '' ? 'error-password-replay' : ''} ${isPasswordMatch && password2 !== '' ? 'success-password' : ''}`}
                            required
                            value={password2}
                            onChange={HandlerChangePassword2}
                        />
                        {!isPasswordMatch && password2 !== "" && (
                            <div className="error-message">Пароли не совпадают</div>
                        )}
                        {isPasswordMatch && password2 !== "" && (
                            <div className="success-message">✓ Пароли совпадают</div>
                        )}
                    </div>
                        <BeautifulAlert
                        type="error"
                        message='К сожалению следующий шаг для вас не доступен заполните все поля до конца'
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
                        />
                    <button className="login-button" onClick={ClickButtonEnter}>
                        Далее
                    </button>
                    
                    <div className="form-links">
                        <a href="/signin" className="link">Войти в личный кабинет</a>
                    </div>
                </div>
            </div>
            
            <div className={`login_page ${finalPage && !emailAlreadyExists? "" : "hidden"}`}>
                <BeautifulAlert
                        type="success"
                        message='"Данные успешно отправленны!"'
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
                        />
                <div className="border_registration">
                    <div className="header_border">Регистрация - Шаг 3 из 3</div>
                    <div className="header_border"> Подтвердите почту</div>
                    <div id="instraction_email">На ваш указанный email должно прийти сообщения с кодом на подтверждение, введите код подтверждения</div>
                    <div className="input-group">
                        <div className="icon-container">
                            <span className="input-icon">✓</span>
                        </div>
                        <input 
                            type="text" 
                            value={codeFromUserConfirm}
                            className="form-input"
                            onChange={HandlerCheckEmailConfirm}
                        />
                    </div>
                    <button className="login-button" onClick={ClickConfirmEmail}>
                        Зарегистрироваться
                    </button>
                    
                    <div className="form-links">
                        <a href="/signin" className="link">Войти в личный кабинет</a>
                    </div>
                </div>
            </div>
            <div className={`login_page ${isCorrectDate && finalPage &&emailAlreadyExists? "" : "hidden"}`}>
                <button id="buttonback" onClick={() => setFinalPage(false)}>
                    <div>Назад</div>
                </button>
             <div className={`login_page ${finalPage && emailAlreadyExists? "" : "hidden"}`}>
                
                <div className="border_registration">
                    <div className="header_border">Регистрация - Шаг 3 из 3</div>
                    <div className="header_border">Email уже существует</div>
                    <div id="instraction_email">На ваш указанный email уже есть созданный аккаун,
                         если вы  забыли пароль, его можно восстановить.Для этого перейдите по ссылке ниже и зайдите в личный кабинет.
                         Нажмите забыли пароль. Вы получите инструкцию для восстановления</div>    
                    <div className="form-links">
                        <a href="/signin" className="link">Войти в личный кабинет</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
