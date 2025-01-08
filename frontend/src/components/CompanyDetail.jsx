import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import JoblyApi from '../api/JoblyApi';
import JobCard from './JobCard'

const CompanyDetail = () => {
  const { handle } = useParams()
  const [company, setCompany] = useState(null)


  useEffect(() => {
    if(!handle){
      setErrorMessage("Invalid company handle")
      return
    }
    const fetchCompany = async () => {
      try {
        const companyData = await JoblyApi.getCompany(handle)
        setCompany(companyData)
      } catch(err){
        console.error("Error fetching company details", err)
        setErrorMessage("Unable to load company details.")
      }
    }

     fetchCompany()
  }, [handle])


  if (!company) return <p>Loading...</p>

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {company.jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          applyToJob={applyToJob}
          isApplied={currentUser.applications.includes(job.id)}
        />
      ))}
    </div>
  )
}

export default CompanyDetail