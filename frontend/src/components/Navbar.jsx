import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ currentUser, logout }) => {

  return (
    <nav>
      <ul>
        {!currentUser ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/companies">Companies</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>Welcome {currentUser.username}</li>
            <li><button onClick={logout}>Log Out</button></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar