import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestSubscription, requestDeleteSubscription } from '../../actions/subscriber-action';

//COMPONENT
import SubscribeList from '../../components/subscribers/subscribers';
import Loading from '../../components/loading';

class SubscribeContainer extends Component {
    constructor() {
        super();
        this.state = {
            confirmText: null
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        this.props.requestSubscription(pageNumber);
    }

    deleteSubscribeAction(subscribeId) {
        this.props.requestDeleteSubscription(subscribeId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestSubscription(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        return (
            <div className="nm-content">
                <div className="row">
                    <div className="col-sm-12 col-md-7 col-lg-7">
                        {this.props.fetching ? (
                                <Loading />
                            ) : (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th >Email</th>
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
        subscribers: store.subscribeState.subscribers,
        fetching: store.subscribeState.fetching,
        activePage: store.subscribeState.activePage,
        itemsCountPerPage: store.subscribeState.itemsCountPerPage,
        totalItemsCount: store.subscribeState.totalItemsCount,
        pageRangeDisplayed: store.subscribeState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestSubscription, requestDeleteSubscription })(SubscribeContainer);