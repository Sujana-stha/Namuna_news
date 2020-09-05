import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestProvinces, requestDeleteProvinces, requestAddProvinces, requestUpdateProvinces } from '../../actions/province-action';

//COMPONENT
import ProvinceForm from '../../components/province/province-add';
import EditProvince from '../../components/province/province-edit';
import ProvinceList from '../../components/province/province';
import Loading from '../../components/loading';

class ProvinceListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            
        }
        this.editProvince = this.editProvince.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        this.props.requestProvinces(pageNumber);
        console.log(this.props)

    }

    // submit function for new data
    submitProvince(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddProvinces(values, pageNumber);
    }

    // submit function to update data
    submitEditProvince(values) {
        const pageNumber = this.props.activePage;
        // values.language = values.language.toLowerCase();
        this.props.requestUpdateProvinces(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editProvince(values) {
        this.setState({
            isEditing: values
        })
    }

    deleteProvinceAction(provinceId) {
        this.props.requestDeleteProvinces(provinceId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        
        this.props.requestProvinces(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        console.log('props', this.props)
        return (
            <div className="nm-content">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditProvince
                                onSubmit={this.submitEditProvince.bind(this)}
                                editId={this.state.isEditing} />
                        ) : (
                            <ProvinceForm onSubmit={this.submitProvince.bind(this)} />
                        )}
                    </div>

                    <div className="col-sm-12 col-md-7 col-lg-7">
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
                                    <th>Status</th>
                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            
                            {this.props.provinces.length ? (
                                <ProvinceList
                                    provinces={this.props.provinces}
                                    onEditProvince={this.editProvince}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteProvince={this.props.requestDeleteProvinces}
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.itemsCountPerPage}
                                />
                            ) : (
                                    <tbody>
                                        <tr>
                                            <td >No Results Found !</td>
                                        </tr>
                                    </tbody>
                                )}
                        </table>
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
        );
    }
};

function mapStateToProps(store) {
    return {
        provinces: store.provincesState.provinces,
        fetching: store.languageState.fetching,
        activePage: store.provincesState.activePage,
        itemsCountPerPage: store.provincesState.itemsCountPerPage,
        totalItemsCount: store.provincesState.totalItemsCount,
        pageRangeDisplayed: store.provincesState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestProvinces, requestDeleteProvinces, requestAddProvinces, requestUpdateProvinces })(ProvinceListContainer);