import React, {useEffect, useState }from "react"
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Navibar from '../components/navibar'
import './cssmoduls/home.css'
import { Container } from "react-bootstrap";

function Home(){
  const [isNavibarVisable, setNavibarVisable] = useState(true)
  const [lastscrollY, setlastscrolY] = useState(0)

  const images = [
    "/images/home1.png",
    "/images/home2.png",
    "/images/home3.png",
    "/images/home4.png",
  ]
  // текст будет парситься на страницы в строгой очередности. по индексу списка
  const heads = [
    "PERVAKOV IMMPRESION", "PI history",
    "лалала","лалала"
  ]
  const text1 = [
    "Креативный веб-дизайн","Всё началось с вёрстки сайтов,создания телеграмм ботов для личных целей",
    "лалала","лалала"
  ]
  const text2 = [
    "И воплощение идей ","Сейчас мы можем всё! От создания сайта, до развития крупно-масштабных проектов.Всё зависит от ваших идей!",
    "лалала","лалала"
  ]

  useEffect( () =>{
    const HandlerNavibar = () =>{
    const currentscrollY = window.scrollY

    if (currentscrollY > lastscrollY && currentscrollY>100){
        setNavibarVisable(false)
    }else{
      setNavibarVisable(true)
    }
    setlastscrolY(currentscrollY);
    };
    window.addEventListener("scroll", HandlerNavibar, {passive:true})
    return () => window.removeEventListener("scroll", HandlerNavibar);
  },[lastscrollY])

  return (
    <>
      <div className={`navbar-container ${isNavibarVisable ? 'visible' : 'hidden'}`}>
        <Navibar/>
      </div>
      <div className="paralax-section">
        <Parallax pages={images.length} style={{top:'0',left:'0'}}>
            {images.map((image, index) => {
              let isOddnumber
            switch(index){
              case 0:
              isOddnumber = true;
              break;
              case 1:
                isOddnumber = false;
                break;
              case 2: 
                isOddnumber = true;
                break;
              default: 
              isOddnumber = false;           
            }
            return (
              <React.Fragment key={index}>
              <ParallaxLayer
                offset={index}
                speed={-0.03}
                style={{
                  backgroundImage:`url(${image})`,
                  backgroundPosition:'center',
                  backgroundSize:'cover',
                  filter:'brightness(0.8)',

                }}/>
              <ParallaxLayer
                offset={index}
                speed={0.9}
                className={`${isOddnumber? 'left-content':'right-content'}`}>
                  <div className="parallax-content">
                  <Container className="head-content">
                    <h1>{heads[index]}</h1>
                  </Container>
      
                  <Container className="width-text-content">
                  <p>{text1[index]}</p>
                  </Container>

                  <Container className="width-text-content">
                    <p>{text2[index]}</p>
                    </Container>
                    </div>
              </ParallaxLayer>
            </React.Fragment>
            )})}     
        </Parallax>
      </div>
    </>
  )
};

export default Home;