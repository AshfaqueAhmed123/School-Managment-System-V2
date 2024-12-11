import ChatBox from '@/components/custom/chatbot/ChatBot'
import React from 'react'

const ATChatBotPage = () => {
  return (
    <div>
        <ChatBox endpoint={"/student"} token={localStorage.getItem("studentToken")}/>
    </div>
  )
}

export default ATChatBotPage