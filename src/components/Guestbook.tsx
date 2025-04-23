import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

interface Entry {
  name: string;
  message: string;
  date: string;
}

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Load entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('guestbookEntries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newEntry: Entry = { name: name.trim(), message: message.trim(), date: new Date().toISOString() };
    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 filter drop-shadow-[0_0_6px_theme(colors.neon-green)] hover:drop-shadow-[0_0_10px_theme(colors.neon-green)] transition-all duration-300">
        Guestbook
      </h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-neon-green"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-neon-green"
            placeholder="Your message"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-neon-green text-black font-semibold rounded hover:bg-neon-green-light transition-colors"
        >
          Sign Guestbook
        </button>
      </form>
      <div className="space-y-6">
        {entries.length === 0 && <p className="text-gray-400">No entries yet. Be the first to sign!</p>}
        {entries.map((entry, idx) => (
          <div key={idx} className="border border-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">
              {new Date(entry.date).toLocaleString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
            <p className="font-semibold mb-1">{entry.name}</p>
            <p className="whitespace-pre-wrap">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guestbook; 