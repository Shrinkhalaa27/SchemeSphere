import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../utils/api';

const chatStyles = `
.chatbot-fab {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 300;
  width: 58px; height: 58px; border-radius: 18px;
  background: linear-gradient(135deg, var(--teal), var(--indigo));
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 32px rgba(0,212,180,0.4), 0 4px 16px rgba(0,0,0,0.3);
  transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
}
.chatbot-fab:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(0,212,180,0.5); }
.chatbot-fab .fab-badge {
  position: absolute; top: -4px; right: -4px; width: 14px; height: 14px;
  background: var(--saffron); border-radius: 50%;
  border: 2px solid var(--navy); animation: pulse 2s infinite;
}
.chatbot-window {
  position: fixed; bottom: 6.5rem; right: 2rem; z-index: 300;
  width: 380px; max-height: 600px;
  background: var(--navy2); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  animation: chatPop 0.3s cubic-bezier(.34,1.56,.64,1);
  display: flex; flex-direction: column;
}
.chat-header {
  padding: 1.1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.07);
  background: linear-gradient(135deg, rgba(0,212,180,0.08), rgba(79,110,247,0.06));
  display: flex; align-items: center; gap: 0.8rem;
}
.chat-avatar {
  width: 36px; height: 36px; border-radius: 12px;
  background: linear-gradient(135deg, var(--teal), var(--indigo));
  display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
}
.chat-header-info { flex: 1; }
.chat-header-name { font-family: var(--font-head); font-size: 0.9rem; font-weight: 700; }
.chat-header-status { font-size: 0.68rem; color: var(--teal); display: flex; align-items: center; gap: 0.3rem; }
.chat-header-status::before { content: ''; width: 5px; height: 5px; background: var(--teal); border-radius: 50%; display: inline-block; }
.chat-close { background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 0.25rem; border-radius: 8px; transition: all 0.2s; }
.chat-close:hover { background: rgba(255,255,255,0.08); color: var(--text); }
.chat-messages {
  flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.9rem;
  max-height: 400px;
}
.chat-messages::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
.chat-msg { display: flex; gap: 0.6rem; animation: slideUp 0.2s ease; }
.chat-msg.user { flex-direction: row-reverse; }
.msg-avatar { width: 28px; height: 28px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0; }
.bot-avatar { background: linear-gradient(135deg, var(--teal), var(--indigo)); }
.user-avatar { background: rgba(255,255,255,0.1); color: var(--muted); }
.msg-bubble {
  max-width: 78%; padding: 0.7rem 0.95rem;
  border-radius: 14px; font-size: 0.84rem; line-height: 1.65;
}
.bot-bubble {
  background: rgba(255,255,255,0.06); color: var(--text);
  border: 1px solid rgba(255,255,255,0.07); border-top-left-radius: 4px;
}
.user-bubble {
  background: linear-gradient(135deg, rgba(0,212,180,0.18), rgba(79,110,247,0.15));
  color: var(--text); border: 1px solid rgba(0,212,180,0.2); border-top-right-radius: 4px;
}
.msg-bubble strong { color: var(--teal); }
.typing-indicator { display: flex; align-items: center; gap: 4px; padding: 0.5rem 0; }
.typing-dot { width: 6px; height: 6px; background: var(--muted); border-radius: 50%; }
.typing-dot:nth-child(1) { animation: typingDot 1.2s 0s infinite; }
.typing-dot:nth-child(2) { animation: typingDot 1.2s 0.2s infinite; }
.typing-dot:nth-child(3) { animation: typingDot 1.2s 0.4s infinite; }
.chat-quick-btns { padding: 0 1.25rem 0.75rem; display: flex; gap: 0.4rem; flex-wrap: wrap; }
.quick-btn {
  padding: 0.3rem 0.7rem; border-radius: 100px;
  border: 1px solid rgba(0,212,180,0.2); background: rgba(0,212,180,0.06);
  color: var(--teal); font-size: 0.72rem; font-weight: 500; cursor: pointer;
  transition: all 0.15s;
}
.quick-btn:hover { background: rgba(0,212,180,0.14); }
.chat-input-row {
  padding: 1rem 1.25rem; border-top: 1px solid rgba(255,255,255,0.07);
  display: flex; gap: 0.6rem; align-items: flex-end;
}
.chat-input {
  flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  color: var(--text); padding: 0.6rem 0.9rem; border-radius: 12px;
  font-family: var(--font-body); font-size: 0.84rem; outline: none; resize: none;
  transition: border-color 0.2s; line-height: 1.4; max-height: 90px; overflow-y: auto;
}
.chat-input:focus { border-color: rgba(0,212,180,0.4); }
.chat-input::placeholder { color: rgba(123,139,178,0.6); }
.chat-send {
  width: 36px; height: 36px; border-radius: 11px;
  background: linear-gradient(135deg, var(--teal), #00a892);
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; flex-shrink: 0;
  color: #060d1f;
}
.chat-send:hover { transform: scale(1.08); }
.chat-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
@media(max-width:480px) { .chatbot-window { width: calc(100vw - 2rem); right: 1rem; bottom: 5.5rem; } .chatbot-fab { right: 1rem; } }
`;

const QUICK_PROMPTS = ['Farmer schemes', 'Girl child', 'Startup loans', 'Health coverage', 'Scholarships'];

const WELCOME = { role: 'assistant', content: "Namaste! 🙏 I'm **SchemeBot**, your guide to Indian government schemes.\n\nTell me about yourself — are you a **farmer**, **student**, **entrepreneur**, or looking for **health/housing** benefits? I'll help you find the right schemes in seconds!" };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); inputRef.current?.focus(); }
  }, [open, messages]);

  const formatMsg = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
  };

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const data = await sendChatMessage(newMessages.map(m => ({ role: m.role, content: m.content })));
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or email us at 2330403@kiit.ac.in" }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{chatStyles}</style>

      {open && (
        <div className="chatbot-window">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-header-info">
              <div className="chat-header-name">SchemeBot AI</div>
              <div className="chat-header-status">Online · Powered by Claude</div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === 'user' ? 'user' : ''}`}>
                <div className={`msg-avatar ${m.role === 'user' ? 'user-avatar' : 'bot-avatar'}`}>
                  {m.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className={`msg-bubble ${m.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}
                  dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }} />
              </div>
            ))}
            {loading && (
              <div className="chat-msg">
                <div className="msg-avatar bot-avatar">🤖</div>
                <div className="msg-bubble bot-bubble">
                  <div className="typing-indicator">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 && (
            <div className="chat-quick-btns">
              {QUICK_PROMPTS.map(p => (
                <button key={p} className="quick-btn" onClick={() => send(p)}>{p}</button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask about any scheme..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={1}
            />
            <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      <button className="chatbot-fab" onClick={() => setOpen(o => !o)} title="Chat with SchemeBot">
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
        {!open && <div className="fab-badge" />}
      </button>
    </>
  );
}
