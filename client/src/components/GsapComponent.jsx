import React, { useEffect, useState } from 'react';
// import logo from "../assets/LOGO.png"
import { useRef } from 'react';
import gsap from 'gsap';
import logo_vid from '../assets/logo_vid_2.mp4';

function GsapComponent() {
  const [squares, setSquares] = useState([]);
  const containerRef = useRef(null);

  useEffect(()=>{
    const numberOfSquares = (Math.ceil(window.innerWidth /80) * Math.ceil(window.innerHeight /90));
    
    const squareArr = Array(numberOfSquares).fill(0);
    setSquares(squareArr);

    setTimeout(() => {
      gsap.to(".box", {
        duration: 2,
        opacity: 0.1,
        y: 50,
        ease: "power1.inOut",
        stagger: {
          grid: [7, 15],
          from: "center",
          amount: 1.5,
        },
        repeat: 1,
        yoyo: true,
      });
    }, 100);
  },[]);


  return (

    <div>
      <div ref={containerRef} className='grid grid-cols-auto-fill-100 w-full h-screen'>
        {squares.map((_,idx) => (
          <div key={idx}>
            <div className=" box bg-orange-600 dark:bg-black h-full w-full"></div>
          </div>
        ))}
      </div>
      {/* <img src={logo} className="absolute top-0 left-0 w-full h-full object-cover" alt="logo" /> */}
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center object-cover'>
        <video id='vid' className='w-[50%] h-[40vh]' playsInline loop autoPlay muted alt="logo">
          <source src={logo_vid} id='vid' type='video/mp4'/>
        </video>
      </div>
      
    </div>
  )
}

export default GsapComponent

