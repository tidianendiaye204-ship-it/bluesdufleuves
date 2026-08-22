import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatFn } from "@/lib/chat";

type Message = {
  role: "user" | "model";
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Bonjour ! Je suis BluesBot, l'assistant du festival Les Blues du Fleuve. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Conversion de l'historique pour l'API Gemini
    // On ignore le tout premier message d'accueil car Gemini exige que l'historique commence par un "user" et non un "model".
    const history = messages.slice(1).map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatFn({ data: { message: userMessage, history } });
      if (result.error) {
        setMessages((prev) => [...prev, { role: "model", text: result.error as string }]);
      } else if (result.response) {
        setMessages((prev) => [...prev, { role: "model", text: result.response as string }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Une erreur est survenue lors de la communication." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-100">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-100 max-w-100 h-125 max-h-[70vh] bg-card border border-border shadow-2xl rounded-3xl flex flex-col overflow-hidden"
          >
            <div className="bg-linear-to-r from-primary to-amber-500 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold font-display text-lg">BluesBot</h3>
                <p className="text-xs opacity-90 uppercase tracking-wider">Assistant Virtuel</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/30">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-2xl text-sm bg-card border border-border text-foreground rounded-bl-sm flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="opacity-70 italic">En train de réfléchir...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-border bg-card flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center shadow-md"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary/90 text-white w-16 h-16 rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.5)] flex items-center justify-center transition-all hover:scale-105 cursor-pointer relative"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-primary"></span>
          </span>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
