import React from "react";
import {Navbar,Nav,Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import './css_components/navibar.css'

export default function Navibar(){
    return (
    <>
        <Navbar 
        collapseOnSelect 
        expand="lg"
        className="animated-glow-navbar"
        >
            <Navbar.Brand>
                <Link to="/storiscompani">
                <video 
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        height: "60px", // Регулируйте под нужный размер
                        width: "auto",
                        maxWidth: "200px",
                        transition: "all 0.3s ease",
                        objectFit: "contain",
                        cursor: "pointer",
                        filter:"brightness(0.6)"
                        
                    }}
                    src="/videos/head_slider.mp4"
                >Ваш браузер не поддерживает видео
                </video>
                </Link>
            </Navbar.Brand><div className="navibar_link me-2">
            <Link to="/registration"> Регистрируйся и получи 50% скидки!</Link>
            </div>
            <Navbar.Toggle aria-controls="responsiv-nav-bar"/>
            <Navbar.Collapse id="responsiv-nav-bar" className="text-light bg-transparent" >
                <Nav className="me-auto button-style">
                    <Nav.Link className="navibar_link text-light" as={Link} to="/">Дом</Nav.Link> 
                    <Nav.Link className="navibar_link text-light" as={Link} to="/orders">Услуги</Nav.Link>
                    <Nav.Link className="navibar_link text-light" as={Link} to="/services">Заказы</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="primary" as={Link} to="/signin" className=" mt-1 me-2 buttons-animation-navbar">Войти</Button>
                    <Button variant="primary" as={Link} to="/login" className=" me-4 mt-1 buttons-animation-navbar">Зарегистрироваться</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>)
}