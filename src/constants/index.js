// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import { c } from "maath/dist/index-43782085.esm";
import {
  code,
  game,
  VR,
  TD,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  threejs,
  git,
  figma,
  docker,
  unrealengine,
  unity,
  blender,
  opengl,
  cpp,
  csharp,
  kaggle1,
  kaggle2,
  kaggle3,
  kaggle4,
  HumanCoders1,
  lycee,
  fst,
  isima,
  unistra,
  entreprise1,
  entreprise2,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
} from "../assets";

// Helper function to get current date (Month Year)
const getCurrentDate = () => {
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
};

// Navbar Links
export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "certifications",
    title: "Certifications",
  },
  {
    id: "experiences",
    title: "Experiences",
  },
  {
    id: "studies",
    title: "Studies",
  },
  {
    id: "works",
    title: "Works",
  },
  {
    id: "contact",
    title: "Contact",
  },

  // {
  //   id: "Portfolio-2",
  //   title: "2nd Portfolio",
  //   link: "https://ayoub-adil.github.io/Portfolio2/",
  // },
];

// Services
const services = [
  {
    title: "3D Graphics Developer",
    icon: TD,
  },
  {
    title: "Video Game Developer",
    icon: game,
  },
  {
    title: "VR Developer",
    icon: VR,
  },
  {
    title: "fullstack Developer",
    icon: code,
  },
];

const certificates = [
  {
    title: "Kaggle: Pandas in Python",
    icon: kaggle2,
  },
  {
    title: "Kaggle: Data Visualization",
    icon: kaggle3,
  },
  {
    title: "Kaggle: Data Cleaning",
    icon: kaggle4,
  },
  {
    title: "Kaggle: Pandas",
    icon: kaggle1,
  },
  {
    title: "Human Coders: Github Copilot",
    icon: HumanCoders1,
  },
];

// Technologies
const technologies = [
  {
    name: "Unreal Engine",
    icon: unrealengine,
  },
  {
    name: "Unity",
    icon: unity,
  },
  {
    name: "Blender",
    icon: blender,
  },
  {
    name: "opengl",
    icon: opengl,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Cpp",
    icon: cpp,
  },
  {
    name: "Csharp",
    icon: csharp,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "git",
    icon: git,
  },
  // {
  //   name: "HTML 5",
  //   icon: html,
  // },
  // {
  //   name: "CSS 3",
  //   icon: css,
  // },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  // {
  //   name: "docker",
  //   icon: docker,
  // },
  // {
  //   name: "MongoDB",
  //   icon: mongodb,
  // },
  // {
  //   name: "Redux Toolkit",
  //   icon: redux,
  // },
  // {
  //   name: "Tailwind CSS",
  //   icon: tailwind,
  // },
];

