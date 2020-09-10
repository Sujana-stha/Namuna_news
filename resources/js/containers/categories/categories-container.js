import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestCategories, requestDeleteCategories, requestAddCategories, requestUpdateCategories, requestCategoriesStatus } from '../../actions/categories-action';


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
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.editCategories = this.editCategories.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        this.props.requestCategories(pageNumber);
        
    }

    // submit function for new data
    submitCategory(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddCategories(values, pageNumber);
    }

    // submit function to update data
    submitEditCategory(values) {
        const pageNumber = this.props.activePage;
        this.props.requestUpdateCategories(values, pageNumber);
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
    toggleStatus(category) {
        console.log('stat', category)
        const pageNumber = this.props.activePage;
        if(category.display_status == "0") {
            category.display_status= "1"
        } else {
            category.display_status = "0"
        }
        console.log(category)
        this.props.requestUpdateCategories( category, pageNumber);
        
    }

    deleteCategoryAction(categoryId) {
        this.props.requestDeleteCategories(categoryId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestCategories(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
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
                        {this.props.fetching ? (
                            <Loading />
                        ) : (
                            <div className="wr-not-loading"></div>
                        )}
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
                                    isChecked = {this.state.isChecked}
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.itemsCountPerPage}
                                />

                            ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="5">No Results Found !</td>
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
        );
    }
};

function mapStateToProps(store) {
    
    return {
        categories: store.categoryState.categories,
        fetching: store.categoryState.fetching,
        activePage: store.categoryState.activePage,
        itemsCountPerPage: store.categoryState.itemsCountPerPage,
        totalItemsCount: store.categoryState.totalItemsCount,
        pageRangeDisplayed: store.categoryState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestCategories, requestDeleteCategories, requestAddCategories, requestUpdateCategories, requestCategoriesStatus })(CategoriesListContainer);