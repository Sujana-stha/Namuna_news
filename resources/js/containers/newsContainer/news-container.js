import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import {requestAddNews, requestNews, requestDeleteNews, requestUpdateNews} from '../../actions/news-action';
import {requestAllCategories} from '../../actions/categories-action'
import {requestAllProvinces} from '../../actions/province-action';

//COMPONENTS
import AddNews from '../../components/news/news-add';
import NewsList from '../../components/news/news';
import EditNews from '../../components/news/news-edit';
import Loading from '../../components/loading';

class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmText: null,
            isEditing: false,
            
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
        this.editNews = this.editNews.bind(this)
    }
    componentDidMount() {
        const pageNumber = this.props.activePage;

        this.props.requestNews(pageNumber);
        this.props.requestAllCategories();
        this.props.requestAllProvinces();
    }
    //submit News form
    onSubmitForm(values) {
        values.author_id = 1;
        const pageNumber = this.props.activePage;
        
        this.props.requestAddNews(values, pageNumber);
    }

    // edit functions
    editNews(values) {
        this.setState ({
            isEditing : values
        })
    }
    submitEditNews(values) {
        const pageNumber = this.props.activePage;
        if ( typeof values.category_id =='number') { values.category_id = values.category_id } else { values.category_id = values.category_id.value }
        if ( typeof values.province_id == 'number') { values.province_id = values.province_id } else { values.province_id = values.province_id.value }

        this.props.requestUpdateNews(values, pageNumber);
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
        
        this.props.requestNews(pageNumber)
    }

    hideDiv() {
        this.setState({confirmText: null})
    }

    render() {
        if(this.props.match.path === "/edit-news") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/news" className="add-btn btn btn-primary"><i className="fas fa-list"></i> All News</NavLink>
                        </div>
                        <EditNews 
                        categories ={this.props.allCategories}
                        provinces = {this.props.allProvinces}
                        editId= {this.state.isEditing}
                        onSubmit={this.submitEditNews.bind(this)}
                        />
                    </div>  
                </div>
            )
        } else if(this.props.match.path ==="/add-news") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/news" className="add-btn btn btn-primary"><i className="fas fa-list"></i> All News</NavLink>
                        </div>
                        <AddNews
                            categories ={this.props.allCategories}
                            provinces = {this.props.allProvinces}
                            onSubmit={this.onSubmitForm.bind(this)}
                        />
                    </div>  
                </div>
            )
        } else {
            return (
                <div className="nm-content nm-news-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/add-news" className="add-btn right btn btn-primary"><i className="fas fa-plus"></i> Add News</NavLink>
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
                                    <th>Categories</th>
                                    <th>Author</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {this.props.news ? (
                                <NewsList
                                news={this.props.news}
                                onEditNews = {this.editNews} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv}
                                deleteNews = {this.props.requestDeleteNews}
                                activePage={this.props.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                />
                            ):(
                                <tbody>
                                    <tr>
                                        <td colSpan="9">No Results Found !</td>
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
        news: store.newsState.news,
        fetching: store.newsState.fetching,
        allCategories: store.categoryState.all_categories,
        allProvinces: store.provincesState.all_provinces,
        activePage: store.newsState.activePage,
        itemsCountPerPage: store.newsState.itemsCountPerPage,
        totalItemsCount: store.newsState.totalItemsCount,
        pageRangeDisplayed: store.newsState.pageRangeDisplayed,
    }
}
export default connect(mapStateToProps, {requestAddNews, requestNews, requestDeleteNews, requestUpdateNews, requestAllCategories, requestAllProvinces})(NewsContainer);