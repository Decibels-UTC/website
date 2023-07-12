import React, { useEffect, useState } from 'react';

function Anciens({setPageCallback}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  useEffect(() => {
    setPageCallback("anciens")
  }, []);

  const slides = [
    `${process.env.PUBLIC_URL}/pictures/regie.jpg`,
    `${process.env.PUBLIC_URL}/pictures/scene_light_violet.jpg`,
    `${process.env.PUBLIC_URL}/pictures/console.jpg`
  ];

  return (
    <>
      <div>
        <p>Page des Anciens</p>
      </div>
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
            <img src={slide} alt={`Photo ${index + 1}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Anciens;
