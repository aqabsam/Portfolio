import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  X,
  Download,
  MapPin,
  Cloud,
  Gamepad,
  Clock,
  Users,
  Heart,
  CheckCircle,
} from "lucide-react";

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);

  const projects = [
    {
      title: "Object Detection",
      tag: "Python + AI",
      description: "Detect objects in real time using Python and OpenCV.",
      video: "/videos/OBJECT_DETECTION.mov",
      password: "physics123@",
      code: `# Python Object Detection
import cv2
from ultralytics import YOLO

# Load YOLO model
model = YOLO("yolov8n.pt")

# Try macOS-friendly webcam capture
cap = cv2.VideoCapture(0, cv2.CAP_AVFOUNDATION)

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    # Run object detection
    results = model(frame)
    annotated_frame = results[0].plot()

    # Display the result
    cv2.imshow("YOLOv8 Object Detection", annotated_frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
`,
    },
    {
      title: "Virtual Calculator",
      tag: "Python + OpenCV",
      description: "A gesture-controlled calculator using Python, OpenCV, and MediaPipe.",
      video: "/videos/CALCULATOR.mov",
      password: "physics123@",
      code: `# Python Virtual Calculator
import cv2
import numpy as np
import mediapipe as mp
import time

# Setup MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Webcam
cap = cv2.VideoCapture(0)

# Calculator Layout
keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
]

# Positioning
key_size = 60
spacing_x = 10
spacing_y = 10
start_x = 50
start_y = 150  # Leave space at top for display

# Calculator variables
equation = ""
result = ""

def draw_keyboard(img, keys):
    positions = []
    y = start_y
    for row in keys:
        x = start_x
        row_positions = []
        for key in row:
            w = key_size
            cv2.rectangle(img, (x, y), (x + w, y + key_size), (50, 50, 50), -1)
            cv2.rectangle(img, (x, y), (x + w, y + key_size), (255, 255, 255), 1)
            font_scale = 0.8
            cv2.putText(img, key, (x + 15, y + 40), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), 2)
            row_positions.append((key, (x, y, w, key_size)))
            x += w + spacing_x
        positions.append(row_positions)
        y += key_size + spacing_y
    return positions

# Hover logic
hover_start_time = None
hover_key = None
hover_delay = 1  # seconds

while True:
    ret, img = cap.read()
    if not ret:
        break
    img = cv2.flip(img, 1)
    img = cv2.resize(img, (800, 600))
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    # Draw current equation and result
    cv2.rectangle(img, (start_x, 30), (start_x + 300, 100), (30, 30, 30), -1)
    cv2.putText(img, equation, (start_x + 10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
    cv2.putText(img, result, (start_x + 10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    key_positions = draw_keyboard(img, keys)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            index_finger_tip = hand_landmarks.landmark[8]
            h, w, _ = img.shape
            x, y = int(index_finger_tip.x * w), int(index_finger_tip.y * h)
            cv2.circle(img, (x, y), 10, (0, 255, 255), -1)

            key_found = None
            for row in key_positions:
                for key, (kx, ky, kw, kh) in row:
                    if kx < x < kx + kw and ky < y < ky + kh:
                        key_found = key
                        cv2.rectangle(img, (kx, ky), (kx + kw, ky + kh), (0, 255, 0), 2)

                        if hover_key != key:
                            hover_key = key
                            hover_start_time = time.time()
                        else:
                            if time.time() - hover_start_time >= hover_delay:
                                if key == 'C':
                                    equation = ""
                                    result = ""
                                elif key == '=':
                                    try:
                                        result = str(eval(equation))
                                    except:
                                        result = "Error"
                                else:
                                    equation += key
                                hover_start_time = time.time() + 999  # Wait until finger moves

            if key_found is None:
                hover_key = None
                hover_start_time = None

    else:
        hover_key = None
        hover_start_time = None

    cv2.imshow("Virtual Calculator - Hover Press", img)
    if cv2.waitKey(1) & 0xFF == 27:  # ESC to quit
        break

cap.release()
cv2.destroyAllWindows()
`,
    },
  ];

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setPasswordInput("");
    setError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPasswordInput("");
    setError("");
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === projects[currentIndex].password) {
      setShowCode(true);
      handleCloseModal();
    } else {
      setError("Incorrect password!");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([projects[currentIndex].code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${projects[currentIndex].title.replace(/\s+/g, "_")}.py`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      {/* Your Projects section (unchanged) */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Python{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Projects Showcase
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my Python projects with offline demo videos and descriptions.
            </p>
          </div>

          {/* Project Box */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 relative overflow-hidden">
              {/* Video Player */}
              <video
                src={projects[currentIndex].video}
                controls
                className="w-full h-[50vh] md:h-[70vh] object-cover rounded-xl mb-6"
              />

              {/* Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {projects[currentIndex].tag}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {projects[currentIndex].description}
                </p>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={prevProject}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>

                  {!showCode && (
                    <button
                      onClick={handleOpenModal}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                      <Code className="w-5 h-5" />
                      View Source
                    </button>
                  )}

                  <button
                    onClick={nextProject}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Code + Download */}
                {showCode && (
                  <div className="mt-6">
                    <pre className="bg-gray-900 text-white p-6 rounded-xl overflow-x-auto">
                      <code>{projects[currentIndex].code}</code>
                    </pre>
                    <button
                      onClick={handleDownload}
                      className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                      <Download className="w-5 h-5" />
                      Download Code
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Password Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                Enter Password
              </h3>
              <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* >>> Added directly after your Projects section <<< */}
      <WebProjects />
    </>
  );
};

const WebProjects: React.FC = () => {
  const projects = [
    {
      icon: MapPin,
      title: "Lost & Found",
      description: "Report and track lost and found items with real-time updates.",
      gradient: "from-blue-100 to-blue-200",
      iconGradient: "from-blue-600 to-blue-700",
      link: "https://aqabsam.github.io/LOST-AND-FOUND/",
    },
    {
      icon: Cloud,
      title: "Weather App",
      description: "Get live weather updates and forecasts using API integration.",
      gradient: "from-green-100 to-green-200",
      iconGradient: "from-green-600 to-green-700",
      link: "https://aqabsam.github.io/PRODIGY_WD_05/",
    },
    {
      icon: Gamepad,
      title: "Tic Tac Toe",
      description: "Interactive Tic Tac Toe game built with JavaScript and React.",
      gradient: "from-purple-100 to-purple-200",
      iconGradient: "from-purple-600 to-purple-700",
      link: "https://aqabsam.github.io/PRODIGY_WD_03/",
    },
    {
      icon: Clock,
      title: "Stopwatch",
      description: "A fully functional stopwatch with start, stop, reset, and lap features.",
      gradient: "from-orange-100 to-orange-200",
      iconGradient: "from-orange-600 to-orange-700",
      link: "https://aqabsam.github.io/PRODIGY_WD_02/",
    },
    {
      icon: Users,
      title: "Nice",
      description: "An interactive platform to connect students with startup initiatives.",
      gradient: "from-teal-100 to-teal-200",
      iconGradient: "from-teal-600 to-teal-700",
      link: "https://yourdomain.com/nice",
    },
    {
      icon: Heart,
      title: "Helping Hand for Bezubaan",
      description: "Web app supporting charitable initiatives for the mute community.",
      gradient: "from-red-100 to-red-200",
      iconGradient: "from-red-600 to-red-700",
      link: "https://aqabsam.github.io/HELPING_HAND_FOR_BEZUBAAN/",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Web Development Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my hands-on web development projects, showcasing interactive UI, API integrations, and real-world functionality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                className={`group rounded-xl border border-gray-100 overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-white hover:bg-gradient-to-br ${project.gradient}`}
              >
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${project.iconGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-center w-full px-6 py-3 bg-gradient-to-r ${project.iconGradient} text-white rounded-lg font-semibold transition-all duration-200`}
                  >
                    Visit Project
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">
              All projects are live with working demos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
