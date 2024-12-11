import ChatBox from '@/components/custom/chatbot/ChatBot'
import React from 'react'

const AIChatBotPage = () => {
  return (
    <div>
        <ChatBox endpoint={"/admin"} token={localStorage.getItem("adminToken")} />
    </div>
  )
}

export default AIChatBotPage