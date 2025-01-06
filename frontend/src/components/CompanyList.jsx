import React, { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi'
import CompanyCard from './CompanyCard'
import SearchBar from './SearchBar'

const CompanyList = () => {
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const fetchedCompanies = await JoblyApi.getCompanies(searchTerm)
        setCompanies(fetchedCompanies)
      } catch(err){
        console.error("Error fetching companies", err)
      }
    }
    fetchCompanies()
  }, [searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div>
      <h1>Companies</h1>
      <SearchBar handleSearch={handleSearch} />
    {companies.length ? (
      companies.map((c) => <CompanyCard key={c.handle} company={c} />)
    ) : (
      <p>No companies found.</p>
    )}
    </div>
  )
}

export default CompanyList