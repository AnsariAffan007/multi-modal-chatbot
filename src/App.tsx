import "./app.css"
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

function App() {

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
        <div className="chatinput">
          <input name="chat-prompt" type="text" placeholder="Type your prompt" />
          <button>Send {" >"}</button>
        </div>
      </div>

    </div>
  )
}

export default App
