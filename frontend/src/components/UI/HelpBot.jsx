import React, { useState } from 'react';

const HelpBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`help-bot-container ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="chat-bubble">
          <p>Hi! I'm EchoBot. Need help tuning your digital twin?</p>
        </div>
      )}
      <div className="bot-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src="/assets/emotion_echo_bot_1780327959689.png" alt="Help Bot" />
        <div className="bot-glow"></div>
      </div>
    </div>
  );
};

export default HelpBot;
