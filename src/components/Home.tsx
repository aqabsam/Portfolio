import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/ProfileImg.jpeg";
import { getResumeLink, subscribeToResume } from "../utils/resumeStorage";
import { getProfilePhotoLink, subscribeToProfilePhoto } from "../utils/profilePhotoStorage";

const Home: React.FC = () => {
  const [resumeLink, setResumeLink] = useState("/resume.pdf");
  const [profilePhotoLink, setProfilePhotoLink] = useState("");

  useEffect(() => {
    setResumeLink(getResumeLink());
    const unsubscribe = subscribeToResume(setResumeLink);
    return unsubscribe;
  }, []);

  useEffect(() => {
    setProfilePhotoLink(getProfilePhotoLink());
    const unsubscribe = subscribeToProfilePhoto(setProfilePhotoLink);
    return unsubscribe;
  }, []);

  return (
    <section id="home" className="py-16 bg-transparent">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Intro</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-8 md:p-12 shadow-xl dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex flex-col justify-center">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-lg">
              Hello! I&apos;m <span className="font-semibold text-cyan-600 dark:text-cyan-400">Mohd Aqab Sami</span>, a Full-Stack and App Developer currently focused on building
              scalable, user-first products for web and mobile.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-lg">
              I now work across <span className="font-semibold text-cyan-700 dark:text-cyan-300">MERN Stack, Flutter, Firebase, Python Flask backend, and Machine Learning</span>,
              along with React, Tailwind CSS, JavaScript, C, and C++.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
              I have built multiple production-style applications, including 4 complete apps and a smart attendance system using CCTV camera-based detection.
            </p>

          </div>

          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={profilePhotoLink || profileImg}
                alt="Profile"
                className="rounded-full shadow-2xl shadow-cyan-500/30 w-80 h-80 object-cover border-4 border-cyan-500"
              />
            </motion.div>
            <a
              href={resumeLink}
              download
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-600/30 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
