import React from "react";
import { motion } from "framer-motion";
import { Award, Download, CheckCircle } from "lucide-react";

const certifications = [
  {
    title: "Machine Learning and Web Development",
    issuer: "IIT Roorkee",
    date: "Jul 2025",
    link: "/IIT Roorkee.pdf",
    gradient: "from-blue-100 to-blue-200",
    iconGradient: "from-blue-600 to-blue-700",
  },
  {
    title: "C Programming",
    issuer: "IIT Roorkee",
    date: "Jul 2025",
    link: "/IIT Roorkee.pdf",
    gradient: "from-green-100 to-green-200",
    iconGradient: "from-green-600 to-green-700",
  },
  {
    title: "State Level",
    issuer: "Bihar DSTTE",
    date: "May 2025",
    link: "/BOOTCAMP.pdf",
    gradient: "from-purple-100 to-purple-200",
    iconGradient: "from-purple-600 to-purple-700",
  },
  {
    title: "Boot Camp",
    issuer: "IIT BOMBAY",
    date: "Apr 2025",
    link: "/BOOTCAMP.pdf",
    gradient: "from-orange-100 to-orange-200",
    iconGradient: "from-orange-600 to-orange-700",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Apr 2025",
    link: "/BOOTCAMP.pdf",
    gradient: "from-red-100 to-red-200",
    iconGradient: "from-red-600 to-red-700",
  },
  {
    title: "COURSE NAME",
    issuer: "COMPANY NAME",
    date: "DATE",
    link: "/BOOTCAMP.pdf",
    gradient: "from-gray-100 to-gray-200",
    iconGradient: "from-gray-600 to-gray-700",
  },
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I continuously upgrade my skills through certified courses from top
            institutions and platforms.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className={`group rounded-xl border border-gray-100 overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-white hover:bg-gradient-to-br ${cert.gradient}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${cert.iconGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs mb-4">{cert.date}</p>
                </div>

                <a
                  href={cert.link}
                  download
                  className={`inline-block text-center w-full px-6 py-3 bg-gradient-to-r ${cert.iconGradient} text-white rounded-lg font-semibold shadow hover:from-${cert.iconGradient.split(" ")[0]} hover:to-${cert.iconGradient.split(" ")[1]} transition-all duration-200`}
                >
                  <Download className="w-3 h-3 inline-block mr-1" />
                  Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">
              All certifications are downloadable PDFs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
