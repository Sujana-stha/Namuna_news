import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { requestCategories, requestDeleteCategories, requestAddCategories, requestUpdateCategories, requestCategoriesStatus } from '../../actions/categories-action';
import $ from 'jquery';

//COMPONENT
import CategoryForm from '../../components/categories/categories-form';
import EditCategory from '../../components/categories/edit-categories-form';
import CategoriesList from '../../components/categories/categories';
import Loading from '../../components/loading';

class CategoriesListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            
        }
        this.editCategories = this.editCategories.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestCategories();
        console.log(this.props)
        $("input[data-bootstrap-switch]").each(function(){
            $(this).bootstrapSwitch();
        });
    }

    // submit function for new data
    submitCategory(values) {
        console.log('val', values)
        this.props.requestAddCategories(values);
    }

    // submit function to update data
    submitEditCategory(values) {
        
        this.props.requestUpdateCategories(values);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editCategories(values) {
        this.setState({
            isEditing: values
        })
    }

    // toggle status function
    toggleStatus(categoryId, status) {
        
        const newCategoriesStatus = {
            status: !status
        }
        this.props.requestCategoriesStatus(categoryId, newCategoriesStatus)
    }

    deleteCategoryAction(categoryId) {
        this.props.requestDeleteCategories(categoryId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        console.log('prp', this.props)
        return (
            <div className="nm-content">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditCategory
                                onSubmit={this.submitEditCategory.bind(this)}
                                editId={this.state.isEditing} categories={this.props.categories} />
                        ) : (
                                <CategoryForm onSubmit={this.submitCategory.bind(this)} categories={this.props.categories} />
                            )}

                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        {/* {this.props.fetching ? (
                                <Loading />
                            ) : (
                                <div className="wr-not-loading"></div>
                        )} */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th >Title</th>
                                    <th>Parent Category</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            
                            {this.props.categories.length ? (
                                <CategoriesList
                                    categories={this.props.categories}
                                    onEditCategory={this.editCategories}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteCategory={this.props.requestDeleteCategories}
                                    categoryStatus={this.toggleStatus}
                                />

                            ) : (
                                    <tbody>
                                        <tr>
                                            <td >No Results Found !</td>
                                        </tr>
                                    </tbody>
                                )}
                        </table>
                        
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    
    return {
        categories: store.categoryState.categories,
        fetching: store.categoryState.fetching
    }
}

export default connect(mapStateToProps, { requestCategories, requestDeleteCategories, requestAddCategories, requestUpdateCategories, requestCategoriesStatus })(CategoriesListContainer);