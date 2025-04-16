// src/components/BookForm.jsx
import React, { useState, useEffect } from 'react';

export default function BookForm({ setBooks, editingBook, books }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
    } else {
      setTitle('');
      setAuthor('');
    }
  }, [editingBook]);

  function handleSubmit(e) {
    e.preventDefault();
    if (editingBook) {
      const updated = books.map(book =>
        book.id === editingBook.id ? { ...book, title, author } : book
      );
      setBooks(updated);
    } else {
      setBooks(prev => [
        ...prev,
        { id: Date.now(), title, author, status: 'available' }
      ]);
    }
    setTitle('');
    setAuthor('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
      />
      <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
    </form>
  );
}
