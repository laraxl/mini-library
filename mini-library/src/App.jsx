import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookRecommender from './components/BookRecommender';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Mini Library</h1>

      <SearchBar setSearchQuery={setSearchQuery} />
      <BookForm setBooks={setBooks} editingBook={editingBook} books={books} />
      <BookList
        books={books}
        setBooks={setBooks}
        setEditingBook={setEditingBook}
        searchQuery={searchQuery}
      />

      {/* ✅ Show this once, at the bottom or top */}
      <BookRecommender />
    </div>
  );
}

export default App;
