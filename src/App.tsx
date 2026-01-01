import { useRef, useState, type FormEvent } from "react";
import "./app.css"
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import OpenAI from "openai";

const openaiClient = new OpenAI({
  baseURL: "http://localhost:11434/v1/",
  apiKey: "ollama",
  dangerouslyAllowBrowser: true
});

function App() {

  // const [messages, setMessages] = useState<{ party: "ai" | "self", message: string }[]>([])

  const [_loading, setLoading] = useState(false)
  const promptInputRef = useRef<HTMLInputElement>(null)
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const prompt = new FormData(e.currentTarget).get('chat-prompt') as string
    if (!prompt || prompt === '') return;
    setLoading(true)
    const response = await openaiClient.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: prompt }
      ],
      model: "gemma3:1b"
    })
    const responseMessage = response.choices[0].message.content
    console.log(responseMessage)
    if (promptInputRef.current) promptInputRef.current.value = ""
    setLoading(false)
  }

  return (
    <div className="container">

      <div className="chatbox">
        <div className="title">
          <p>Multi-modal Chatbot</p>
        </div>
        <div className="chatarea">
          <SimpleBar style={{ height: "100%" }}>
            <div className="chats-container">
              <div className="message sent">Hello</div>
              <div className="message recieved">Hi, How can I help you?</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message sent">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
              <div className="message recieved">This is a long message just to test the UI if it overflows, gets wrapped, or the max width takes effect or not</div>
            </div>
          </SimpleBar>
        </div>
        <form onSubmit={sendMessage} className="chatinput">
          <input name="chat-prompt" type="text" placeholder="Type your prompt" ref={promptInputRef} />
          <button type="submit">Send {" >"}</button>
        </form>
      </div>

    </div>
  )
}

export default App
