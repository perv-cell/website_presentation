import { useEffect, useState } from "react"

export const MyCustomParalaxFunction = (path_image, speed) => {

    const [offset, setOffset] = useState(0)

    const ScrolHandler = () =>{
        setOffset(window.scrollY*speed)};

    useEffect(() => {
        window.addEventListener('scroll',ScrolHandler);
        return () => window.removeEventListener('scroll',ScrolHandler );},
        [offset, speed]);

    return {
        style :{
        backgroundImage:`url(${path_image})`,
        transform: `translateY(${offset}px)`,
        },    
    };
};

export default MyCustomParalaxFunction;

