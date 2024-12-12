import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const typingDelay = 100; // Milliseconds between each word

function formatResponse(rawText) {
  let formattedText = rawText;

  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

  formattedText = formattedText.replace(/\n/g, "<br/>");

  formattedText = formattedText.replace(/`(.*?)`/g, "<code class='bg-gray-800 text-white p-1 rounded'>{$1}</code>");

  return formattedText;
}

const ChatBox = ({ endpoint, token }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("generate a random quote");
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // T

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

    // Add a placeholder message that simulates the bot typing
    setIsProcessing(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Bot is typing...", sender: "bot", placeholder: true }, // Placeholder message
    ]);

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
        setMessages((prevMessages) => {
          // Remove the placeholder and add the actual response
          return prevMessages.filter(msg => !msg.placeholder).concat({ text: frmtxt, sender: "bot" });
        });
        setIsProcessing(false); // Turn off the typing animation
        setIsTyping(false);
      }, typingDelay * 5);
    })();
  };

  return (
    <div className="w-full h-screen bg-[#2E2E48] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#383854] rounded-lg shadow-xl flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-[#2E2E48] border-b border-[#383854] flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chatbot</h2>
        </div>

        {/* Chat Messages Container */}
        <div
          className="p-6 flex-1 space-y-4 overflow-y-auto"
          style={{ maxHeight: "70vh" }}
        >
          {messages.map((msg, index) => (
            <MessageBubble key={index} text={msg.text} sender={msg.sender} isProcessing={msg.placeholder} />
          ))}
          <div ref={chatEndRef} /> { }
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

const MessageBubble = ({ text, sender, isProcessing }) => {
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
        className={`max-w-xs p-3 rounded-lg ${isUser ? "bg-indigo-600 text-white" : "bg-[#383854] text-white"
          } transition-all transform hover:scale-105`}
      >
        {isProcessing ? (
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-200"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-400"></div>
          </div>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBox;
