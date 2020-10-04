import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import {requestAllCategories} from '../actions/categories-action'
import {requestAllNews} from '../actions/news-action'
import {requestAllResources} from '../actions/resource-action';
import {requestUsers} from '../actions/users-action';
import {requestSubscription, requestDeleteSubscription} from '../actions/subscriber-action';

import SubscribeList from '../components/subscribers/subscribers';

class Dashboard extends Component {
    constructor() {
        super();
        this.state= {
            confirmText: null
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }
    componentDidMount() {
        this.props.requestAllCategories();
        this.props.requestAllNews();
        this.props.requestAllResources();
        this.props.requestUsers();
        this.props.requestSubscription();
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
        return (
            // Main Content
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Dashboard</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>
                
                {/* small stat boxes */}
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.props.news.length}</h3>
                                <p>News</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-document-text"></i>
                            </div>
                            <NavLink to="/news" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.props.categories.length}</h3>
                                <p>Categories</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            <NavLink to="/categories" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.props.users.length}</h3>

                                <p>Users</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-stalker"></i>
                            </div>
                            <NavLink to="/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{this.props.resources.length}</h3>

                                <p>Resources</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-ios-videocam"></i>
                            </div>
                            <NavLink to="/resources" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                </div>
                {/* end of small stat boxes */}

                {/* list of news and subscribers */}
                <div className="row">
                <section className="col-lg-7">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <i className="fas fa-newspaper mr-1"></i>
                                Lastest News
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="card-body p-0">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>Title</th>
                                        <th>Categories</th>
                                        <th>Images</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.news.slice(0, 5).map((newsList, index)=> {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{newsList.slug == null ? '-': newsList.slug}</td>
                                                <td>{newsList.category.slug}</td>
                                                <td><img src={newsList.featured_image} width="100" /></td>
                                                <td>{newsList.status}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className="col-lg-5">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <i className="fas fa-chart-pie mr-1"></i>
                                Subscribers List
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.props.subscribers.length ? (
                                    <SubscribeList
                                    subscribers={this.props.subscribers}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteSubscriber={this.props.requestDeleteSubscription}
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.itemsCountPerPage}
                                />

                            ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="3">No Results Found !</td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </section>
                </div>
            </div>
        );
    }
}


function mapStateToProps(store) {
    return {
        categories: store.categoryState.all_categories,
        news: store.newsState.all_news,
        users: store.userState.users,
        resources: store.resourceState.all_resources,
        subscribers: store.subscribeState.subscribers,
        activePage: store.subscribeState.activePage,
        itemsCountPerPage: store.subscribeState.itemsCountPerPage
    }
}
export default connect(mapStateToProps,{requestAllCategories,requestAllNews, requestAllResources, requestUsers, requestSubscription, requestDeleteSubscription}) (Dashboard);