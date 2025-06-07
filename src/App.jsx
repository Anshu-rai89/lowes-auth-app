import './App.css'
import {BrowserRouter as Router , Routes, Route}from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import ProtectedRoutes from './ProtectedRoutes'

function App() {
  return (
    <Router>
      <h2>Auth APP</h2>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProtectedRoutes>
          <ProfilePage />
        </ProtectedRoutes>}/>
        <Route path='*' element={()=> <h2>Page not found</h2>} />
      </Routes>
    </Router>
  )
}

export default App
