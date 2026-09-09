import React, { useState, useRef, useEffect } from 'react';
import { useSound } from '../context/SoundContext';
import { Bot, X, Send, Sparkles, HelpCircle, MessageSquare, Terminal } from 'lucide-react';

export default function MartyBot() {
  const { playClick, playSuccess } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Greetings, Cyber Operator! I am Marty AI, your official Martinovation 2026 TechFest Assistant. Ask me anything about event schedules, venue maps, quest rules, or passes!"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "📅 Fest Dates & Schedule",
    "💻 24-Hour Hackathon Rules",
    "🤖 Robo Wars Prize Money",
    "🎤 Cosmic Star Night Artist",
    "📍 Campus Venue Map"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    playClick();
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInput('');

    // Generate Smart Answer
    setTimeout(() => {
      let reply = "I've checked the Martinovation database! ";
      const q = query.toLowerCase();

      if (q.includes('date') || q.includes('schedule') || q.includes('when') || q.includes('time')) {
        reply = "Martinovation 2026 will take place from Monday, October 5th to Friday, October 9th, 2026 at the Usha Martin University Campus, Ranchi!";
      } else if (q.includes('hackathon') || q.includes('code')) {
        reply = "The Genesis 24-Hour Hackathon kicks off on Oct 5 at 10:30 AM in the CS Innovation Lab. The grand prize is ₹1,00,000!";
      } else if (q.includes('robo') || q.includes('war') || q.includes('bot')) {
        reply = "Mech Clash Battle Bots takes place on Oct 6 at 11:00 AM in the Mechanical Arena (Prize: ₹75,000). Cyber-Sprint Robo Race happens on Oct 6 at 02:00 PM!";
      } else if (q.includes('star') || q.includes('night') || q.includes('artist') || q.includes('dj')) {
        reply = "Cosmic Star Night & DJ Arena takes place on Friday, Oct 9 starting at 06:00 PM on the Central Open Ground featuring live celebrity concerts and laser light shows!";
      } else if (q.includes('pass') || q.includes('ticket') || q.includes('entry') || q.includes('fee')) {
        reply = "You can generate your custom Holographic Digital Pass with QR Code directly in the 'Digital Pass' section of this portal!";
      } else if (q.includes('venue') || q.includes('location') || q.includes('map') || q.includes('where')) {
        reply = "Events are held at Usha Martin University Campus, Angara, Ranchi. Check out the interactive 'Campus Map' section on this page!";
      } else {
        reply = `For inquiries regarding '${query}', please reach out to our student president Abhishek Sharma or fest convener Prof. Alok Kumar at info@umutechfest.co.in!`;
      }

      playSuccess();
      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    }, 400);
  };

  return (
    <div id="ai-companion" className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            playClick();
            setIsOpen(true);
          }}
          className="cyber-button p-4 bg-gradient-to-tr from-cyan-400 via-purple-600 to-yellow-400 text-black font-orbitron font-extrabold rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.5)] flex items-center gap-2 hover:scale-110 transition-transform"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="hidden md:inline text-xs uppercase tracking-wider">MARTY AI</span>
        </button>
      )}

      {/* Expanded Chat Modal Window */}
      {isOpen && (
        <div className="w-[90vw] max-w-sm md:max-w-md h-[500px] cyber-box border border-cyan-500/50 rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.3)] overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#070b14] border-b border-cyan-500/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-950 border border-cyan-400/50 rounded-xl text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-orbitron font-black text-sm text-slate-100 uppercase flex items-center gap-2">
                  <span>MARTY AI</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                </div>
                <div className="font-orbitron text-[9px] text-cyan-400 tracking-wider">
                  CYBER FEST COMPANION
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                setIsOpen(false);
              }}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-black font-semibold rounded-br-none'
                      : 'bg-slate-900 border border-cyan-500/30 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chip Prompts */}
          <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-[10px] font-orbitron text-cyan-300 hover:border-cyan-400 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#070b14] border-t border-cyan-500/20 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Marty AI anything..."
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 bg-cyan-400 text-black rounded-xl hover:bg-cyan-300 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
