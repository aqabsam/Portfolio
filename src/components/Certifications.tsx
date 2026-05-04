import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, CheckCircle } from "lucide-react";
import { Certificate } from "../data/certificates";
import { getCertificates, subscribeToCertificates } from "../utils/certificatesStorage";

const gradients = [
  "from-blue-100 to-blue-200",
  "from-green-100 to-green-200",
  "from-orange-100 to-orange-200",
  "from-teal-100 to-teal-200",
  "from-red-100 to-red-200",
  "from-indigo-100 to-indigo-200",
];

const iconGradients = [
  "from-blue-600 to-blue-700",
  "from-green-600 to-green-700",
  "from-orange-600 to-orange-700",
  "from-teal-600 to-teal-700",
  "from-red-600 to-red-700",
  "from-indigo-600 to-indigo-700",
];

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certificate[]>([]);

  useEffect(() => {
    setCertifications(getCertificates());

    const unsubscribe = subscribeToCertificates((updatedCertificates) => {
      setCertifications(updatedCertificates);
    });

    return unsubscribe;
  }, []);

  return (
    <section id="certifications" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            My <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A collection of my certification PDFs in programming, machine learning, and technical training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.id}
              className={`group rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-white/85 dark:bg-slate-900/70 hover:bg-gradient-to-br ${gradients[index % gradients.length]}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{cert.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">{cert.date}</p>
                </div>

                <a
                  href={cert.link}
                  download
                  className={`inline-block text-center w-full px-6 py-3 bg-gradient-to-r ${iconGradients[index % iconGradients.length]} text-white rounded-lg font-semibold shadow transition-all duration-200`}
                >
                  <Download className="w-4 h-4 inline-block mr-1" />
                  Download
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">All certificate cards link directly to downloadable PDFs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
