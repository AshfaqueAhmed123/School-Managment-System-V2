import ChatBox from '@/components/custom/chatbot/ChatBot'
import React from 'react'

const AIChatBotPage = () => {
  return (
    <div>
        <ChatBox endpoint={"/teacher"} token={localStorage.getItem("teacherToken")}/>
    </div>
  )
}

export default AIChatBotPage