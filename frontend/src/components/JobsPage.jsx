import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/JoblyApi';
import JobCard from './JobCard'
import SearchBar from './SearchBar'

// Jobs Page
const JobsPage = () => {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchedJobs = async () => {
      try {
        const fetchedJobs = await JoblyApi.getJobs(searchTerm)
        setJobs(fetchedJobs)
      } catch (error) {
        console.error("Error fetching jobs", error)
      }
    }

    fetchedJobs()
  }, [searchTerm])

  const handleSearch = term => {
    setSearchTerm(term)
  }
  return (
    <div>
      <h1>Jobs</h1>
      <SearchBar handleSearch={handleSearch} />
      {jobs.length ? (
        jobs.map((job) => <JobCard
          key={job.id}
          job={job}
          applyToJob={applyToJob}
          isApplied={currentUser.applications.includes(job.id)}
        />)
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  )
}

export default JobsPage