import { useRef, useState, type FormEvent } from "react";
import "./app.css"
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import OpenAI from "openai";
import Markdown from 'react-markdown'

const openaiClient = new OpenAI({
  baseURL: "http://localhost:11434/v1/",
  apiKey: "ollama",
  dangerouslyAllowBrowser: true
});

// #region MAIN
function App() {

  const [messages, setMessages] = useState<{ party: "ai" | "self", content: string }[]>([])

  const [loading, setLoading] = useState(false)
  const promptInputRef = useRef<HTMLInputElement>(null)

  // #region Submit
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Basic validation
    const prompt = new FormData(e.currentTarget).get('chat-prompt') as string
    if (!prompt || prompt === '') return;
    // Add user prompt to messages state
    setMessages(prev => ([...prev, { party: "self", content: prompt }]))
    // Clear the prompt input
    if (promptInputRef.current) promptInputRef.current.value = ""
    setLoading(true)
    // Send request to api via sdk
    const stream = await openaiClient.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant, which always replies in markdown" },
        { role: "user", content: prompt }
      ],
      model: "gemma3:1b",
      stream: true
    })
    // Read response stream and set messages state
    let responseMessage = ""
    setMessages(prev => ([...prev, { party: "ai", content: responseMessage }]))
    for await (const event of stream) {
      const responseMessageChunk = event.choices[0].delta.content
      if (responseMessageChunk) {
        responseMessage += responseMessageChunk
        setMessages(prev => {
          const temp = [...prev]
          temp[temp.length - 1]["content"] = responseMessage
          return temp;
        })
      }
    }
    setLoading(false)
  }

  // #region JSX
  return (
    <div className="container">

      <div className="chatbox">
        <div className="title">
          <p>Multi-modal Chatbot</p>
        </div>
        <div className="chatarea">
          <SimpleBar style={{ height: "100%" }}>
            <div className="chats-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.party === "self" ? "sent" : "recieved"}`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              ))}
            </div>
          </SimpleBar>
        </div>
        <form onSubmit={sendMessage} className="chatinput">
          <input autoComplete="off" name="chat-prompt" type="text" placeholder="Type your prompt" ref={promptInputRef} />
          <button type="submit" disabled={loading}>Send {" >"}</button>
        </form>
      </div>

    </div>
  )
}

export default App
