import React from 'react'
import { Link } from 'react-router-dom'

const CompanyCard = ({ company }) => {
  return (
    <div className="CompanyCard">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} logo`} />}
      <Link to={`/companies/${company.handle}`}>View Details</Link>
    </div>
  )
}

export default CompanyCard