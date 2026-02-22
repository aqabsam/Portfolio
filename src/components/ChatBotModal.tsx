import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, User } from 'lucide-react';

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const introQuestions = [
  "What's your full name?",
  "What course are you pursuing?",
  "Which branch or specialization?",
  "What year are you in?",
  "What is your career goal?",
  "Where do you study?",
  "What is your email address?",
  "What are your hobbies?",
  "What are your key skills?",
  "What is your dream job?",
  "What's your favorite subject?",
  "Tell me something interesting about yourself."
];

const defaultAnswers = [
  "Mohd Aqab Sami",
  "B.Tech",
  "Computer Science & Engineering",
  "3rd Year",
  "Full Stack Web Developer",
  "Government Engineering College, Nawada",
  "aqabsami02@gmail.com",
  "Rubik's Cube, Coding, Reading",
  "JavaScript, React, Python",
  "Software Engineer at a top tech company",
  "Computer Science",
  "I can solve a Rubik's Cube in under a minute!"
];

const ChatBotModal: React.FC<ChatBotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<string[]>(Array(introQuestions.length).fill(""));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      startConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! Let’s get to know you better. " + introQuestions[0],
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setStep(0);
    setAnswers(Array(introQuestions.length).fill(""));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Store answer
    const updatedAnswers = [...answers];
    updatedAnswers[step] = input;
    setAnswers(updatedAnswers);

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      if (step < introQuestions.length - 1) {
        const botMessage: Message = {
          id: messages.length + 2,
          text: introQuestions[step + 1],
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setStep(step + 1);
      } else {
        // Show summary
        const summaryLines = introQuestions.map((q, i) => `• ${q} ${updatedAnswers[i] || defaultAnswers[i]}`);
        const summaryMessage: Message = {
          id: messages.length + 2,
          text: "🎉 Great! Here's your profile:\n" + summaryLines.join("\n"),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);
        setStep(step + 1);
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-md h-[80vh] max-h-[640px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Aqab Buddy</h3>
              <p className="text-xs text-cyan-100">Intro Interview Mode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-blue-600 ml-2' : 'bg-green-600 mr-2'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-2xl whitespace-pre-line ${
                  message.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {step <= introQuestions.length && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center">
            <input
              type="text"
              className="flex-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-full px-4 py-2 text-sm mr-2"
              placeholder={step < introQuestions.length ? `Example: ${defaultAnswers[step]}` : "Type here..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBotModal;
