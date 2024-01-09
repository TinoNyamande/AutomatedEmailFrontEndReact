import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-left-section">
                <span>made by TinoN</span>
            </div>
            <div className="navbar-middle-section">
                <Link className="navbar-middle-section-link" to="/">Home</Link>
                <Link className="navbar-middle-section-link"  to="/orders">Orders</Link>
                <Link className="navbar-middle-section-link"  to="/receipts">Receipts</Link>
                <Link className="navbar-middle-section-link"  to="/invoices">Invoices</Link>
            </div>
            <div className="navbar-right-section">
                <div className="navbar-dropdown">
                    <span>Username</span>
                    <div className="navbar-dropdown-content">
                        <Link className="navbar-dropdown-content-links" to="/orders">Profile</Link>
                        <Link className="navbar-dropdown-content-links" to="/orders">Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Navbar