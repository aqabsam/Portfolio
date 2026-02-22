import React, { useEffect, useMemo, useState } from "react";
import { FileText, Lock, LogOut, Pencil, PlusCircle, Save, Trash2, Upload, User } from "lucide-react";
import { Certificate } from "../data/certificates";
import { Skill } from "../data/skills";
import { WebProject, WebProjectIcon } from "../data/webProjects";
import { getCertificates, saveCertificates, subscribeToCertificates } from "../utils/certificatesStorage";
import { getResumeLink, saveResumeLink, subscribeToResume } from "../utils/resumeStorage";
import { getProfilePhotoLink, saveProfilePhotoLink, subscribeToProfilePhoto } from "../utils/profilePhotoStorage";
import { getSkills, saveSkills, subscribeToSkills } from "../utils/skillsStorage";
import { getWebProjects, saveWebProjects, subscribeToWebProjects } from "../utils/webProjectsStorage";

const ADMIN_USERNAME = "8986392298";
const ADMIN_PASSWORD = "physics123@";
const ADMIN_SESSION_KEY = "portfolio_admin_session";

type CertificateForm = Omit<Certificate, "id">;
type SkillForm = Omit<Skill, "id">;
type WebProjectForm = Omit<WebProject, "id">;

const emptyCertificateForm: CertificateForm = {
  title: "",
  issuer: "",
  date: "",
  link: "",
};

const emptySkillForm: SkillForm = {
  name: "",
  logo: "",
  percentage: 80,
};

const emptyWebProjectForm: WebProjectForm = {
  title: "",
  description: "",
  link: "",
  icon: "map-pin",
  gradient: "from-blue-100 to-blue-200",
  iconGradient: "from-blue-600 to-blue-700",
};

const iconOptions: WebProjectIcon[] = ["map-pin", "cloud", "gamepad", "clock", "users", "heart"];
const gradientOptions = [
  "from-blue-100 to-blue-200",
  "from-green-100 to-green-200",
  "from-purple-100 to-purple-200",
  "from-orange-100 to-orange-200",
  "from-teal-100 to-teal-200",
  "from-red-100 to-red-200",
];
const iconGradientOptions = [
  "from-blue-600 to-blue-700",
  "from-green-600 to-green-700",
  "from-purple-600 to-purple-700",
  "from-orange-600 to-orange-700",
  "from-teal-600 to-teal-700",
  "from-red-600 to-red-700",
];

