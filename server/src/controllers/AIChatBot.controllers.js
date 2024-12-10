import ApiError from "../utils/ApiError.utils.js"
import ApiResponse from "../utils/ApiResponse.utils.js"
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const conversation = async (req,res) => {
    try {
        let {question} = req.body;
        if(!question || question.trim() == ""){
            return res.status(400).json(
                new ApiError(400,"provide a proper question")
            )
        }
        res.status(200).json(
            new ApiResponse(200,"all is running good!",await main(question))
        )
    } catch (error) {
        return res.status(error?.status || 500).json(
            new ApiError(error?.status || 500 , error?.message || "something went wrong")
        )
    }
}

async function main(question="") {
  const chatCompletion = await getGroqChatCompletion(question);
  // Print the completion returned by the LLM.
  return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(question) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export {conversation}