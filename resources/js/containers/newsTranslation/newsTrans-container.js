import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import {requestAddNewsTranslation, requestNewsTranslation, requestDeleteNewsTranslation, requestUpdateNewsTranslation} from '../../actions/newsTranslation-action';
import {requestAllLanguages} from '../../actions/languages-action';
import {requestAllNews, addNewsSuccess} from '../../actions/news-action';

//COMPONENTS
import AddNewsTrans from '../../components/newsTranslation/newsTrans-add';
import NewsTransList from '../../components/newsTranslation/newsTrans';
import EditNewsTrans from '../../components/newsTranslation/newsTrans-edit';
import Loading from '../../components/loading'

class NewsTransContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmText: null,
            isEditing: false
        }
        this.deleteItem =  this.deleteItem.bind(this)
        this.hideDiv =  this.hideDiv.bind(this)
        this.editNewsTranslation = this.editNewsTranslation.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    componentDidMount() {
        const pageNumber = this.props.activePage;
        this.props.requestNewsTranslation(pageNumber);
        this.props.requestAllNews();
        this.props.requestAllLanguages();
        this.props.addNewsSuccess();
    }
    //submit News form
    onSubmitForm(values) {
        const pageNumber = this.props.activePage;
        if ( typeof values.news_id == 'number') { values.news_id = values.news_id } else { values.news_id = values.news_id.value }
        let newsValues = null
        this.props.allNews.forEach(news => {
    
            if(news.id == values.news_id) {
                newsValues = news;
            }
        })
        this.props.requestAddNewsTranslation(values,pageNumber, newsValues,);
    }

    // edit functions
    editNewsTranslation(values) {
        this.setState ({
            isEditing : values
        })
    }
    submitEditNewsTrans(values) {
        const pageNumber = this.props.activePage;
        if ( typeof values.language_id =='number') { values.language_id = values.language_id } else { values.language_id = values.language_id.value }
        if ( typeof values.news_id == 'number') { values.news_id = values.news_id } else { values.news_id = values.news_id.value }
         
        this.props.requestUpdateNewsTranslation(values, pageNumber)
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
        
        this.props.requestNewsTranslation(pageNumber)
    }
    hideDiv() {
        this.setState({confirmText: null})
    }
    render() {
        if(this.props.match.path === "/edit-news-translation") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/news-translation" className="add-btn btn btn-primary"><i className="fas fa-list"></i> All Translated News</NavLink>
                        </div>
                        <EditNewsTrans 
                        languages ={this.props.allLanguages}
                        news = {this.props.allNews} 
                        editId= {this.state.isEditing}
                        onSubmit ={this.submitEditNewsTrans.bind(this)}
                        />
                    </div>
                </div>
            )
        } else if(this.props.match.path ==="/add-news-translation") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/news-translation" className="add-btn btn btn-primary"><i className="fas fa-list"></i> All Translated News</NavLink>
                        </div>
                        <AddNewsTrans
                            languages ={this.props.allLanguages}
                            news = {this.props.allNews}
                            onSubmit={this.onSubmitForm.bind(this)}
                            newNews = {this.props.newNews}
                        />
                    </div>  
                </div>
            )
        } else {
            return (
                <div className="nm-content nm-news-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/add-news-translation" className="add-btn right btn btn-primary"><i className="fas fa-plus"></i> Translate News</NavLink>
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
                                    <th className="news-title">News</th>
                                    <th>Language</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {this.props.newsTrans ? (
                                <NewsTransList
                                newsTrans={this.props.newsTrans}
                                onEditNewsTrans = {this.editNewsTranslation} 
                                confirmText={this.state.confirmText} 
                                showConfirmBox={this.deleteItem} 
                                hideConfirmBox={this.hideDiv}
                                deleteNewsTrans = {this.props.requestDeleteNewsTranslation}
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
        newsTrans:store.newsTransState.newsTrans,
        fetching: store.newsTransState.fetching,
        allNews: store.newsState.all_news,
        newNews: store.newsState.newNews,
        allLanguages: store.languageState.all_languages,
        activePage: store.newsTransState.activePage,
        itemsCountPerPage: store.newsTransState.itemsCountPerPage,
        totalItemsCount: store.newsTransState.totalItemsCount,
        pageRangeDisplayed: store.newsTransState.pageRangeDisplayed,
    }
}
export default connect(mapStateToProps, {requestAllNews, requestAddNewsTranslation, requestNewsTranslation, requestDeleteNewsTranslation, requestUpdateNewsTranslation,requestAllLanguages,addNewsSuccess })(NewsTransContainer);