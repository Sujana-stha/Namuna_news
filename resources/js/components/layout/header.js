import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return (
        // <!-- Navbar -->
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* <!-- Left navbar links --> */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="# " role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                
            </ul>

            {/* <!-- SEARCH FORM --> */}
            <form className="form-inline ml-3">
                <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>

            
        </nav>
        // {/* <!-- /.navbar --> */}
    );
};

export default Header;