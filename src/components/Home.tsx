import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/ProfileImg.jpeg";

interface AboutProps {
  onOpenTrialModal: () => void;
}

const Home: React.FC<AboutProps> = ({ onOpenTrialModal }) => {
  return (
    <section id="home" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Centered Intro Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Intro
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Side Content */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              Hello! I'm <span className="font-semibold text-blue-600">Aqab Sami</span>,  
              a passionate Front-End Developer and Computer Science student who loves building  
              responsive, modern, and visually stunning web applications.  
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              I work with <span className="font-semibold text-teal-600">React, Tailwind CSS, Bootstrap, JavaScript, HTML & CSS, C, and C++</span>  
              to create seamless user experiences that blend functionality with creativity.  
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              My mission is to bring ideas to life through clean code, smooth animations, and  
              innovative designs — while continuously learning and exploring the latest in web development.  
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center space-y-4">
              <a
                href="/resume.pdf"
                download
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-teal-700 transition-all duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Side Circular Profile Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={profileImg}
              alt="Profile"
              className="rounded-full shadow-lg w-80 h-80 object-cover border-4 border-gradient-to-r from-blue-500 to-teal-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
