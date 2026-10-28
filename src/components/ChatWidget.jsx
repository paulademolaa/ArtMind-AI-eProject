// ------------------------------------------------------------
// ChatWidget — the round AI Assistant button fixed to the
// bottom-right corner of every page. Clicking it opens a small
// chat window, so users can ask a question without leaving the page.
// It uses the same getAssistantReply() as the full Assistant page.
// ------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { getAssistantReply } from '../utils/fakeAI';
import './ChatWidget.css';

const quickQuestions = ['Recommend landscape paintings.', 'Show me paintings with blue color themes.', 'What is abstract expressionism?'];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null); // used to scroll to the newest message

  function sendMessage(text) {
    if (!text.trim() || typing) return;
    setMessages((old) => [...old, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    // Pretend the AI is thinking for a moment.
    setTimeout(() => {
      const reply = getAssistantReply(text);
      setMessages((old) => [...old, { from: 'ai', text: reply.text, artworks: reply.artworks }]);
      setTyping(false);
    }, 900);
  }

  // Scroll to the newest message.
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ block: 'nearest' });
  }, [messages, typing, open]);

  // Close the window with the Escape key.
  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="chat-widget">
      {/* ---- The small chat window ---- */}
      {open && (
        <div className="chat-widget-panel" role="dialog" aria-label="ArtMind Assistant">
          <header className="chat-widget-header">
            <span className="chat-avatar">
              <Icon name="sparkle" size={14} />
            </span>
            <div>
              <strong>ArtMind Assistant</strong>
              <p>Ask about paintings, artists or styles</p>
            </div>
            <Link to="/ai/assistant" className="chat-widget-expand" aria-label="Open full assistant" title="Open full assistant">
              <Icon name="arrowUpRight" size={16} />
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <Icon name="close" size={18} />
            </button>
          </header>

          <div className="chat-widget-body">
            {messages.length === 0 && (
              <div className="chat-widget-welcome">
                <p>Hi! What would you like to know? Try one of these:</p>
                {quickQuestions.map((question) => (
                  <button key={question} className="chip" onClick={() => sendMessage(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, index) =>
              message.from === 'user' ? (
                <p key={index} className="chat-widget-user">
                  {message.text}
                </p>
              ) : (
                <div key={index} className="chat-widget-ai">
                  <p>{message.text}</p>
                  {message.artworks.length > 0 && (
                    <div className="chat-widget-artworks">
                      {message.artworks.map((art) => (
                        <Link key={art.id} to={`/artwork/${art.id}`} onClick={() => setOpen(false)}>
                          <img src={art.image} alt="" />
                          <span>{art.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}

            {typing && (
              <span className="typing chat-widget-typing">
                <span />
                <span />
                <span />
              </span>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="chat-widget-input" onSubmit={handleSubmit}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question…" aria-label="Message" />
            <button type="submit" disabled={!input.trim()} aria-label="Send message">
              <Icon name="send" size={16} />
            </button>
          </form>
        </div>
      )}

      {/* ---- The round button ---- */}
      <button
        className={open ? 'chat-widget-button open' : 'chat-widget-button'}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
        aria-expanded={open}
      >
        <Icon name={open ? 'close' : 'chat'} size={24} />
        {!open && <span className="chat-widget-label">Ask AI</span>}
      </button>
    </div>
  );
}

export default ChatWidget;
