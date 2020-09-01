import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            // <!-- Main Sidebar Container -->
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <a href="# " className="brand-link brand-logo">
                    <img src="/dist/img/Namuna News English Logo.png" alt="Namuna News Logo" className=" img-fluid" />
                    {/* <span className="brand-text font-weight-light">AdminLTE 3</span> */}
                </a>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>

                    {/* <!-- SidebarSearch Form --> */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library --> */}
                            <li className="nav-item">
                                <a href="#" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                        
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/categories" className="nav-link">
                                    <i className="nav-icon fas fa-chart-pie"></i>
                                    <p>
                                        Categories
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </NavLink>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="pages/charts/chartjs.html" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Categories List</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/charts/flot.html" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add Categories</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/categrories-translation" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        Categories Translation
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/languages" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        Languages
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/news" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        News
                                    </p>
                                </NavLink>
                                
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/news-translation" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        News Translation
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/provinces" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        Provinces
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/provinces-translation" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        Provinces Translation
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/resources" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        Resources
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item has-treeview">
                                <NavLink to="/translated-resources" className="nav-link">
                                    <i className="nav-icon fas fa-globe"></i>
                                    <p>
                                        Resources Translation
                                    </p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        );
    }
}

export default Sidebar;