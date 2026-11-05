import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { studies } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

// Experience Card
const ExperienceCard = ({ study }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff", cursor: "pointer" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={study.date}
      iconStyle={{ background: study.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={study.icon}
            alt={study.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div onClick={() => setIsExpanded(!isExpanded)}>
        {/* Title */}
        <div>
          <h3 className="text-white text-[24px] font-bold">{study.title}</h3>
          <p
            className="text-secondary text-[16px] font-semibold"
            style={{ margin: 0 }}
          >
            {study.company_name}
          </p>
        </div>

        {/* study Points - Only show when expanded */}
        {isExpanded && (
          <ul className="mt-5 list-disc ml-5 space-y-2">
            {study.points.map((point, i) => (
              <li
                key={`experience-point-${i}`}
                className="text-white-100 text-[14px] pl-1 tracking-wider"
              >
                {point}
              </li>
            ))}
          </ul>
        )}

        {/* Click indicator */}
        <p className="text-secondary text-[12px] mt-3 italic">
          {isExpanded ? "▲ Click to collapse" : "▼ Click to expand"}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

// Experience
const Studies = () => {
  return (
    <>
      {/* Title */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>where have i studied so far</p>
        <h2 className={styles.sectionHeadText}>My Academic Odyssey.</h2>
      </motion.div>

      {/* Experience Card */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="empty-20 flex flex-col"
      >
        <VerticalTimeline>
          {studies.map((study, i) => (
            <ExperienceCard key={i} study={study} />
          ))}
        </VerticalTimeline>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Studies, "studies");
