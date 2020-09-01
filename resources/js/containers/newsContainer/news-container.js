import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import {requestAddNews, requestNews, requestDeleteNews, requestUpdateNews} from '../../actions/news-action';
import {requestCategories} from '../../actions/categories-action'
import {requestProvinces} from '../../actions/province-action';

//COMPONENTS
import AddNews from '../../components/news/news-add';
import NewsList from '../../components/news/news';
import EditNews from '../../components/news/news-edit';

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
        this.props.requestCategories();
        this.props.requestProvinces();
    }
    //submit News form
    onSubmitForm(values) {
        values.author_id = 1;
        const pageNumber = this.props.activePage;
        
        this.props.requestAddNews(values, pageNumber);
    }

    // edit functions
    editNews(values) {
        console.log('news-id', values)
        this.setState ({
            isEditing : values
        })
    }
    submitEditNews(values) {
        const pageNumber = this.props.activePage;
        
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
        console.log("comp-prop", this.props)
        if(this.props.match.path === "/edit-news") {
            return (
                <EditNews onSubmit={this.submitEditNews.bind(this)} editId= {this.state.isEditing}/>
            )
        } else if(this.props.match.path ==="/add-news") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/news" className="btn btn-primary"><i className="fas fa-list"></i> All News</NavLink>
                        </div>
                        <AddNews
                            categories ={this.props.categories}
                            provinces = {this.props.provinces}
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
                            <NavLink to="/add-news" className="right btn btn-primary"><i className="fas fa-plus"></i> Add News</NavLink>
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
                                    <th>Categories</th>
                                    <th>Province</th>
                                    <th>Author</th>
                                    <th>News Label</th>
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
                                        <td>No Results Found !</td>
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
        categories: store.categoryState.categories,
        provinces: store.provincesState.provinces,
        activePage: store.newsState.activePage,
        itemsCountPerPage: store.newsState.itemsCountPerPage,
        totalItemsCount: store.newsState.totalItemsCount,
        pageRangeDisplayed: store.newsState.pageRangeDisplayed,
    }
}
export default connect(mapStateToProps, {requestAddNews, requestNews, requestDeleteNews, requestUpdateNews, requestCategories, requestProvinces})(NewsContainer);