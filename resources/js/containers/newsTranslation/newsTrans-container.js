import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';
import {requestAddNewsTranslation, requestNewsTranslation, requestDeleteNewsTranslation, requestUpdateNewsTranslation} from '../../actions/newsTranslation-action';
import {requestLanguages} from '../../actions/languages-action';
import {requestNews} from '../../actions/news-action';

//COMPONENTS
import AddNewsTrans from '../../components/newsTranslation/newsTrans-add';
import NewsTransList from '../../components/newsTranslation/newsTrans';
import EditNewsTrans from '../../components/newsTranslation/newsTrans-edit';

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
    }
    componentDidMount() {
        this.props.requestNewsTranslation();
        this.props.requestNews();
        this.props.requestLanguages();
    }
    //submit News form
    onSubmitForm(values) {
        this.props.requestAddNewsTranslation(values);
    }

    // edit functions
    editNewsTranslation(values) {
        console.log('newsTrans-id', values)
        this.setState ({
            isEditing : values
        })
    }
    submitEditNewsTrans(values) {
        this.props.requestUpdateNewsTranslation(values)
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
                <div className="nm-content">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <NavLink to="/add-news-translation" className="right btn btn-primary"><i className="fas fa-plus"></i> Translate News</NavLink>
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
                                    <th>News</th>
                                    <th>Language</th>
                                    <th>Content</th>
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
        newsTrans:store.newsTransState.newsTrans,
        fetching: store.newsState.fetching,
        news: store.newsState.news,
        languages: store.languageState.languages
    }
}
export default connect(mapStateToProps, {requestNews, requestAddNewsTranslation, requestNewsTranslation, requestDeleteNewsTranslation, requestUpdateNewsTranslation,requestLanguages })(NewsTransContainer);