// Experiences
const studies = [
  {
    title: "Master : Image & 3D",
    company_name: "UFR Math-Info | Strasbourg University",
    icon: unistra,
    iconBg: "#E6DEDD",
    date: "September 2021 - June 2024",
    points: [
      "Specialization in Computer Graphics: Specialized in the field of computer graphics within the I3D program, gaining expertise in geometric modeling, virtual reality, rendering, and image processing.",
      "Advanced Software Engineering Skills: Acquired strong fundamentals in software engineering through comprehensive coursework, enabling proficiency in software design and development.",
      "Rapid Adaptation to Emerging Technologies: Developed the ability to swiftly adapt to evolving technologies, staying at the forefront of advancements in computer graphics and image processing.",
      "Collaboration with Renowned Experts: Collaborated with leading experts from the ICube research laboratory, enhancing practical experience and insight in the field.",
    ],
  },
  {
    title: "Bachelor : Computer Sciences",
    company_name: "INP-ISIMA | Clermont-Auvergne University",
    icon: isima,
    iconBg: "#E6DEDD",
    date: "September 2020 - June 2021",
    points: [
      "Comprehensive Computer Science Education: Completed a 6-semester program, earning 180 ECTS credits with a focus on fundamental areas like algorithmics, networks, and databases.",
      "Multidisciplinary Exposure: Entered through the Informatique-Mathématiques portal, gaining insights into both computer science and mathematics disciplines.",
      "Specialized Skills: Acquired expertise in programming languages, data structures, and databases, preparing for roles like IT maintenance technician or application developer.",
      "Versatile Career Readiness: Well-equipped for diverse roles in IT, such as systems analyst, with potential for further studies in a Master's program.",
    ],
  },
  {
    title:
      "Bachelor of Science and Technology : Computer Science, Networks, and Multimedia",
    company_name: "FST Mohammedia | Hassan II University",
    icon: fst,
    iconBg: "#E6DEDD",
    date: "September 2019 - June 2020",
    points: [
      "Comprehensive IT Education: Completed a Bachelor's program in Computer Science, Networks, and Multimedia, gaining a strong foundation in diverse areas of information technology.",
      "Hands-On Experience: Engaged in practical learning, applying theoretical knowledge to real-world scenarios in areas like computer networks, multimedia development, and information systems.",
      "Multifaceted Skill Development: Acquired skills in software development, network management, and multimedia technologies, preparing for a range of roles in the IT industry.",
      "Applied Learning Environment: Benefited from a dynamic learning environment that fostered a holistic understanding of computer science, networking, and multimedia, laying the groundwork for future professional endeavors.",
    ],
  },
  {
    title:
      "University Diploma of General Studies : Mathematics, Computer Science, and Physics",
    company_name: "FST Mohammedia | Hassan II University",
    icon: fst,
    iconBg: "#E6DEDD",
    date: "September 2017 - June 2019",
    points: [
      "Broad Academic Foundation: Completed a University Diploma of General Studies (DEUG) with a focus on Mathematics, Computer Science, and Physics (MIP), establishing a strong academic base.",
      "Interdisciplinary Proficiency: Developed proficiency across multiple disciplines, including mathematics, computer science, and physics, fostering a well-rounded understanding of scientific and computational principles.",
      "Rigorous Two-Year Program: Successfully navigated a challenging two-year program, acquiring in-depth knowledge and practical skills in mathematics, computer science, and physics.",
      "Preparation for Advanced Studies: Attained a solid academic background, providing a solid foundation for further studies or entry into professional fields related to mathematics, computer science, and physics.",
    ],
  },
  {
    title: "High School Diploma : Mathematical Sciences",
    company_name: "Lycée Ben Msik | Casablanca",
    icon: lycee,
    iconBg: "#E6DEDD",
    date: "September 2016 - June 2017",
    points: [
      "Outstanding Academic Achievement: Attained a Baccalaureate in Mathematical Sciences, reflecting exceptional academic performance and dedication to a challenging curriculum.",
      "Recognized Difficulty: Completed a program widely acknowledged as the most difficult and prestigious in Morocco, demonstrating resilience and a strong work ethic.",
      "Highly Regarded Reputation: Graduated from a program with a stellar reputation, positioning oneself as a top-tier candidate with specialized knowledge in mathematical sciences.",
      "Esteemed Qualification: The Baccalaureate in Mathematical Sciences serves as a highly esteemed qualification, opening doors to further educational pursuits or professional opportunities in math-related fields.",
    ],
  },
];

// Experiences
const experiences = [
  {
    title: "Application Engineer",
    company_name: "R&D Vision | Saint Maur des Fossés",
    icon: entreprise1,
    iconBg: "#E6DEDD",
    date : `August 2024 - ${getCurrentDate()} (Now)`,
    points: [],
  },
  {
    title: "Internship : 3D Reconstruction & Relocation",
    company_name: "R&D Vision | Saint Maur des Fossés",
    icon: entreprise1,
    iconBg: "#E6DEDD",
    date: "March 2024 - August 2024",
    points: [],
  },
  {
    title: "Master Project ",
    company_name: "iCube | Strasbourg University",
    icon: entreprise2,
    iconBg: "#E6DEDD",
    date: "September 2023 - December 2023",
    points: [],
  },
  {
    title: "Reaserch ",
    company_name: "iCube | Strasbourg University",
    icon: entreprise2,
    iconBg: "#E6DEDD",
    date: "January 2023 - June 2023",
    points: [],
  },
  {
    title: "Internship : Smart Home IOT",
    company_name: "FST Mohammedia | Hassan II University",
    icon: fst,
    iconBg: "#E6DEDD",
    date: "April 2020 - June 2020",
    points: [],
  },
];

// Testimonials
const testimonials = [
  {
    testimonial:
      // "Sérieux, appliqué et particulièrement intéressé par sa formation, Mr ADIL Ayoub a toujours fourni un travail de qualité.",
      "Serious, diligent, and particularly interested in his education, Mr. ADIL Ayoub has always delivered high-quality work.",
    name: "Abdellah ADIB",
    designation: "Professor",
    company: "Hassan II University",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjVOQixEUyoOJipn6oXdsL0eNjv-ORt5CO0GA-3jauoUxHM=s272-p-k-rw-no",
  },
  {
    testimonial:
      // "Ses notes ... lui ont conférées la 1ére place sur une promotion de 37 étudiants.",
      "His grades... granted him the first position in a class of 37 students.",
    name: "Abdellah ADIB",
    designation: "Professor",
    company: "Hassan II University",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjVOQixEUyoOJipn6oXdsL0eNjv-ORt5CO0GA-3jauoUxHM=s272-p-k-rw-no",
  },
  {
    testimonial:
      // "J'apprécie tout particulièrement chez Mr Adil AYOUB sa motivation à toute épreuve et son dynamisme constant qui laisse entrevoir un élève déterminé à atteindre ses objectifs.",
      "I particularly appreciate in Mr. Adil AYOUB his unwavering motivation and constant dynamism, which suggests a student determined to achieve his goal.",
    name: "Abdellah ADIB",
    designation: "Professor",
    company: "Hassan II University",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjVOQixEUyoOJipn6oXdsL0eNjv-ORt5CO0GA-3jauoUxHM=s272-p-k-rw-no",
  },
];

