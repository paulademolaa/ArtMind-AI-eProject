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

// Earlier conversations shown in the left column (click one to ask it again).
const pastChats = {
  Today: ['Blue colour themes', 'Oil vs watercolour'],
  'This week': ['Abstract expressionism', 'Landscapes for a living room', 'Who was Mary Cassatt?'],
};

// The time now, e.g. "10:42" (shown under each message)
const timeNow = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

function Assistant() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null); // used to scroll to the newest message

  function sendMessage(text) {
    if (!text.trim() || typing) return;
    const userMessage = { from: 'user', text, time: timeNow() };
    setMessages((old) => [...old, userMessage]);
    setInput('');
    setTyping(true);

    // Pretend the AI is thinking for 1 second.
    setTimeout(() => {
      const reply = getAssistantReply(text);
      setMessages((old) => [...old, { from: 'ai', text: reply.text, artworks: reply.artworks, question: text, time: timeNow() }]);
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

  const [copied, setCopied] = useState(false);

  // Copy the conversation as text so it can be shared.
  function shareChat() {
    const text = messages.map((message) => (message.from === 'user' ? 'You: ' : 'ArtMind: ') + message.text).join('\n\n');
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // All artworks mentioned in the conversation (for the side panel).
  const mentioned = messages.flatMap((message) => message.artworks || []);

  return (
    <PageLayout hideFooter hideChat>
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
          {Object.entries(pastChats).map(([day, chats]) => (
            <div key={day}>
              {day !== 'Today' && <p className="side-label">{day}</p>}
              {chats.map((chat) => (
                <button key={chat} className="history-item" onClick={() => sendMessage(chat)}>
                  <Icon name="chat" size={14} /> {chat}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* ---- Middle: the chat ---- */}
        <section className="chat">
          <header className="chat-header">
            <span className="chat-avatar">
              <Icon name="robot" size={18} />
            </span>
            <div>
              <strong>ArtMind Assistant</strong>
              <p className="muted small">Answers about paintings, artists, styles and techniques</p>
            </div>
            {messages.length > 0 && (
              <div className="chat-header-actions">
                <button onClick={shareChat} aria-label="Share conversation" title={copied ? 'Copied!' : 'Share'}>
                  <Icon name={copied ? 'check' : 'send'} size={18} />
                </button>
                <button onClick={() => setMessages([])} aria-label="Delete conversation" title="Delete">
                  <Icon name="trash" size={18} />
                </button>
              </div>
            )}
          </header>

          <div className="chat-thread">
            {/* Welcome screen before the first message */}
            {messages.length === 0 && (
              <div className="chat-welcome">
                <span className="chat-avatar big">
                  <Icon name="robot" size={34} />
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
                <div key={index} className="msg-user-wrap">
                  <p className="msg-user">{message.text}</p>
                  <span className="msg-time">You · {message.time}</span>
                </div>
              ) : (
                <div key={index} className="msg-ai">
                  <span className="chat-avatar">
                    <Icon name="robot" size={18} />
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
                    {message.artworks.length > 0 && (
                      <Link to={`/ai/search?q=${encodeURIComponent(message.question)}`} className="msg-see-all">
                        See all matching paintings <Icon name="arrowRight" size={14} />
                      </Link>
                    )}
                    <span className="msg-time">ArtMind Assistant · {message.time}</span>
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="msg-ai">
                <span className="chat-avatar">
                  <Icon name="robot" size={18} />
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
              <Icon name="arrowUpRight" size={16} className="context-arrow" />
            </Link>
          ))}
          <div className="chat-tip">
            <strong>Tip</strong>
            <p>
              Upload a photo in <Link to="/ai/recognition">Image Recognition</Link> to ask “what style is this?” — it uses the same AI as
              this assistant.
            </p>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}

export default Assistant;
