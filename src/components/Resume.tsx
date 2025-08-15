import React from "react";

const Resume: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-poppins px-6 py-10">
      {/* Header */}
      <header id="home" className="flex flex-col items-center text-center mb-12">
        <img
          src="aqab.jpeg"
          alt="Mohd Aqab Sami"
          className="w-44 h-44 rounded-full border-4 border-cyan-500 shadow-lg"
        />
        <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Mohd Aqab Sami
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Full-Stack Web Developer passionate about building interactive,
          user-friendly websites and applications using modern web technologies.
        </p>
        <div className="flex flex-wrap gap-3 mt-5 justify-center">
          {[
            "Git",
            "HTML5",
            "CSS3",
            "JavaScript",
            "C++ (OOPs)",
            "C",
            "DSA",
            "Photoshop",
            "Excel",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm border border-cyan-500 rounded-full bg-cyan-50 text-cyan-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </header>

      {/* About Me */}
      <section id="about" className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium">Background</h3>
            <p>
              I am a passionate Computer Science student and aspiring
              full-stack web developer with strong skills in front-end
              technologies, problem-solving, and UI/UX design. I enjoy turning
              ideas into interactive digital experiences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Education</h3>
            <ul className="list-disc pl-5">
              <li>
                B.Tech in Computer Science and Engineering — Bihar Engineering
                University (Sept 2023 – June 2027) — GPA: 8.05/10
              </li>
              <li>Intermediate — K.L.S College Nawada (2021 - 2023)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium">Experience & Projects</h3>
            <ul className="list-disc pl-5">
              <li>
                Developed official website for Nawada Incubation Club (NICE) —
                1st Prize, District-Level Thematic Competition.
              </li>
              <li>
                Built a responsive website for Helping Hand for Bezubaan (Stray
                Dog Adoption).
              </li>
              <li>
                Presentation design for startup initiatives — GEC Nawada.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <a
              href="AQAB CV .pdf"
              download
              className="mt-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Certifications
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Python for ML, DS & Web Dev – IIT Roorkee (40 Hours)</li>
          <li>C Programming – IIT Bombay | Score: 87.5%</li>
          <li>
            Entrepreneurship Bootcamp – E-Cell IIT Bombay & GEC Nawada
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Contact Me
        </h2>
        <p>
          Email:{" "}
          <a
            href="mailto:aqabsami02@gmail.com"
            className="text-blue-600 hover:underline"
          >
            aqabsami02@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/mohd-aqab-sami-a521a327b/"
            className="text-blue-600 hover:underline"
          >
            Profile
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/aqabsam"
            className="text-blue-600 hover:underline"
          >
            github.com/aqabsam
          </a>
        </p>
      </section>
    </div>
  );
};

export default Resume;
