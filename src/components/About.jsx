import React from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

// Calculate experience duration since August 2024
const getExperienceDuration = () => {
  const startDate = new Date(2024, 7); // August 2024 (month is 0-indexed)
  const now = new Date();

  const monthsDiff = (now.getFullYear() - startDate.getFullYear()) * 12 +
                     (now.getMonth() - startDate.getMonth());

  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;

  // Less than 1 year
  if (years === 0) {
    return "several months";
  }

  // 6 months or more → nearly next year
  if (months >= 6) {
    const nextYear = years + 1;
    return `nearly ${nextYear} year${nextYear !== 1 ? 's' : ''}`;
  }

  // Less than 6 months → more than current year
  return `more than ${years} year${years !== 1 ? 's' : ''}`;
};

// Service Card
const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// About
const About = () => {
  return (
    <>
      {/* Title */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Body */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="empty-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        Software Engineer with a <strong>Master's degree in Image and 3D</strong> from Strasbourg University and {getExperienceDuration()} of experience developing industrial applications at R&D Vision.
        <br /><br />
        Strong academic expertise and hands-on projects in <strong>real-time 3D rendering, virtual reality, and graphics programming</strong>. Proficient in game engines (Unity, Unreal Engine 5), C/C++, and shader development.
        <br /><br />
        Currently seeking opportunities in <strong>3D development and video game industry</strong> to leverage my skills in real-time graphics, VR experiences, and interactive applications.
        <br /><br />
        Fluent in English, French, and Arabic.
      </motion.p>

      {/* Service Card */}
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, i) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