const toId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const AdminPanel: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certificateForm, setCertificateForm] = useState<CertificateForm>(emptyCertificateForm);
  const [editingCertificateId, setEditingCertificateId] = useState<string | null>(null);

  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillForm, setSkillForm] = useState<SkillForm>(emptySkillForm);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const [webProjects, setWebProjects] = useState<WebProject[]>([]);
  const [webProjectForm, setWebProjectForm] = useState<WebProjectForm>(emptyWebProjectForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const [resumeLink, setResumeLink] = useState("/resume.pdf");
  const [resumeStatus, setResumeStatus] = useState("");
  const [profilePhotoLink, setProfilePhotoLink] = useState("");
  const [profilePhotoStatus, setProfilePhotoStatus] = useState("");

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
    setCertificates(getCertificates());
    setSkills(getSkills());
    setWebProjects(getWebProjects());
    setResumeLink(getResumeLink());
    setProfilePhotoLink(getProfilePhotoLink());

    const unsubscribeCertificates = subscribeToCertificates(setCertificates);
    const unsubscribeSkills = subscribeToSkills(setSkills);
    const unsubscribeProjects = subscribeToWebProjects(setWebProjects);
    const unsubscribeResume = subscribeToResume(setResumeLink);
    const unsubscribeProfilePhoto = subscribeToProfilePhoto(setProfilePhotoLink);

    return () => {
      unsubscribeCertificates();
      unsubscribeSkills();
      unsubscribeProjects();
      unsubscribeResume();
      unsubscribeProfilePhoto();
    };
  }, []);

  const certificateSubmitLabel = useMemo(
    () => (editingCertificateId ? "Update Certificate" : "Add Certificate"),
    [editingCertificateId],
  );
  const skillSubmitLabel = useMemo(() => (editingSkillId ? "Update Skill" : "Add Skill"), [editingSkillId]);
  const projectSubmitLabel = useMemo(() => (editingProjectId ? "Update Project" : "Add Project"), [editingProjectId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setLoginError("");
      return;
    }
    setLoginError("Invalid phone number or password.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setEditingCertificateId(null);
    setEditingSkillId(null);
    setEditingProjectId(null);
    setCertificateForm(emptyCertificateForm);
    setSkillForm(emptySkillForm);
    setWebProjectForm(emptyWebProjectForm);
  };

  const handleCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = {
      title: certificateForm.title.trim(),
      issuer: certificateForm.issuer.trim(),
      date: certificateForm.date.trim(),
      link: certificateForm.link.trim(),
    };
    if (!trimmed.title || !trimmed.issuer || !trimmed.date || !trimmed.link) return;

    const updated = editingCertificateId
      ? certificates.map((certificate) =>
          certificate.id === editingCertificateId ? { ...certificate, ...trimmed } : certificate,
        )
      : [{ id: toId("cert"), ...trimmed }, ...certificates];

    saveCertificates(updated);
    setCertificateForm(emptyCertificateForm);
    setEditingCertificateId(null);
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = {
      name: skillForm.name.trim(),
      logo: skillForm.logo.trim(),
      percentage: Number(skillForm.percentage),
    };

    if (!trimmed.name || !trimmed.logo) return;

    const clampedPercentage = Math.max(0, Math.min(100, trimmed.percentage));
    const updated = editingSkillId
      ? skills.map((skill) => (skill.id === editingSkillId ? { ...skill, ...trimmed, percentage: clampedPercentage } : skill))
      : [{ id: toId("skill"), ...trimmed, percentage: clampedPercentage }, ...skills];

    saveSkills(updated);
    setSkillForm(emptySkillForm);
    setEditingSkillId(null);
  };

  const handleWebProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed: WebProjectForm = {
      title: webProjectForm.title.trim(),
      description: webProjectForm.description.trim(),
      link: webProjectForm.link.trim(),
      icon: webProjectForm.icon,
      gradient: webProjectForm.gradient,
      iconGradient: webProjectForm.iconGradient,
    };

    if (!trimmed.title || !trimmed.description || !trimmed.link) return;

    const updated = editingProjectId
      ? webProjects.map((project) => (project.id === editingProjectId ? { ...project, ...trimmed } : project))
      : [{ id: toId("web"), ...trimmed }, ...webProjects];

    saveWebProjects(updated);
    setWebProjectForm(emptyWebProjectForm);
    setEditingProjectId(null);
  };

  const handleCertificatePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setCertificateForm((prev) => ({ ...prev, link: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSkillLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setSkillForm((prev) => ({ ...prev, logo: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setResumeLink(result);
        saveResumeLink(result);
        setResumeStatus("New CV uploaded successfully. It is now global for all users.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setProfilePhotoLink(result);
        saveProfilePhotoLink(result);
        setProfilePhotoStatus("New profile photo uploaded successfully. It is now global for all users.");
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <section className="py-24 bg-transparent min-h-screen">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-lg mx-auto bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-8 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Admin Login</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">Sign in to manage certificates, skills, projects, and CV.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter admin phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {loginError && <p className="text-red-600 text-sm">{loginError}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-transparent min-h-screen">
      <div className="container mx-auto px-6 lg:px-20 space-y-8">
        <div className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Global Content Manager</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">All updates sync to all users via Firebase in real time.</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-4 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              Update Resume / CV
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Upload a new CV PDF. Download buttons update globally.</p>

            <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-4 py-5 text-center cursor-pointer hover:border-cyan-500 transition-colors duration-200">
              <Upload className="w-5 h-5 mx-auto mb-2 text-slate-500 dark:text-slate-300" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Upload New CV (PDF)</span>
              <input type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} />
            </label>

            <a
              href={resumeLink}
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-lg font-semibold"
            >
              <FileText className="w-4 h-4" />
              Download Current CV
            </a>

            {resumeStatus && <p className="text-sm text-green-600 font-medium">{resumeStatus}</p>}
          </div>

          <div className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-4 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-600" />
              Update Profile Photo
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Upload a new profile image. It will update across all pages for all users.</p>

            <div className="w-24 h-24 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center">
              {profilePhotoLink ? (
                <img src={profilePhotoLink} alt="Current profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-slate-500" />
              )}
            </div>

            <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-4 py-5 text-center cursor-pointer hover:border-cyan-500 transition-colors duration-200">
              <Upload className="w-5 h-5 mx-auto mb-2 text-slate-500 dark:text-slate-300" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Upload New Profile Photo (JPG/PNG)</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoUpload} />
            </label>

            {profilePhotoStatus && <p className="text-sm text-green-600 font-medium">{profilePhotoStatus}</p>}
          </div>

          <form onSubmit={handleSkillSubmit} className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{skillSubmitLabel}</h2>
            <input
              type="text"
              value={skillForm.name}
              onChange={(e) => setSkillForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Skill name"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <input
              type="text"
              value={skillForm.logo}
              onChange={(e) => setSkillForm((prev) => ({ ...prev, logo: e.target.value }))}
              placeholder="Logo URL"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <input
              type="number"
              min={0}
              max={100}
              value={skillForm.percentage}
              onChange={(e) => setSkillForm((prev) => ({ ...prev, percentage: Number(e.target.value) }))}
              placeholder="Skill percentage"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />

            <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-4 py-4 text-center cursor-pointer hover:border-cyan-500 transition-colors duration-200">
              <Upload className="w-5 h-5 mx-auto mb-2 text-slate-500 dark:text-slate-300" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Upload Logo (optional)</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleSkillLogoUpload} />
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {editingSkillId ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                {skillSubmitLabel}
              </button>
              {editingSkillId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingSkillId(null);
                    setSkillForm(emptySkillForm);
                  }}
                  className="px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {skills.map((skill) => (
                <article key={skill.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{skill.name} ({skill.percentage}%)</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkillId(skill.id);
                          setSkillForm({ name: skill.name, logo: skill.logo, percentage: skill.percentage });
                        }}
                        className="text-sm text-blue-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => saveSkills(skills.filter((item) => item.id !== skill.id))}
                        className="text-sm text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </form>

          <form onSubmit={handleWebProjectSubmit} className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{projectSubmitLabel}</h2>
            <input
              type="text"
              value={webProjectForm.title}
              onChange={(e) => setWebProjectForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Project title"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <textarea
              value={webProjectForm.description}
              onChange={(e) => setWebProjectForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Project description"
              rows={3}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <input
              type="url"
              value={webProjectForm.link}
              onChange={(e) => setWebProjectForm((prev) => ({ ...prev, link: e.target.value }))}
              placeholder="Project link"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                value={webProjectForm.icon}
                onChange={(e) => setWebProjectForm((prev) => ({ ...prev, icon: e.target.value as WebProjectIcon }))}
                className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-3"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>

              <select
                value={webProjectForm.gradient}
                onChange={(e) => setWebProjectForm((prev) => ({ ...prev, gradient: e.target.value }))}
                className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-3"
              >
                {gradientOptions.map((gradient) => (
                  <option key={gradient} value={gradient}>{gradient}</option>
                ))}
              </select>

              <select
                value={webProjectForm.iconGradient}
                onChange={(e) => setWebProjectForm((prev) => ({ ...prev, iconGradient: e.target.value }))}
                className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-3"
              >
                {iconGradientOptions.map((gradient) => (
                  <option key={gradient} value={gradient}>{gradient}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {editingProjectId ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                {projectSubmitLabel}
              </button>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setWebProjectForm(emptyWebProjectForm);
                  }}
                  className="px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {webProjects.map((project) => (
                <article key={project.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{project.title}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(project.id);
                          setWebProjectForm({
                            title: project.title,
                            description: project.description,
                            link: project.link,
                            icon: project.icon,
                            gradient: project.gradient,
                            iconGradient: project.iconGradient,
                          });
                        }}
                        className="text-sm text-blue-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => saveWebProjects(webProjects.filter((item) => item.id !== project.id))}
                        className="text-sm text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </form>

          <form onSubmit={handleCertificateSubmit} className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{certificateSubmitLabel}</h2>
            <input
              type="text"
              value={certificateForm.title}
              onChange={(e) => setCertificateForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Certificate title"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <input
              type="text"
              value={certificateForm.issuer}
              onChange={(e) => setCertificateForm((prev) => ({ ...prev, issuer: e.target.value }))}
              placeholder="Issuer"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <input
              type="text"
              value={certificateForm.date}
              onChange={(e) => setCertificateForm((prev) => ({ ...prev, date: e.target.value }))}
              placeholder="Date"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />
            <input
              type="text"
              value={certificateForm.link}
              onChange={(e) => setCertificateForm((prev) => ({ ...prev, link: e.target.value }))}
              placeholder="Certificate URL or uploaded PDF data"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-4 py-3"
              required
            />

            <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg px-4 py-5 text-center cursor-pointer hover:border-cyan-500 transition-colors duration-200">
              <Upload className="w-5 h-5 mx-auto mb-2 text-slate-500 dark:text-slate-300" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Upload Certificate PDF</span>
              <input type="file" accept="application/pdf" className="hidden" onChange={handleCertificatePdfUpload} />
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {editingCertificateId ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                {certificateSubmitLabel}
              </button>
              {editingCertificateId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCertificateId(null);
                    setCertificateForm(emptyCertificateForm);
                  }}
                  className="px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="bg-white/85 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Current Certificates</h2>
            <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
              {certificates.map((certificate) => (
                <article key={certificate.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{certificate.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{certificate.issuer}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{certificate.date}</p>
                  <div className="flex gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCertificateId(certificate.id);
                        setCertificateForm({
                          title: certificate.title,
                          issuer: certificate.issuer,
                          date: certificate.date,
                          link: certificate.link,
                        });
                      }}
                      className="inline-flex items-center gap-1 text-sm text-blue-700 font-medium"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => saveCertificates(certificates.filter((item) => item.id !== certificate.id))}
                      className="inline-flex items-center gap-1 text-sm text-red-700 font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
