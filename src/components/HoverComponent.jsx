// HoverComponent.js
import React from 'react';
import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import Tilt from 'react-parallax-tilt';

import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { CV, photo, linkedin } from '../assets';

const calculateAge = (birthdate) => {
  const birthdateObj = new Date(birthdate);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthdateObj.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthdateObj.getMonth() ||
    (currentDate.getMonth() === birthdateObj.getMonth() &&
      currentDate.getDate() < birthdateObj.getDate())
  ) {
    age--;
  }

  return age;
};

const styles = {
  paddingX: 'px-6',
  paddingY: 'py-6',
  padding: 'px-6 py-10',
  sectionHeadText: 'font-black text-[30px]',
  sectionNameText: 'text-white font-black text-[30px]',
  sectionSubText: 'text-[14px] text-secondary uppercase tracking-wider',
};

const buttonStyle = {
  backgroundColor: '#FAB529',
};
const Card = {
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
};

const linkedinStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  cursor: 'pointer',
};

const PhotoStyle = {
  position: 'absolute',
  right: '10%',
  marginTop: '40px',
  height: '100px',
  borderBottom: '2px solid #FAB529',
};
const HoverBotton = {
  position: 'absolute',
  right: '-5px',
  height: '100%',
  width: '10px',
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
  backgroundColor: '#FAB529',
};

const NameStyle = {
  color: '#FAB529',
};


const HoverComponent = () => {
  const birthdate = new Date('1999-06-04');
  return (
    <div>
      <motion.div variants={slideIn('left', 'tween', 0.3, 1)}>
        <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
          >
          <div style={Card} className="bg-black-100 h-[250px] w-[350px]">
            <div style={HoverBotton}></div>
            <img style={PhotoStyle} src={photo} alt="myPhoto" />
            

            <div className={`${styles.padding} pt-2 pb-2`}>
              <h2 className={styles.sectionNameText} style={NameStyle}>
                ADIL Ayoub
              </h2>{' '}
              <br />
              {calculateAge(birthdate)} years old
              <br />
              Paris, France
              <br /> <br />
              +33 6 01 07 30 76
              <br />
              <a href="mailto:ayoub.adil0406@gmail.com">ayoub.adil0406@gmail.com</a>
              <br /> <br />
              <div className={`flex flex-wrap gap-7`}>
              <button
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
                style={buttonStyle}
                onClick={() => {
                  window.open(CV, '_blank');
                }}
              >
                CV
              </button>
              <img
                style={linkedinStyle}
                src={linkedin}
                alt="LinkedIn"
                onClick={() => {
                  window.open('https://www.linkedin.com/in/ayoub-adil/', '_blank');
                }}
              />
            </div>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(HoverComponent, 'ID');
