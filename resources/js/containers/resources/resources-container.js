import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import {requestAddResources, requestResources, requestDeleteResources, requestUpdateResources} from '../../actions/resource-action';

//COMPONENTS
import AddResources from '../../components/resource/resources-add';
import ResourcesList from '../../components/resource/resource';
import EditResources from '../../components/resource/resources-edit';

class ResourcesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmText: null,
            isEditing: false
        }
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
        this.editResource = this.editResource.bind(this)
    }
    componentDidMount() {
        this.props.requestResources();
    }
    //submit News form
    onSubmitForm(values) {
        this.props.requestAddResources(values);
    }

    // edit functions
    editResource(values) {
        console.log('resource-id', values)
        this.setState ({
            isEditing : values
        })
    }
    submitEditResource(values) {
        
        this.props.requestUpdateResources(values);
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
        if(this.props.match.path === "/edit-resources") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/resources" className="btn btn-primary"><i className="fas fa-list"></i> All Resources</NavLink>
                        </div>
                        <EditResources onSubmit={this.submitEditResource.bind(this)} editId= {this.state.isEditing}/>
                    </div>
                </div>
            )
        } else if(this.props.match.path ==="/add-resources") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/resources" className="btn btn-primary"><i className="fas fa-list"></i> All Resources</NavLink>
                        </div>
                        <AddResources
                            onSubmit={this.onSubmitForm.bind(this)}
                        />
                    </div>  
                </div>
            )
        } else {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/add-resources" className="right btn btn-primary"><i className="fas fa-plus"></i> Add Resources</NavLink>
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
                                    <th>Type</th>
                                    <th>URL</th>
                                    <th>Views</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {this.props.resources ? (
                                <ResourcesList
                                resources={this.props.resources}
                                onEditResource = {this.editResource} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv}
                                deleteResource = {this.props.requestDeleteResources}
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
        resources: store.resourceState.resources,
        fetching: store.newsState.fetching
    }
}
export default connect(mapStateToProps, {requestAddResources, requestResources, requestDeleteResources, requestUpdateResources})(ResourcesContainer);