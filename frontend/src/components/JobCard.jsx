import React from 'react'

const JobCard = ({ job }) => {
  return (
    <div className="JobCard">
      <h4>{job.title}</h4>
      <p>Salary: {job.salary  || "N/A"}</p>
      <p>Salary: {job.salary  || "N/A"}</p>
    </div>
  )
}

export default JobCard