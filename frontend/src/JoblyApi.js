import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001"

/** JoblyApi Class.
 *
 * Static class tying together methods used to get/send data to the API
 *
 */
class JoblyApi {
  static token;

  static async request(endpoint, data={}, method="get"){
    console.debug("API Call:", endpoint, data,method);

    const url = `${BASE_URL}/${endpoint}`
    const headers = { Authorization: `Bearer ${JoblyApi.token}`}
    const params = method === "get" ? data : {}

    try {
      return (await axios({ url, method, data, params, headers })).data
    } catch(err){
      console.error('API Error:', err.response)
      let message = err.response.data.error.message
      throw Array.isArray(message) ? message: [message]
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle){
    try {
      let res = await this.request(`companies/${handle}`)
      return res.company
    } catch (error) {
      console.error("Error fetching company:", error)
      throw err
    }
  }

  /** Get all companies */
  static async getCompanies(){
    let res= await this.request('companies')
    return res.companies
  }

  /** Get all jobs */
  static async getJobs(filterTitle=""){
    const params = filterTitle ? { title: filterTitle}: {}
    let res = await this.request('jobs', params)
    return res.jobs
  }

  /** Apply to a job */
  static async applyToJob(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
    return res
  }

  /** Get user info by usrename */
  static async getUser(username){
    let res = await this.request(`users/${username}`)
    return res.user
  }

  /** Update user profile */
  static async updateUser(username, data){
    let res = await this.request(`users/${username}`, data, "patch")
    return res.user
  }

  /** Get companies, filtering by name */
  static async getCompanies(filterName=""){
    const res= await this.request("companies", {name: filterName})
    return res.companies
  }
}

JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;