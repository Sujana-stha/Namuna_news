import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import {requestResourcesTranslation, requestAddResourcesTranslation, requestUpdateResourcesTranslation, requestDeleteResourcesTranslation} from '../../actions/resourceTranslation-action';
import { requestAllResources} from '../../actions/resource-action';
import {requestAllLanguages} from '../../actions/languages-action';

//COMPONENTS
import AddResourcesTrans from '../../components/resourceTranslation/add-resourceTrans';
import ResourcesTransList from '../../components/resourceTranslation/resourceTrans';
import EditResourcesTrans from '../../components/resourceTranslation/edit-resourceTrans';
import Loading from '../../components/loading'

class ResourcesTransContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmText: null,
            isEditing: false
        }
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
        this.editResourceTrans = this.editResourceTrans.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    componentDidMount() {
        const pageNumber = this.props.activePage;
        this.props.requestResourcesTranslation(pageNumber);
        this.props.requestAllResources();
        this.props.requestAllLanguages();
    }
    //submit Resources translation form
    onSubmitForm(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddResourcesTranslation(values, pageNumber);
    }

    // edit functions
    editResourceTrans(values) {
       
        this.setState ({
            isEditing : values
        })
    }
    submitEditResourceTrans(values) {
        // const editId= this.state.isEditing
        const pageNumber = this.props.activePage;
        if ( typeof values.language_id =='number') { values.language_id = values.language_id } else { values.language_id = values.language_id.value }

        this.props.requestUpdateResourcesTranslation(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }
    deleteItem(id){
        this.setState ({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        
        this.props.requestResourcesTranslation(pageNumber)
    }

    hideDiv() {
        this.setState({confirmText: null})
    }
    render() {
        if(this.props.match.path === "/edit-translated-resources") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/translated-resources" className="add-btn btn btn-primary"><i className="fas fa-list"></i> All Translated Resources</NavLink>
                        </div>
                        <EditResourcesTrans 
                        onSubmit={this.submitEditResourceTrans.bind(this)} 
                        editId= {this.state.isEditing}
                        resources = {this.props.allResources}
                        languages ={this.props.allLanguages}
                        />
                    </div>
                </div>
            )
        } else if(this.props.match.path ==="/add-resources-translation") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/translated-resources" className="add-btn btn btn-primary"><i className="fas fa-list"></i> All Translated Resources</NavLink>
                        </div>
                        <AddResourcesTrans
                            onSubmit={this.onSubmitForm.bind(this)}
                            resources = {this.props.allResources}
                            languages ={this.props.allLanguages}
                        />
                    </div>  
                </div>
            )
        } else {
            return (
                <div className="nm-content nm-news-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/add-resources-translation" className="add-btn right btn btn-primary"><i className="fas fa-plus"></i> Add Resources Translation</NavLink>
                        </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        {this.props.fetching ? (
                                <Loading />
                            ) : (
                                <div className="wr-not-loading"></div>
                        )}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th className="news-title">Title</th>
                                    <th className="news-content">Description</th>
                                    <th>Languages</th>
                                    <th>Resource Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {this.props.resourcesTrans ? (
                                <ResourcesTransList
                                resourcesTrans={this.props.resourcesTrans}
                                onEditResourceTrans = {this.editResourceTrans} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv}
                                deleteResourceTrans = {this.props.requestDeleteResourcesTranslation}
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                />
                            ):(
                                <tbody>
                                    <tr>
                                        <td colSpan="6">No Results Found !</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        <div className="col-sm-12 left-align">
                            <Pagination
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                totalItemsCount={this.props.totalItemsCount}
                                pageRangeDisplayed={this.props.pageRangeDisplayed}
                                onChange={this.handlePageChange}
                                firstPageText='First'
                                lastPageText='Last'
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
    }
}
function mapStateToProps(store) {
    return {
        resourcesTrans: store.resourcesTransState.resourcesTrans,
        allResources: store.resourceState.all_resources,
        allLanguages: store.languageState.all_languages,
        fetching: store.resourcesTransState.fetching,
        activePage: store.resourcesTransState.activePage,
        itemsCountPerPage: store.resourcesTransState.itemsCountPerPage,
        totalItemsCount: store.resourcesTransState.totalItemsCount,
        pageRangeDisplayed: store.resourcesTransState.pageRangeDisplayed,
    }
}
export default connect(mapStateToProps, { requestAllResources, requestAllLanguages,requestResourcesTranslation, requestAddResourcesTranslation, requestUpdateResourcesTranslation, requestDeleteResourcesTranslation})(ResourcesTransContainer);