import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { pcSetup } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const SetupCard = ({ index, component, name }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3 * index, 0.75)}
      className="green-pink-gradient p-[1px] rounded-[20px] shadow-card xs:w-[250px] w-full"
    >
      <div className="bg-tertiary rounded-[20px] py-6 px-8 min-h-[160px] flex flex-col justify-center">
        <p className="text-secondary text-[14px] uppercase tracking-wider">
          {component}
        </p>
        <h3 className="text-white text-[22px] font-bold mt-2">
          {name}
        </h3>
      </div>
    </motion.div>
  );
};

const Setup = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Remote-ready</p>
        <h2 className={styles.sectionHeadText}>My Setup.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        My current workstation, ready for demanding tasks such as real-time 3D
        rendering, game development, and VR projects — including remote work.
      </motion.p>

      <div className="mt-14 flex flex-wrap gap-10">
        {pcSetup.map((spec, i) => (
          <SetupCard key={spec.component} index={i} {...spec} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Setup, "setup");