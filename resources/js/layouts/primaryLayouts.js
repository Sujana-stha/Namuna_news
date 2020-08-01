import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import Notifications from 'react-notify-toast';
import loadjs from 'loadjs';
// import { requestLoggedUser } from '../actions/users-action'

//INCLUDES
import Header from '../components/layout/header';
import Sidebar from '../components/layout/sidebar';
import Breadcrumb from '../components/layout/breadcrumb';
import Footer from '../components/layout/footer';

//COMPONENTS
import Dashboard from '../components/dashboard';
import CategoriesContainer from '../containers/categories/categories-container';
import LanguagesContainer from '../containers/languages/languages-container';
import languagesContainer from '../containers/languages/languages-container';
// import AddCategories from '../containers/categories/categories-add-container'

class DashboardLayout extends Component {
    componentDidMount() {
        loadjs('/plugins/jquery/jquery.min.js', function () {
           
                loadjs('/plugins/bootstrap/js/bootstrap.bundle.min.js', function() {
                    loadjs('/dist/js/adminlte.min.js', function() {
                        
                            loadjs('/dist/js/demo.js');
                        })
                    
                })
           
        })
    }
    render() {
        const { match } = this.props
        return (
            <div className="wrapper">
                <Notifications options={{ top: '50px', right: '0px', width: '100%', margin: 0, left: 'none' }} />
                {/* start Header Content */}
                <Header/>
                {/* END Header Content */}

                {/* Start Sidebar Content */}
                <Sidebar/>
                {/* END Sidebar Content */}

                {/* START MAIN CONTENT */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <Breadcrumb/>
                    {/* /.content-header */}

                    <section className="content">
                        <Switch>
                            <Route exact path={`${match.path}`} component={Dashboard} />
                            <Route exact path= "/categories" component={CategoriesContainer}/>
                            {/* <Route exact path="/add-categories" component={AddCategories}/> */}
                            <Route exact path= "/languages" component={languagesContainer}/>
                        </Switch>
                    </section>
                </div>
                {/* END OF MAIN CONTENT */}

                {/* Start Footer Content */}
                <Footer/>
                {/* End Footer Content */}
            </div>
        );
    }
}


export default DashboardLayout;