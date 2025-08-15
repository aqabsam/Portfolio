import React from 'react';
import { MapPin, Cloud, Gamepad, Clock, Users, Heart, CheckCircle } from 'lucide-react';

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
                    <div className={`w-16 h-16 bg-gradient-to-br ${project.iconGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
            <span className="text-blue-700 font-medium">All projects are live with working demos</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebProjects;
