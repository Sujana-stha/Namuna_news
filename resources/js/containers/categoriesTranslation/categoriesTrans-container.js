import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestCategoriesTranslation, requestDeleteCategoriesTranslation, requestAddCategoriesTranslation, requestUpdateCategoriesTranslation } from '../../actions/categoriesTranslation-action';
import {requestAllCategories} from '../../actions/categories-action';
import {requestAllLanguages} from '../../actions/languages-action';

//COMPONENT
import CategoryTransForm from '../../components/categoriesTranslation/categoriesTrans-add';
import EditCategoryTrans from '../../components/categoriesTranslation/categoriesTrans-edit';
import CategoriesTransList from '../../components/categoriesTranslation/categoriesTrans';
import Loading from '../../components/loading';

class CategoriesTransListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            
        }
        this.editCategoriesTrans = this.editCategoriesTrans.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        // this.toggleStatus = this.toggleStatus.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        this.props.requestCategoriesTranslation(pageNumber);
        this.props.requestAllLanguages();
        this.props.requestAllCategories();

    }

    // submit function for new data
    submitCategoryTrans(values) {
        
        const pageNumber = this.props.activePage;
        this.props.requestAddCategoriesTranslation(values, pageNumber);
    }

    // submit function to update data
    submitEditCategoryTrans(values) {
        const pageNumber = this.props.activePage;
        this.props.requestUpdateCategoriesTranslation(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editCategoriesTrans(values) {
        this.setState({
            isEditing: values
        })
    }

    
    deleteCategoryTrans(categoryTransId) {
        this.props.requestDeleteCategoriesTranslation(categoryTransId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        
        this.props.requestCategoriesTranslation(pageNumber)
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
                            <EditCategoryTrans
                                onSubmit={this.submitEditCategoryTrans.bind(this)}
                                editId={this.state.isEditing} categories={this.props.allCategories} languages={this.props.allLanguages} />
                        ) : (
                                <CategoryTransForm onSubmit={this.submitCategoryTrans.bind(this)} categories={this.props.allCategories} languages={this.props.allLanguages}/>
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
                                    <th>Category</th>
                                    <th>Language</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.categoriesTrans.length ? (
                                <CategoriesTransList
                                    categoriesTrans={this.props.categoriesTrans}
                                    onEditCategoryTrans={this.editCategoriesTrans}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteCategoryTrans={this.props.requestDeleteCategoriesTranslation}
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
        categoriesTrans: store.categoryTransState.categoriesTrans,
        allCategories: store.categoryState.all_categories,
        allLanguages: store.languageState.all_languages,
        fetching: store.categoryTransState.fetching,
        activePage: store.categoryTransState.activePage,
        itemsCountPerPage: store.categoryTransState.itemsCountPerPage,
        totalItemsCount: store.categoryTransState.totalItemsCount,
        pageRangeDisplayed: store.categoryTransState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestAllCategories, requestCategoriesTranslation, requestDeleteCategoriesTranslation, requestAddCategoriesTranslation, requestUpdateCategoriesTranslation, requestAllLanguages })(CategoriesTransListContainer);