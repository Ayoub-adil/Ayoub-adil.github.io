import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Certifications,
  Studies,
  Experiences,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  HoverComponent,
  Setup,
} from "./components";

const hoverStyle = {
  position: 'fixed',
  left: 0,
  top: '30%',
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundColor: 'transparent',
}
const hoverbuttonStyle = {
  height: '250px',
  width : '10px',
  display: 'flex',
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundColor: '#FAB529',
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
}
// App
const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div
          style={hoverStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
           
          {!isHovered && <div style={hoverbuttonStyle}></div> }
          {isHovered && <HoverComponent /> }
        </div>
        
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        
        <About />

        <Certifications />
        <Experiences />
        <Studies />
        <Tech />
        <Setup />
        <Works />
        <Feedbacks />
        

        

        {/* Contact */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>


      </div>
    </BrowserRouter>
  );
};





export default App;
