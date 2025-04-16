// src/components/BookList.jsx
import React from 'react';

export default function BookList({ books, setBooks, setEditingBook, searchQuery }) {
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function toggleStatus(id) {
    const updated = books.map(book =>
      book.id === id
        ? { ...book, status: book.status === 'available' ? 'borrowed' : 'available' }
        : book
    );
    setBooks(updated);
  }

  function deleteBook(id) {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <div>
      <h2>Books</h2>
      {filtered.map(book => (
        <div key={book.id}>
          <strong>{book.title}</strong> by {book.author} — {book.status}
          <button onClick={() => toggleStatus(book.id)}>
            {book.status === 'available' ? 'Borrow' : 'Return'}
          </button>
          <button onClick={() => setEditingBook(book)}>Edit</button>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
