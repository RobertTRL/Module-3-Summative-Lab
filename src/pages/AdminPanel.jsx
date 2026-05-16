import AddForm  from "../components/AddForm.jsx"
import DeleteSection from "../components/DeleteSection.jsx"
import EditSection from "../components/EditSection.jsx"
import '../styles/AdminPanel.css'
import { Link , Outlet , NavLink } from "react-router-dom"

export default function AdminPanel() {
    return (
        <div className="admin-panel">
            <aside className="admin-sidebar">
                <h3>Admin Panel</h3>
            <nav>
                <NavLink to='' end>Add Product</NavLink>
                <NavLink to='delete'>Delete Product</NavLink>
                <NavLink to='edit'>Edit Product</NavLink>
            </nav>
            </aside>
            <div className="admin-content">
            <Outlet/>
            </div>
        </div>
    )
}