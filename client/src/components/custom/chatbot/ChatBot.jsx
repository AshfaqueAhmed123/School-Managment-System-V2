import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Typing animation delay
const typingDelay = 100; // Milliseconds between each word

function formatResponse(rawText) {
  return rawText;
}

const ChatBox = ({ endpoint, token }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("hello");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message and bot's typing response
  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);
    setInput("");

    // Bot response with typing effect
    setIsTyping(true);
    (async () => {
      let res = await fetch(
        `http://localhost:4000/AI/conversation/${endpoint}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: input,
          }),
        }
      );

      res = await res.json();
      let frmtxt = formatResponse(res?.data);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: frmtxt, sender: "bot" },
        ]);
        setIsTyping(false);
      }, typingDelay * 5); // Adjust delay as needed for the bot response
    })();
  };

  return (
    <div className="w-full h-screen bg-[#2E2E48] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#383854] rounded-lg overflow-hidden shadow-xl flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-[#2E2E48] border-b border-[#383854] flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chatbot</h2>
        </div>

        {/* Chat Messages */}
        <div className="p-6 h-[400px] overflow-y-auto space-y-4 flex-1">
          {messages.map((msg, index) => (
            <MessageBubble key={index} text={msg.text} sender={msg.sender} />
          ))}
          <div ref={chatEndRef} /> {/* This is the scroll-to-bottom anchor */}
        </div>

        {/* Input Area */}
        <div className="flex items-center p-4 space-x-2 bg-[#2E2E48] border-t border-[#383854]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 rounded-full border border-[#383854] bg-[#383854] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            placeholder="Type your message..."
          />
          <motion.button
            onClick={handleSend}
            className="p-3 bg-indigo-600 text-white rounded-full transition-transform transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} space-x-2`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isUser ? "bg-indigo-600 text-white" : "bg-[#383854] text-white"
        } transition-all transform hover:scale-105`}
      >
        <p>{text}</p>
      </div>
    </motion.div>
  );
};

export default ChatBox;
