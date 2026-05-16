import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route , Link, NavLink, Outlet } from 'react-router-dom'
import './styles/index.css'
import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <nav className='navigation'>
        <NavLink to='/'>Home</ NavLink>
      </nav>
      <Routes>
        <Route index path='/'element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
