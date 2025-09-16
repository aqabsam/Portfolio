import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import ChatBotModal from "./components/ChatBotModal";

import SkillsPage from "./components/SkillsPage";
import Certifications from "./components/Certifications";

function App() {

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);


  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar
        />

        <Routes>
          {/* Home Section */}
          <Route
            path="/"
            element={
              <>
                <section id="Home">
                  <Home onOpenTrialModal={() => setIsTrialModalOpen(true)} />
                </section>
                
                <section id="Certifications">
                  <Certifications />
                </section>
                <section id="SkillsPage">
                  <SkillsPage />
                </section>
                <section id="Projects">
                  <Projects />
                </section>



                


                <Contact
                  onOpenTrialModal={() => setIsTrialModalOpen(true)}
                  onOpenChatModal={() => setIsChatModalOpen(true)}
                  onOpenCounsellorModal={() => setIsCounsellorModalOpen(true)}
                />
              </>
            }
          />

          {/* Skills Page */}
          <Route path="/skills" element={<SkillsPage />} />
          {/* Certifications Page */}
          <Route path="/certifications" element={<Certifications />} />
          {/* Projects Page */}
          <Route path="/projects" element={<Projects />} />
          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

       
      
          
        </Routes>
        



        <ChatBotModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
        />

      </div>
    </Router>
  );
}

export default App;
