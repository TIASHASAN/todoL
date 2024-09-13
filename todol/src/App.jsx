import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Achievements from './pages/Achievements'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Button to Home Page */}
        <div className="bottom-10 right-10">
          <Link to="/home">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
              Go to Home
            </button>
          </Link>
        </div>

        {/* Routing */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/achievements" element={<Achievements />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
