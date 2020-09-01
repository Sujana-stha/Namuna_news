import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';
import Notifications from 'react-notify-toast';
import loadjs from 'loadjs';

//INCLUDES
import Header from '../components/layout/header';
import Sidebar from '../components/layout/sidebar';
import Breadcrumb from '../components/layout/breadcrumb';
import Footer from '../components/layout/footer';

//COMPONENTS
import Dashboard from '../components/dashboard';
import CategoriesContainer from '../containers/categories/categories-container';
import languagesContainer from '../containers/languages/languages-container';
import CategoriesTransContainer from '../containers/categoriesTranslation/categoriesTrans-container';
import ProvinceContainer from '../containers/provinceContainer/provinces-container';
import ProvinceTransContainer from '../containers/provinceTranslation/provinceTrans-container';
import NewsContainer from '../containers/newsContainer/news-container';
import NewsTransContainer from '../containers/newsTranslation/newsTrans-container';
import ResourcesContainer from '../containers/resources/resources-container';

import ResourcesTransContainer from '../containers/resourcesTranslation/resourcesTrans-container'
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
                            <Route path= "/categories" component={CategoriesContainer}/>
                            
                            <Route path= "/languages" component={languagesContainer}/>
                            <Route path = "/categrories-translation" component={CategoriesTransContainer}/>
                            <Route path = "/news" component={NewsContainer}/>
                            <Route path = "/add-news" component={NewsContainer} />
                            <Route path ="/edit-news" component={NewsContainer}/>
                            <Route path = "/news-translation" component={NewsTransContainer}/>
                            <Route path = "/add-news-translation" component={NewsTransContainer}/>
                            <Route path = "/edit-news-translation" component={NewsTransContainer}/>
                            <Route path = "/provinces" component={ProvinceContainer}/>
                            <Route path = "/provinces-translation" component={ProvinceTransContainer}/>
                            <Route path = "/resources" component={ResourcesContainer}/>
                            <Route path = "/add-resources" component={ResourcesContainer}/>
                            <Route path = "/edit-resources" component={ResourcesContainer}/>
                            <Route path = "/translated-resources" component={ResourcesTransContainer}/>
                            <Route path = "/add-resources-translation" component={ResourcesTransContainer}/>
                            <Route path = "/edit-translated-resources" component={ResourcesTransContainer}/>
                            <Redirect to={`${match.url}`} />
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