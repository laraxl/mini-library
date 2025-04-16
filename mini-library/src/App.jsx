import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', year: '', isbn: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    if (!form.title || !form.author) return;

    if (editingId) {
      setBooks(books.map(book =>
        book.id === editingId ? { ...book, ...form } : book
      ));
      setEditingId(null);
    } else {
      const newBook = { ...form, id: Date.now(), status: 'in' };
      setBooks([...books, newBook]);
    }

    setForm({ title: '', author: '', year: '', isbn: '' });
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
    if (id === editingId) setEditingId(null);
  };

  const toggleStatus = (id) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, status: book.status === 'in' ? 'out' : 'in' } : book
    ));
  };

  const editBook = (book) => {
    setForm({ title: book.title, author: book.author, year: book.year, isbn: book.isbn });
    setEditingId(book.id);
  };

  return (
    <div className="app">
      <h1>📚 Mini Library System</h1>

      <div className="form">
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        <input placeholder="ISBN" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} />
        <button onClick={handleSubmit}>{editingId ? 'Update Book' : 'Add Book'}</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="book-list">
        {books
          .filter(book => {
            const title = book.title.toLowerCase().trim();
            const author = book.author.toLowerCase().trim();
            const term = searchTerm.toLowerCase().trim();
            return title.includes(term) || author.includes(term);
          })
          .map(book => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} ({book.year}) - ISBN: {book.isbn} <br />
              Status: <b>{book.status === 'in' ? 'Available' : 'Borrowed'}</b>{' '}
              <button onClick={() => toggleStatus(book.id)}>Check {book.status === 'in' ? 'Out' : 'In'}</button>
              <button onClick={() => editBook(book)}>✏️ Edit</button>
              <button onClick={() => deleteBook(book.id)}>❌ Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
