import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import {requestAddNewsTranslation, requestNewsTranslation, requestDeleteNewsTranslation, requestUpdateNewsTranslation} from '../../actions/newsTranslation-action';
import {requestLanguages} from '../../actions/languages-action';
import {requestNews} from '../../actions/news-action';

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
        this.props.requestNews();
        this.props.requestLanguages();
    }
    //submit News form
    onSubmitForm(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddNewsTranslation(values, pageNumber);
    }

    // edit functions
    editNewsTranslation(values) {
        console.log('newsTrans-id', values)
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
        console.log("compii-prop", this.props)
        if(this.props.match.path === "/edit-news-translation") {
            return (
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/news-translation" className="btn btn-primary"><i className="fas fa-list"></i> All Translated News</NavLink>
                        </div>
                        <EditNewsTrans 
                        languages ={this.props.languages}
                        news = {this.props.news} 
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
                            <NavLink to="/news-translation" className="btn btn-primary"><i className="fas fa-list"></i> All Translated News</NavLink>
                        </div>
                        <AddNewsTrans
                            languages ={this.props.languages}
                            news = {this.props.news}
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
                                    <th>News</th>
                                    <th>Language</th>
                                    <th className="news-content">Content</th>
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
        news: store.newsState.news,
        languages: store.languageState.languages,
        activePage: store.newsTransState.activePage,
        itemsCountPerPage: store.newsTransState.itemsCountPerPage,
        totalItemsCount: store.newsTransState.totalItemsCount,
        pageRangeDisplayed: store.newsTransState.pageRangeDisplayed,
    }
}
export default connect(mapStateToProps, {requestNews, requestAddNewsTranslation, requestNewsTranslation, requestDeleteNewsTranslation, requestUpdateNewsTranslation,requestLanguages })(NewsTransContainer);