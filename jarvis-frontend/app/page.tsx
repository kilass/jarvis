"use client";

import React, { useState, useRef, useEffect } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantText: string = data?.text ?? "(no response)";
      const assistantMessage: Message = { role: "assistant", content: assistantText };
      setMessages((m) => [...m, assistantMessage]);
    } catch (err) {
      console.error("Chat error", err);
      const errMsg: Message = { role: "assistant", content: "Erreur: impossible de contacter le serveur." };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-bg-primary font-sans text-text-primary">
      <header className="border-b border-border-accent/50 px-6 py-4 text-lg font-semibold shrink-0">
        Jarvis — Chat
      </header>

      <main className="flex-grow overflow-y-auto px-6 py-4">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
          {messages.length === 0 && (
            <div className="text-center text-sm text-text-secondary animate-fade-in">Commencez la conversation en envoyant un message.</div>
          )}

          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
              <div
                className={`max-w-[80%] px-4 py-3 text-base ${ 
                  m.role === "user"
                    ? "bg-bubble-gradient rounded-2xl rounded-br-sm text-gray-100"
                    : "bg-bg-secondary border border-border-primary rounded-2xl rounded-bl-sm text-text-primary"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="border-t border-border-accent/50 p-6 shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-end gap-3">
            <textarea
              className="w-full resize-none rounded-md bg-bg-secondary border border-border-primary p-3 text-base text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:shadow-neon-accent transition-all duration-300"
              placeholder="Tapez votre message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />

            <button
              className={`h-10 rounded-md px-4 text-sm font-medium text-white transition-colors ${loading ? "bg-zinc-600" : "bg-accent-primary hover:bg-accent-primary/90"}`}
              onClick={() => sendMessage()}
              disabled={loading}
            >
              {loading ? "..." : "Envoyer"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
