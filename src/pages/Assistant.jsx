// ------------------------------------------------------------
// AI Art Assistant — /ai/assistant  (a simple chatbot)
// Messages are kept in an array in state:
//   { from: 'user' | 'ai', text: '...', artworks: [...] }
// When you send a message we add it, wait a moment, then add the
// reply from getAssistantReply() in utils/fakeAI.js.
// ------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Icon from '../components/Icon';
import { getAssistantReply } from '../utils/fakeAI';
import './Assistant.css';

const starterQuestions = [
  'What is abstract expressionism?',
  'Show me paintings with blue color themes.',
  'Explain the difference between oil and watercolor paintings.',
  'Recommend landscape paintings.',
];

function Assistant() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null); // used to scroll to the newest message

  function sendMessage(text) {
    if (!text.trim() || typing) return;
    const userMessage = { from: 'user', text };
    setMessages((old) => [...old, userMessage]);
    setInput('');
    setTyping(true);

    // Pretend the AI is thinking for 1 second.
    setTimeout(() => {
      const reply = getAssistantReply(text);
      setMessages((old) => [...old, { from: 'ai', text: reply.text, artworks: reply.artworks }]);
      setTyping(false);
    }, 1000);
  }

  // If we arrived with ?q=..., ask that question automatically (only once).
  const askedFromLink = useRef(false);
  useEffect(() => {
    const question = searchParams.get('q');
    if (question && !askedFromLink.current) {
      askedFromLink.current = true;
      sendMessage(question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll down whenever a new message appears.
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typing]);

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  // All artworks mentioned in the conversation (for the side panel).
  const mentioned = messages.flatMap((message) => message.artworks || []);

  return (
    <PageLayout hideFooter>
      <div className="assistant">
        {/* ---- Left: conversation history ---- */}
        <aside className="chat-history">
          <button className="btn btn-outline new-chat" onClick={() => setMessages([])}>
            <Icon name="chat" size={16} /> New conversation
          </button>
          <p className="side-label">Today</p>
          <p className="history-item active">
            <Icon name="chat" size={14} /> {messages[0] ? messages[0].text.slice(0, 28) + '…' : 'New conversation'}
          </p>
          <p className="side-label">This week</p>
          <p className="history-item">
            <Icon name="chat" size={14} /> Who was Mary Cassatt?
          </p>
          <p className="history-item">
            <Icon name="chat" size={14} /> Landscapes for a living room
          </p>
        </aside>

        {/* ---- Middle: the chat ---- */}
        <section className="chat">
          <header className="chat-header">
            <span className="chat-avatar">
              <Icon name="sparkle" size={16} />
            </span>
            <div>
              <strong>ArtMind Assistant</strong>
              <p className="muted small">Answers about paintings, artists, styles and techniques</p>
            </div>
          </header>

          <div className="chat-thread">
            {/* Welcome screen before the first message */}
            {messages.length === 0 && (
              <div className="chat-welcome">
                <span className="chat-avatar big">
                  <Icon name="sparkle" size={26} />
                </span>
                <h2>What would you like to know?</h2>
                <p className="muted">Ask about painting styles, techniques or artists — or let me recommend something to look at.</p>
                <div className="starter-grid">
                  {starterQuestions.map((question) => (
                    <button key={question} className="starter" onClick={() => sendMessage(question)}>
                      <Icon name="chat" size={16} /> {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) =>
              message.from === 'user' ? (
                <p key={index} className="msg-user">
                  {message.text}
                </p>
              ) : (
                <div key={index} className="msg-ai">
                  <span className="chat-avatar">
                    <Icon name="sparkle" size={14} />
                  </span>
                  <div>
                    <p>{message.text}</p>
                    {message.artworks.length > 0 && (
                      <div className="msg-artworks">
                        {message.artworks.map((art) => (
                          <Link key={art.id} to={`/artwork/${art.id}`} className="msg-artwork">
                            <img src={art.image} alt="" />
                            <strong>{art.title}</strong>
                            <span className="muted small">{art.artist}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="msg-ai">
                <span className="chat-avatar">
                  <Icon name="sparkle" size={14} />
                </span>
                <span className="typing">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            {messages.length > 0 && (
              <div className="chat-suggestions">
                {starterQuestions.slice(0, 3).map((question) => (
                  <button type="button" key={question} className="chip" onClick={() => sendMessage(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}
            <div className="chat-input-row">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about a painting, artist or style…"
                aria-label="Message"
              />
              <button type="submit" className="send-button" aria-label="Send message" disabled={!input.trim()}>
                <Icon name="send" size={18} />
              </button>
            </div>
            <p className="muted small">ArtMind Assistant can make mistakes. Artwork facts link to the verified catalogue.</p>
          </form>
        </section>

        {/* ---- Right: artworks mentioned ---- */}
        <aside className="chat-context">
          <p className="side-label">Mentioned in this chat</p>
          {mentioned.length === 0 && <p className="muted small">Artworks the assistant recommends will appear here.</p>}
          {mentioned.map((art, index) => (
            <Link key={art.id + index} to={`/artwork/${art.id}`} className="context-item">
              <img src={art.image} alt="" />
              <div>
                <strong>{art.title}</strong>
                <p className="muted small">
                  {art.artist} · {art.date}
                </p>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </PageLayout>
  );
}

export default Assistant;
