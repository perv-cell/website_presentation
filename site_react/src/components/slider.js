import React from "react";
import { Carousel } from 'react-bootstrap'
import './css_components/slider.css' 
 

export  function Slider(){
    const videos = [
        {
            src : "videos/site1.mp4",
            title: "Сайты",
            description: "Современный дизайн",
            subDiscription: "И Современные решение на любой вкус"
        },
        {
            src: 'videos/telegram.mp4',
            title: "Telegram боты",
            description: "Выгодная автоматизация",
            subDiscription: "Решение рутинных задач"
        },
        {
            src: 'videos/site2.mp4',
            title: "Веб пространство",
            description: "Интернет магазин и интерактивные площадки",
            subDiscription: "Будь в тренде и начинай зарабатывать"
        }
        
    ]

    return (
        <Carousel>    
            {
                videos.map((video, index)=>
                (
                    <Carousel.Item key={index}>
                        <div className="carousel-video-container">
                        <video
                            className="d-block w-100"
                            style={{ height: "350px", objectFit: "cover" }}
                            autoPlay
                            muted
                            loop
                            playsInline >              
                        <source src={video.src} type="video/mp4"/>
                        Ваш браузер не поддерживает видео
                        </video>
                        </div>
                        <Carousel.Caption>
                        <h3 className="header_title" >{video.title}</h3>
                        <p className='header_discription'>{video.description}</p>
                        <p className='subdiscription'>{video.subDiscription}</p>
                        </Carousel.Caption>                        
                    </Carousel.Item>
                )
                )
            }
        </Carousel>
    )
}