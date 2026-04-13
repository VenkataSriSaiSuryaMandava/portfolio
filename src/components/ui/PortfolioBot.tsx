"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const quickActions = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export default function PortfolioBot() {
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "System Online. ⚡ I'm Sai's AI assistant. Ask me anything or have me navigate the site for you." }
  ]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);
  const reduce = useReducedMotion();

  // 1. Mouse Tracking Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 60, 2.5); 
      setMousePos({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Chat Auto-Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 3. Reliable Scroll API
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      return true;
    }
    return false;
  };

  // 4. Conversational Navigation Logic
  const processQuery = async (query) => {
    const q = query.toLowerCase();
    let responses = [];
    let targetId = "";

    if (q.includes("home")) targetId = "home";
    else if (q.includes("about")) targetId = "about";
    else if (q.includes("skill") || q.includes("tech")) targetId = "skills";
    else if (q.includes("project")) targetId = "projects";
    else if (q.includes("experience") || q.includes("work")) targetId = "experience";
    else if (q.includes("education") || q.includes("buffalo")) targetId = "education";
    else if (q.includes("contact") || q.includes("hire") || q.includes("email")) targetId = "contact";

    if (targetId) {
      scrollToSection(targetId);
      responses = [`Navigating to ${targetId}...`, `Found it! Here is the ${targetId} section.`];
    } else {
      responses = ["I didn't quite catch that. Try asking for 'projects', 'skills', or 'contact'."];
    }

    for (const text of responses) {
      setIsTyping(true);
      await new Promise(res => setTimeout(res, 800));
      setMessages(prev => [...prev, { role: "bot", text }]);
      setIsTyping(false);
      await new Promise(res => setTimeout(res, 300));
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input.trim() }]);
    const currentInput = input;
    setInput("");
    processQuery(currentInput);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            className="mb-4 flex h-[480px] w-80 flex-col overflow-hidden rounded-[2.5rem] border border-cyan-500/20 bg-gray-900/80 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
          >
            {/* Header - Version Removed */}
            <div className="flex items-center justify-between border-b border-cyan-500/10 bg-cyan-500/5 p-5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/70">Agent Sai</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-cyan-500/40 hover:text-cyan-400 transition-colors">✕</button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 overflow-x-auto p-3 px-5 no-scrollbar border-b border-white/5 bg-black/20">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    scrollToSection(action.id);
                    setMessages(prev => [...prev, { role: "bot", text: `Understood. Moving to ${action.label}.` }]);
                  }}
                  className="whitespace-nowrap rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[10px] font-bold text-cyan-100 transition-all hover:bg-cyan-500/30"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[12px] leading-relaxed ${
                    msg.role === "bot" ? "bg-white/5 text-gray-200 border border-white/10" : "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-1.5 px-2">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-cyan-500/20">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Initialize command..."
                className="w-full rounded-2xl bg-gray-900 border border-cyan-500/30 px-5 py-3 text-xs text-cyan-50 placeholder-cyan-900 outline-none focus:border-cyan-400 transition-all"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button with "HI" Badge */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-[0_0_40px_rgba(34,211,238,0.3)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0f12]">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#050708] border border-cyan-500/20 shadow-inner">
            {/* Neon Cyan Eyes */}
            <div className="absolute top-3.5 flex gap-2.5">
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    x: mousePos.x, 
                    y: mousePos.y,
                    scaleY: [1, 1, 0, 1] 
                  }}
                  transition={{
                    x: { type: "spring", damping: 12, stiffness: 100 },
                    scaleY: { repeat: Infinity, duration: 4, times: [0, 0.96, 0.98, 1], delay: i * 0.1 }
                  }}
                  className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" 
                />
              ))}
            </div>
            {/* Reactive Mouth */}
            <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-3.5 h-1 w-4 rounded-full bg-cyan-500/40" />
          </div>
        </div>

        {/* Persistent HI Badge */}
        {!open && (
          <motion.span
            className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-black text-gray-950 shadow-lg shadow-cyan-400/50"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            HI
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}