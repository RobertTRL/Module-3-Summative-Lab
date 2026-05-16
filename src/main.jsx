import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route , Link, NavLink, Outlet } from 'react-router-dom'
import './styles/index.css'
import App from './pages/App.jsx'
import ShopPage from './pages/ShopPage.jsx'
import { ProductsProvider } from './context/ProductsContext'
import ProductDetails from './pages/ProductDetails.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import AddForm from './components/AddForm.jsx'
import DeleteSection from './components/DeleteSection.jsx'
import EditSection from './components/EditSection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <ProductsProvider>
      <nav className='navigation'>
        <h3>Robert's Coffee Shop</h3>
        <div className='nav-links'>
        <NavLink to='/'>Home</ NavLink>
        <NavLink to='/shop'>Shop</ NavLink>
        <NavLink to='/admin'>Admin Panel</NavLink>
        </div>
      </nav>
      <Routes>
        <Route index path='/'element={<App />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:id' element={<ProductDetails />}/>
        <Route path='/admin' element={<AdminPanel/>}>
          <Route index element={<AddForm />} />
          <Route path='delete' element={<DeleteSection />} />
          <Route path='edit' element={<EditSection />} />
        </Route>
      </Routes>
      </ProductsProvider>
    </BrowserRouter>
  </StrictMode>,
)
