import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SkillsPage from "./components/SkillsPage";
import Certifications from "./components/Certifications";
import ChatBotModal from "./components/ChatBotModal";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
  }, []);

  return (
    <Router>
      <div>
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300">
          <Navbar />

          <main className="pt-20 md:pt-24">
            <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="home">
                    <Home />
                  </section>
                  <section id="certifications">
                    <Certifications />
                  </section>
                  <section id="skills">
                    <SkillsPage />
                  </section>
                  <section id="projects">
                    <Projects />
                  </section>
                  <section id="contact">
                    <Contact onOpenChatModal={() => setIsChatModalOpen(true)} />
                  </section>
                </>
              }
            />

            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact onOpenChatModal={() => setIsChatModalOpen(true)} />} />
            <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>

          <ChatBotModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
        </div>
      </div>
    </Router>
  );
}

export default App;