// Projects
const projects = [
  {
    name: "3D Reconstruction and Relocalization",
    description:
      "Reconstructing 3D environments from image sequences using SLAM technologies, and evaluating odometry in railway projects.",
    tags: [
      {
        name: "ORB-SLAM",
        color: "blue-text-gradient",
      },
      {
        name: "Odometry",
        color: "green-text-gradient",
      },
      {
        name: "Mar 2024 - Aug 2024 @R&D Vision",
        color: "pink-text-gradient",
      },
    ],
    image: project7,
    source_code_link: "",
    live_site_link: "",
  },
  {
    name: "Experimental Protocols in Virtual Reality",
    description:
      "Design and development of virtual environments for psychological research. Integration of VR technologies into therapeutic applications.",
    tags: [
      {
        name: "Unity",
        color: "blue-text-gradient",
      },
      {
        name: "VR",
        color: "green-text-gradient",
      },
      {
        name: "Sep 2023 - Jan 2024 @IGG-iCube",
        color: "pink-text-gradient",
      },
    ],
    image: project1,
    source_code_link: "https://git.unistra.fr/pfonda/150h-projet",
    live_site_link: "",
  },
  {
    name: "Monte Carlo Path Tracing",
    description:
      "Investigating the Monte-Carlo Path Tracing technique in scenes featuring reflection, shadows, and transparency.",
    tags: [
      {
        name: "3D GPU",
        color: "blue-text-gradient",
      },
      {
        name: "OpenGL",
        color: "green-text-gradient",
      },
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "Shaders",
        color: "green-text-gradient",
      },
      {
        name: "Dec 2023 @Strasbourg University",
        color: "pink-text-gradient",
      },
    ],
    image: project6,
    source_code_link: "https://git.unistra.fr/pfonda/150h-projet",
    live_site_link: "",
  },
  {
    name: "Interaction with Objects in Virtual Reality",
    description:
      "Implementation of a development framework in Unreal Engine 5. Association of gestures and postures with the manipulation of 3D objects.",
    tags: [
      {
        name: "Unreal Engine 5",
        color: "blue-text-gradient",
      },
      {
        name: "3D-VR",
        color: "green-text-gradient",
      },
      {
        name: "Jan 2023 - Jun 2023 @IGG-iCube",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "",
    live_site_link: "",
  },
  {
    name: "Meta Human",
    description:
      "Creating a metaHuman character and integrating it into a virtual environment.",
    tags: [
      {
        name: "Unreal Engine 5",
        color: "green-text-gradient",
      },
      {
        name: "Blender",
        color: "blue-text-gradient",
      },
      {
        name: "3D",
        color: "green-text-gradient",
      },
      {
        name: "Epic Games",
        color: "blue-text-gradient",
      },
      {
        name: "2023 @Personnal",
        color: "pink-text-gradient",
      },
    ],
    image: project5,
    source_code_link: "",
    live_site_link: "",
  },
  {
    name: "Smart Home",
    description:
      "Development of a Web, Android mobile, console and API for the company application for remote management of smart homes.",
    tags: [
      {
        name: "IT",
        color: "green-text-gradient",
      },
      {
        name: "NodeJS",
        color: "blue-text-gradient",
      },
      {
        name: "Python",
        color: "green-text-gradient",
      },
      {
        name: "Typscript",
        color: "blue-text-gradient",
      },
      {
        name: "Apr 2020 - June 2020 @FST Mohammedia",
        color: "pink-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/Ayoub-adil/SmartHomeWeb",
    live_site_link: "https://github.com/Ayoub-adil/SmartHomeMobile",
  },
];

// PC Setup
const pcSetup = [
  {
    component: "GPU",
    name: "NVIDIA GeForce RTX 5080",
  },
  {
    component: "CPU",
    name: "AMD Ryzen 7 9800X3D",
  },
  {
    component: "RAM",
    name: "32 GB",
  },
  {
    component: "Storage",
    name: "3 TB",
  },
];

export {
  services,
  certificates,
  technologies,
  studies,
  experiences,
  testimonials,
  projects,
  pcSetup,
};
