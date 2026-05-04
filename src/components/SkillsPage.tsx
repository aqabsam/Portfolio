import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { SiBootstrap, SiJavascript, SiReact, SiTailwindcss } from "react-icons/si";
import { Skill } from "../data/skills";
import { getSkills, subscribeToSkills } from "../utils/skillsStorage";

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  const renderPrimaryIcon = (skill: Skill) => {
    const name = skill.name.toLowerCase();
    if (name.includes("react")) return <SiReact className="w-16 h-16 mb-4 text-[#61DAFB]" />;
    if (name.includes("tailwind")) return <SiTailwindcss className="w-16 h-16 mb-4 text-[#06B6D4]" />;
    if (name.includes("bootstrap")) return <SiBootstrap className="w-16 h-16 mb-4 text-[#7952B3]" />;
    if (name.includes("javascript")) return <SiJavascript className="w-16 h-16 mb-4 text-[#F7DF1E]" />;
    if (name.includes("python")) {
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          alt="Python"
          className="w-16 h-16 object-contain mb-4"
        />
      );
    }
    if (name.includes("machine learning")) {
      return <Brain className="w-16 h-16 mb-4 text-violet-600" />;
    }
    return <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain mb-4" />;
  };

  useEffect(() => {
    setSkills(getSkills());
    const unsubscribe = subscribeToSkills(setSkills);
    return unsubscribe;
  }, []);

  return (
    <section id="skills" className="py-16 bg-transparent">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
          My <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Skills</span>
        </h2>

        <p className="text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 text-lg">
          My skillset now spans modern web architecture, mobile development, backend APIs, and AI-powered project workflows.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.04 }}
            >
              {renderPrimaryIcon(skill)}
              <h3 className="text-lg font-semibold mb-3 text-center text-slate-800 dark:text-slate-100">{skill.name}</h3>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: index * 0.08 }}
                />
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{skill.percentage}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;
