import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { API_KEY, API_URL, MODELS } from "../config/api";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Tarun's AI assistant. Ask me about his skills, projects, or experience!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart keyword-based responses (works offline)
  const getSmartResponse = (input) => {
    const lower = input.toLowerCase();
    
    const responses = {
      skills: [
        "🚀 Tarun's Tech Stack:\n• Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS, Three.js\n• Backend: Node.js, Express.js, MongoDB\n• Tools: Git, GitHub, VS Code, Figma",
        "💻 Tarun specializes in React ecosystem with Node.js backend. He's also skilled in 3D web graphics with Three.js!"
      ],
      projects: [
        "🛠️ Tarun's Projects:\n1. **Alumni Portal** - Quantum University's official alumni management system\n2. **QLRC Portal** - Digital library & resource management platform\n3. **Portfolio** - This 3D interactive site you're viewing!",
        "📚 Built 3 major projects: Alumni Portal (React/Node), QLRC Portal (React/MongoDB), and this 3D portfolio (Three.js)"
      ],
      experience: [
        "💼 Experience:\n• Built full-stack apps for Quantum University\n• Developed production-ready alumni management systems\n• Created interactive 3D web experiences",
        "🎯 Tarun has hands-on experience building real-world applications for university systems, handling both frontend and backend development."
      ],
      contact: [
        "📧 Tarun is actively looking for opportunities!\n• Open to: Frontend, Full Stack, React Developer roles\n• Status: Available for full-time & freelance\n• Best way: Connect via the contact form on this site!",
        "🤝 Let's connect! Tarun is seeking Frontend/Full Stack roles. Drop a message through the contact section!"
      ],
      education: [
        "🎓 Education:\n• Currently studying at Quantum University\n• Focus: Computer Science & Web Development\n• Location: India"
      ],
      default: [
        "I'd love to tell you more! Ask me specifically about:\n• 💻 Technical skills\n• 🛠️ Projects built\n• 💼 Work experience\n• 📧 Contact info",
        "Great question! I can share details about Tarun's skills, projects, experience, or how to contact him. What would you like to know?"
      ]
    };

    // Keyword matching
    if (lower.match(/skill|tech|stack|react|node|javascript|code/)) return responses.skills;
    if (lower.match(/project|portfolio|build|create|alumni|qlrc/)) return responses.projects;
    if (lower.match(/experience|work|job|career|company/)) return responses.experience;
    if (lower.match(/contact|hire|email|reach|connect|available/)) return responses.contact;
    if (lower.match(/education|study|university|college|degree/)) return responses.education;
    
    return responses.default;
  };

  const SYSTEM_PROMPT = `You are Tarun Panwar's AI assistant on his portfolio. Be extremely concise (1-2 sentences). 
Key facts: React/Node developer, Quantum University student, built Alumni Portal & QLRC Portal, open to work.`;

  const tryModel = async (model, userMessage, history) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.href,
        "X-Title": "Tarun Portfolio"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          userMessage
        ],
        max_tokens: 80,
        temperature: 0.7
      })
    });
    return response;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = messages.slice(-3).filter(m => m.role !== "system");

    // Try each model with 2-second delays
    for (let i = 0; i < MODELS.length; i++) {
      const model = MODELS[i];
      console.log(`Trying ${model}...`);
      
      try {
        const response = await tryModel(model, userMessage, history);
        
        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content;
          if (content) {
            setMessages(prev => [...prev, { role: "assistant", content }]);
            setIsLoading(false);
            return;
          }
        } else if (response.status === 429) {
          console.log(`${model} rate limited`);
          if (i < MODELS.length - 1) {
            await new Promise(r => setTimeout(r, 2000)); // Wait before next model
          }
        }
      } catch (err) {
        console.error(`${model} failed:`, err);
      }
    }

    // All models failed - use smart fallback
    console.log("All models failed, using offline response");
    const fallbackOptions = getSmartResponse(input);
    const randomResponse = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
    
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: randomResponse 
    }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    "What are your skills?",
    "Show me your projects",
    "Work experience?",
    "How to contact you?"
  ];

  return (
    <div className="chatbot-container">
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : <>🤖<span className="pulse-ring"></span></>}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-info">
              <span className="header-icon">🤖</span>
              <div>
                <h4>Tarun's Assistant</h4>
                <span className="status"><span className="status-dot"></span>Online</span>
              </div>
            </div>
            <button className="minimize-btn" onClick={() => setIsOpen(false)}>−</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
                <div className="message-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message assistant loading">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply, i) => (
              <button 
                key={i} 
                className="quick-reply-btn" 
                onClick={() => { setInput(reply); setTimeout(handleSend, 100); }}
                disabled={isLoading}
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about skills, projects, experience..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={!input.trim() || isLoading} className="send-btn">
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;