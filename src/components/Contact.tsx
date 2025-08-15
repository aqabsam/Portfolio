import React, { useState } from 'react';
import { MessageCircle, Mail, Linkedin, Instagram, Facebook, CheckCircle, AlertTriangle } from 'lucide-react';

interface ContactProps {
  onOpenChatModal: () => void;
}

const MAP_SRC = "https://www.google.com/maps?q=Nawada,+Bihar&z=12&output=embed";

const Contact: React.FC<ContactProps> = ({ onOpenChatModal }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formPayload = {
      access_key: 'f08b695a-0a17-4da5-9b01-eda7b07324b8',
      ...formData,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formPayload),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({ type: 'success', text: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: '❌ Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: '⚠️ Network error. Please try later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-black">Get </span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              In Touch
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question, a project idea, or just want to say hi? I’d love to hear from you!
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Map */}
          <div className="w-full h-96 md:h-[28rem] rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Location Map"
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {status && (
                <div
                  className={`p-4 rounded-lg text-white flex items-center gap-2 ${
                    status.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                  {status.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-12">
          {[
            { Icon: Mail, href: "mailto:aqabsami02@gmail.com", from: "from-red-500", to: "to-red-600" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/mohd-aqab-sami-a521a327b/", from: "from-blue-700", to: "to-blue-800" },
            { Icon: Instagram, href: "https://instagram.com/aqabsami", from: "from-pink-500", to: "to-orange-500" },
            { Icon: Facebook, href: "https://www.facebook.com/aqab.sami", from: "from-blue-500", to: "to-blue-700" },
          ].map(({ Icon, href, from, to }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gradient-to-r ${from} ${to} text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-110 transition`}
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Chatbot Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={onOpenChatModal}
            className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-6 rounded-2xl font-bold text-lg 
              hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            <MessageCircle className="w-8 h-8 mx-auto mb-3" />
            <div>Chat with AI </div>
            <div className="text-sm font-normal text-green-100 mt-1">Get instant help</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
