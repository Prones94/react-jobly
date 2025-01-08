import React from 'react'

const JobCard = ({ job, applyToJob, isApplied }) => {
  async function handleApply() {
    if (!isApplied){
      try {
        await applyToJob(job.id)
      } catch (err) {
        console.error("Error applying to job:", err)
      }
    }
  }
  return (
    <div className="JobCard">
      <h4>{job.title}</h4>
      <p>Salary: {job.salary  ? `$${job.salary}` : "N/A"}</p>
      <p>Salary: {job.salary  ? `${job.equity * 100}%` : "N/A"}</p>
      <button
        onClick={handleApply}
        disabled={isApplied}
        style={{
          backgroundColor: isApplied ? "gray": "blue",
          color: "white",
          cursor: isApplied ? "not-allowed" : "pointer"
        }}
      >
        {isApplied ? "Applied" : "Apply"}
      </button>
    </div>
  )
}

export default JobCard