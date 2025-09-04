import './Hero.css';

import arrow_icon from '../assets/arrow.png';
import hand_icon from '../assets/hand_icon.png';
import hero_image from '../assets/hero_image.png';

export const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-left">
            <img src={hero_image} className="hero-image" alt="hero" />
            <h2>Hot & Fresh Styles</h2>
            
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="hand" />
                </div>
                <p>Collections</p>
                <p>For Everyone</p>
            
            <div className="hero-latest-btn" 
            onClick={()=>document.querySelector(".new-collections")?.scrollIntoView({ behavior: "smooth" })}>
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="arrow" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="hero" />
        </div>
        
    </div>

  )
}

export default Hero;