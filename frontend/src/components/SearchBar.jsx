import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleSearch(searchTerm.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search companies..."
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar