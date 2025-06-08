'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const question = input;
    setInput('');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setMessages([...messages, { question, answer: data.answer }]);
    } catch (err) {
      console.error('Request error:', err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">💬 RAG Chatbot</h1>
        <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i}>
              <p className="text-blue-600 font-semibold">You:</p>
              <p className="mb-2">{m.question}</p>
              <p className="text-green-600 font-semibold">Bot:</p>
              <p>{m.answer}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  );
}