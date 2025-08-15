import React from "react";
import { motion } from "framer-motion";

// Skill logos
import reactLogo from "../assets/skills/react.png";
import tailwindLogo from "../assets/skills/tailwind.png";
import bootstrapLogo from "../assets/skills/bootstrap.png";
import jsLogo from "../assets/skills/javascript.png";
import cLogo from "../assets/skills/c.png";
import cppLogo from "../assets/skills/cpp.png";

// Skills array
const skills = [
  { name: "React", img: reactLogo, percentage: 99 },
  { name: "Tailwind CSS", img: tailwindLogo, percentage: 98 },
  { name: "Bootstrap", img: bootstrapLogo, percentage: 95 },
  { name: "JavaScript", img: jsLogo, percentage: 75 },
  { name: "C", img: cLogo, percentage: 90 },
  { name: "C++", img: cppLogo, percentage: 70 },
];

const SkillsPage: React.FC = () => {
  return (
    <section id="skills" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
  My{" "}
  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
    Skills
  </span>
</h2>


        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={skill.img}
                alt={skill.name}
                className="w-20 h-20 object-contain mb-4"
                whileHover={{ rotate: 5 }}
              />
              <h3 className="text-lg font-semibold mb-3">{skill.name}</h3>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">{skill.percentage}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;
