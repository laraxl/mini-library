// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ setSearchQuery }) {
  return (
    <input
      placeholder="Search by title or author..."
      onChange={e => setSearchQuery(e.target.value)}
      style={{ marginBottom: '1rem', width: '100%' }}
    />
  );
}
