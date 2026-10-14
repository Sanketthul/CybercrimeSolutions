import React, { useEffect, useRef, useState } from "react";
import api from "../../api";
import "./Cbot.css";

const quickQuestions = [
  "I lost money in a UPI scam",
  "How do I report cybercrime in India?",
  "How can I identify phishing?",
];

const welcomeMessage = {
  id: "welcome",
  sender: "bot",
  text: "Hi! I'm your Cyber Safety Assistant. I can help with online fraud, phishing, hacked accounts, identity theft and reporting cybercrime in India.\n\nWhat would you like help with? Please don't share passwords, OTPs, PINs or banking details.",
};

export function Cbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isSending]);

  const sendMessage = async (value = input) => {
    const text = value.trim();

    if (!text || isSending) return;

    const userMessage = {
      id: `user-${nextId.current++}`,
      sender: "user",
      text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setIsSending(true);

    const history = updatedMessages
      .filter((message) => message.id !== "welcome")
      .slice(-12)
      .map((message) => ({
        role: message.sender === "user" ? "user" : "model",
        text: message.text,
      }));

    try {
      const response = await api.post(
        "/api/chat",
        { messages: history },
        { timeout: 50000 },
      );

      const reply = response.data?.reply;

      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error(
          "The assistant returned an empty response. Please try again.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: `bot-${nextId.current++}`,
          sender: "bot",
          text: reply.trim(),
        },
      ]);
    } catch (requestError) {
      const status = requestError.response?.status;
      const serverMessage = requestError.response?.data?.error;

      setError(
        serverMessage ||
          (status === 429
            ? "Too many requests. Please wait a moment and try again."
            : "Couldn't connect to the assistant. Check that the backend is running and try again."),
      );
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const startNewChat = () => {
    setMessages([{ ...welcomeMessage }]);
    setInput("");
    setError("");
    nextId.current = 1;
  };

  return (
    <div className="cyberbot-widget">
      {isOpen && (
        <section
          className="gemini-chat-panel"
          aria-label="Cyber Safety Assistant"
        >
          <header className="gemini-chat-header">
            <div className="gemini-chat-logo" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <div className="gemini-chat-title">
              <strong>Cyber Safety Assistant</strong>
              <span>
                <i /> Powered by Gemini AI
              </span>
            </div>

            <button
              className="gemini-icon-button"
              type="button"
              onClick={startNewChat}
              aria-label="Start a new chat"
              title="New chat"
            >
              ↻
            </button>

            <button
              className="gemini-icon-button"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              title="Close"
            >
              ×
            </button>
          </header>

          <div
            className="gemini-chat-messages"
            role="log"
            aria-label="Conversation"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`gemini-message gemini-message-${message.sender}`}
              >
                {message.sender === "bot" && (
                  <span className="gemini-message-avatar" aria-hidden="true">
                    S
                  </span>
                )}

                <div className="gemini-message-bubble">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="gemini-message gemini-message-bot">
                <span className="gemini-message-avatar" aria-hidden="true">
                  S
                </span>
                <div
                  className="gemini-message-bubble gemini-typing"
                  aria-label="Assistant is typing"
                >
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="gemini-quick-questions">
              <span>TRY ASKING</span>

              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  disabled={isSending}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="gemini-chat-error" role="alert">
              {error}
            </p>
          )}

          <form
            className="gemini-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a cyber safety question..."
              aria-label="Your message"
              maxLength={2000}
              autoComplete="off"
              disabled={isSending}
            />

            <button
              type="submit"
              disabled={!input.trim() || isSending}
              aria-label="Send message"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>

          <p className="gemini-chat-disclaimer">
            General information only. Never share passwords, OTPs, PINs or
            banking details.
          </p>
        </section>
      )}

      <button
        className={`gemini-chat-launcher${isOpen ? " is-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={
          isOpen
            ? "Close Cyber Safety Assistant"
            : "Open Cyber Safety Assistant"
        }
        aria-expanded={isOpen}
        title={isOpen ? "Close chat" : "Chat with Cyber Safety Assistant"}
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
