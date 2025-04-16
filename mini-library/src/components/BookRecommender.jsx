// src/components/BookRecommender.jsx
import { useState } from 'react';
import axios from 'axios';

export default function BookRecommender() {
  const [prompt, setPrompt] = useState('');
  const [rec, setRec] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getRecommendation() {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Suggest a book (title, author, and short reason) for this mood or interest: "${prompt}"`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`, // your real key
          },
        }
      );

      const reply = res.data?.choices?.[0]?.message?.content || '⚠️ No recommendation returned.';
      setRec(reply.trim());
    } catch (err) {
      console.error('OpenAI error:', err.response?.data || err.message);
      setRec('⚠️ Sorry, I couldn’t fetch a recommendation.');
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fdfdfd',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    >
      <h3>📚 Book Recommendation AI</h3>
      <input
        type="text"
        placeholder="e.g. something romantic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        onClick={getRecommendation}
        disabled={loading}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Thinking...' : 'Get Recommendation'}
      </button>

      {rec && (
        <div
          style={{
            marginTop: '1rem',
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #ddd',
          }}
        >
          <strong>📗 Recommended Book:</strong>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>{rec}</p>
        </div>
      )}
    </div>
  );
}
