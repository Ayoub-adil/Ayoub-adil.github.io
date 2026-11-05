import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { AvatarCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { certificates } from "../constants";

const OFFSET_X = 100;
const OFFSET_Y = -6;

const Certifications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState(null); // null | "exit" | "enter"
  const N = certificates.length;

  const handleNextClick = () => {
    if (phase) return;
    setCurrentIndex(prev => (prev + 1) % N);
    setPhase("exit");
  };

  const handlePrevClick = () => {
    if (phase) return;
    setCurrentIndex(prev => (prev - 1 + N) % N);
    setPhase("exit");
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, phase]);

  // Position circulaire: 0 = dessous, N-1 = dessus
  const getPosition = (index) => (N - ((index - currentIndex + N) % N)) % N;
  // Le dessus de la pile (position N-1) = la certif affichée dans l'avatar
  const topIndex = (currentIndex + 1) % N;

  return (
    <section className="relative w-full h-screen mx-auto">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Certifications</p>
        <h2 className={styles.sectionHeadText}>Diploma++.</h2>
      </motion.div>

      {/* Grille 2x2 */}
      <div className="relative w-full h-[70%] grid grid-cols-2 grid-rows-[60%_auto]">
        {/* [0,0] Paquet de cartes */}
        <div className="relative flex items-center justify-center">
          {certificates.map((cert, index) => {
            const position = getPosition(index);
            const isMoving = index === currentIndex;

            let animateProps, zIndex;

            if (isMoving && phase === "exit") {
              animateProps = { x: 150, y: (N - 1) * OFFSET_Y - 80 };
              zIndex = N + 1;
            } else if (isMoving && phase === "enter") {
              animateProps = { x: -(N - 1) * OFFSET_X, y: 0 };
              zIndex = 0;
            } else {
              animateProps = { x: (position - (N - 1)) * OFFSET_X, y: position * OFFSET_Y };
              zIndex = position;
            }

            return (
              <motion.div
                key={`cert-${index}`}
                animate={animateProps}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  if (isMoving && phase === "exit") setPhase("enter");
                  if (isMoving && phase === "enter") setPhase(null);
                }}
                className="absolute"
                style={{ zIndex }}
              >
                <img
                  src={cert.icon}
                  alt={cert.title}
                  style={{ height: '200px', width: 'auto' }}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            );
          })}
        </div>

        {/* [0,1] Avatar */}
        <div className="flex items-center justify-center">
          <div className="bg-white/5 rounded-2xl" style={{ height: "100%", width: "100%" }}>
            <AvatarCanvas certificationImage={certificates[topIndex].icon} />
          </div>
        </div>

        {/* [1,0] Boutons + Indicateurs */}
        <div className="flex flex-col items-center justify-center gap-3 py-4">
          <div className="flex gap-6">
            <button
              onClick={handlePrevClick}
              className="w-36 bg-tertiary hover:bg-[#FAB529] text-white font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-lg"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextClick}
              className="w-36 bg-tertiary hover:bg-[#FAB529] text-white font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-lg"
            >
              Next →
            </button>
          </div>
          <div className="flex gap-2">
            {certificates.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === topIndex ? 'bg-[#FAB529] w-8' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* [1,1] Titre */}
        <div className="flex items-center justify-center py-4">
          <motion.div
            key={`title-${topIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <h3 className="text-white text-[22px] font-bold px-8 py-3 bg-tertiary/90 rounded-xl backdrop-blur-sm">
              {certificates[topIndex].title}
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Certifications, "certifications");
