import ChatBox from '@/components/custom/chatbot/ChatBot'
import React from 'react'

const AIChatBotPage = () => {
  return (
    <div>
        <ChatBox endpoint={"/parent"} token={localStorage.getItem("parentToken")} />
    </div>
  )
}

export default AIChatBotPage