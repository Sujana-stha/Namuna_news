import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import {requestResourcesTranslation, requestAddResourcesTranslation, requestUpdateResourcesTranslation, requestDeleteResourcesTranslation} from '../../actions/resourceTranslation-action';
import { requestResources} from '../../actions/resource-action';
import {requestLanguages} from '../../actions/languages-action';

//COMPONENTS
import AddResourcesTrans from '../../components/resourceTranslation/add-resourceTrans';
import ResourcesTransList from '../../components/resourceTranslation/resourceTrans';
import EditResourcesTrans from '../../components/resourceTranslation/edit-resourceTrans';

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
    }
    componentDidMount() {
        this.props.requestResourcesTranslation();
        this.props.requestResources();
        this.props.requestLanguages();
    }
    //submit Resources translation form
    onSubmitForm(values) {
        this.props.requestAddResourcesTranslation(values);
    }

    // edit functions
    editResourceTrans(values) {
        console.log('resource-id', values)
        this.setState ({
            isEditing : values
        })
    }
    submitEditResourceTrans(values) {
        
        this.props.requestUpdateResourcesTranslation(values);
        this.setState({
            isEditing: false
        })
    }
    deleteItem(id){
        this.setState ({
            confirmText: id
        })
    }
    
    hideDiv() {
        this.setState({confirmText: null})
    }
    render() {
        console.log("comp-prop", this.props)
        if(this.props.match.path === "/edit-translated-resources") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/translated-resources" className="btn btn-primary"><i className="fas fa-list"></i> All Translated Resources</NavLink>
                        </div>
                        <EditResourcesTrans 
                        onSubmit={this.submitEditResourceTrans.bind(this)} 
                        editId= {this.state.isEditing}
                        resources = {this.props.resources}
                        languages ={this.props.languages}
                        />
                    </div>
                </div>
            )
        } else if(this.props.match.path ==="/add-resources-translation") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/translated-resources" className="btn btn-primary"><i className="fas fa-list"></i> All Translated Resources</NavLink>
                        </div>
                        <AddResourcesTrans
                            onSubmit={this.onSubmitForm.bind(this)}
                            resources = {this.props.resources}
                            languages ={this.props.languages}
                        />
                    </div>  
                </div>
            )
        } else {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/add-resources-translation" className="right btn btn-primary"><i className="fas fa-plus"></i> Add Resources Translation</NavLink>
                        </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        {/* {this.props.fetching ? (
                                <Loading />
                            ) : (
                                <div className="wr-not-loading"></div>
                        )} */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Title</th>
                                    <th>Description</th>
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
                                />
                            ):(
                                <tbody>
                                    <tr>
                                        <td>No Results Found !</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
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
        resources: store.resourceState.resources,
        languages: store.languageState.languages,
        fetching: store.resourcesTransState.fetching
    }
}
export default connect(mapStateToProps, { requestResources, requestLanguages,requestResourcesTranslation, requestAddResourcesTranslation, requestUpdateResourcesTranslation, requestDeleteResourcesTranslation})(ResourcesTransContainer);