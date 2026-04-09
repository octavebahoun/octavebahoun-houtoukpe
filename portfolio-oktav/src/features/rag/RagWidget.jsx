import { useState, useRef, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'

// Simulated RAG response (replace with real API call)
const mockResponses = {
  default: "Je suis l'assistant IA d'Oktav. Je connais ses projets, compétences et parcours. Pose-moi ta question !",
  projets: "Oktav a réalisé 4 projets phares : StudyNotes (React + Node + Groq + PWA), LE TWIN (React + Laravel Sanctum), Excellence Team (React + Three.js), et Koki's by Juju (HTML/CSS + Vanilla JS).",
  competences: "Oktav maîtrise React, Node.js, Python, Three.js, GSAP, Laravel, PostgreSQL, Docker, et l'IA (RAG, ML). Il est Fullstack Engineer en transition vers la Data & IA.",
  contact: "Tu peux contacter Oktav par email à oktav@example.com ou via WhatsApp. Il répond toujours !",
  rag: "Le RAG de ce portfolio utilise Node.js/Express en backend, Pinecone comme base vectorielle, et Groq ou OpenRouter comme LLM. Le tout est déployé sur Render pour un serveur persistant.",
}

function getResponse(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('projet') || lower.includes('réalisation') || lower.includes('work')) return mockResponses.projets
  if (lower.includes('compétence') || lower.includes('skill') || lower.includes('stack') || lower.includes('techno')) return mockResponses.competences
  if (lower.includes('contact') || lower.includes('email') || lower.includes('joindre')) return mockResponses.contact
  if (lower.includes('rag') || lower.includes('ia') || lower.includes('assistant') || lower.includes('back')) return mockResponses.rag
  return mockResponses.default
}

export default function RagWidget() {
  const { ragOpen, toggleRag, closeRag, ragMessages, addRagMessage, clearRagMessages, ragLoading, setRagLoading } = useStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const hasGreeted = useRef(false)

  useEffect(() => {
    if (ragOpen && !hasGreeted.current && ragMessages.length === 0) {
      hasGreeted.current = true
      addRagMessage({ role: 'assistant', text: "Salut ! 👋 Je suis l'assistant IA d'Oktav. Je connais tous ses projets, compétences et son parcours. Demande-moi ce que tu veux !" })
    }
    if (!ragOpen) {
      hasGreeted.current = false
      clearRagMessages()
    }
  }, [ragOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [ragMessages])

  const handleSend = async () => {
    if (!input.trim() || ragLoading) return
    const userMsg = input.trim()
    setInput('')
    addRagMessage({ role: 'user', text: userMsg })
    setRagLoading(true)

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200))

    addRagMessage({ role: 'assistant', text: getResponse(userMsg) })
    setRagLoading(false)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleRag}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cobalt text-white shadow-xl shadow-cobalt/30 flex items-center justify-center hover:bg-cobalt/90 hover:scale-110 active:scale-95 transition-all duration-300 ${
          ragOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open AI assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber rounded-full animate-pulse" />
        </div>
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-2xl bg-white dark:bg-dark-deep shadow-2xl border border-cobalt/10 flex flex-col overflow-hidden transition-all duration-500 ${
          ragOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cobalt to-blue-600 text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Ask AI — Oktav</h3>
              <p className="text-xs text-white/60">Propulsé par Groq / OpenRouter</p>
            </div>
          </div>
          <button onClick={closeRag} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {ragMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-cobalt/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-cobalt" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cobalt text-white rounded-br-md'
                    : 'bg-ivory dark:bg-cloud text-dark dark:text-white/90 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-amber" />
                </div>
              )}
            </div>
          ))}
          {ragLoading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-cobalt/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-cobalt" />
              </div>
              <div className="px-3.5 py-2.5 rounded-2xl bg-ivory dark:bg-cloud">
                <Loader2 className="w-4 h-4 text-cobalt animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-cobalt/10 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pose ta question..."
              className="flex-1 px-4 py-2.5 rounded-full bg-ivory dark:bg-cloud text-dark dark:text-white/90 text-sm outline-none focus:ring-2 focus:ring-cobalt/50 placeholder:text-text-secondary dark:placeholder:text-white/30"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || ragLoading}
              className="w-10 h-10 rounded-full bg-cobalt text-white flex items-center justify-center hover:bg-cobalt/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
