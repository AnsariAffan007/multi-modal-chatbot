import { useEffect, useRef, useState } from "react";
import "./app.css"
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import OpenAI from "openai";
import Markdown from 'react-markdown'
import SimplebarCore from "simplebar"
import useSubmit from "./hooks/useSubmit";

// #region MAIN
function App() {

  const [messages, setMessages] = useState<{ party: "ai" | "self", content: string }[]>([])
  const [history, setHistory] = useState<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>([])

  const [loading, setLoading] = useState(false)
  const promptInputRef = useRef<HTMLInputElement>(null)

  // #region Scroll
  const simplebarRef = useRef<SimplebarCore>(null)
  const scrollToBottom = () => {
    const scrollEl = simplebarRef.current?.getScrollElement()
    if (scrollEl) {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = useSubmit(setMessages, history, setHistory, setLoading, promptInputRef, scrollToBottom)

  // #region JSX
  return (
    <div className="container">

      <div className="chatbox">
        <div className="title">
          <p>Multi-modal Chatbot</p>
        </div>
        <div className="chatarea">
          <SimpleBar style={{ height: "100%" }} ref={simplebarRef}>
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
