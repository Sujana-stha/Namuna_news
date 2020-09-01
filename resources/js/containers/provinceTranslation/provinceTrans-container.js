import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { requestProvincesTranslation, requestDeleteProvincesTranslation, requestAddProvincesTranslation, requestUpdateProvincesTranslation } from '../../actions/provinceTranslation-action';
import {requestProvinces} from '../../actions/province-action';
import {requestLanguages} from '../../actions/languages-action';

//COMPONENT
import ProvinceTransForm from '../../components/provinceTranslation/provinceTrans-add';
import EditProvinceTrans from '../../components/provinceTranslation/provinceTrans-edit';
import ProvincesTransList from '../../components/provinceTranslation/provinceTrans';
import Loading from '../../components/loading';

class ProvincesTransListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            
        }
        this.editProvincesTrans = this.editProvincesTrans.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        // this.toggleStatus = this.toggleStatus.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        const pageNumber = this.props.activePage;
        this.props.requestProvincesTranslation(pageNumber);
        this.props.requestProvinces();
        this.props.requestLanguages();
        console.log(this.props)

    }

    // submit function for new data
    submitProvinceTrans(values) {
        const pageNumber = this.props.activePage;
        
        this.props.requestAddProvincesTranslation(values, pageNumber);
    }

    // submit function to update data
    submitEditProvinceTrans(values) {
        const pageNumber = this.props.activePage;
        this.props.requestUpdateProvincesTranslation(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editProvincesTrans(values) {
        this.setState({
            isEditing: values
        })
    }

    
    deleteProvinceTrans(provinceTransId) {
        this.props.requestDeleteProvincesTranslation(provinceTransId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        
        this.props.requestNews(pageNumber)
    }
    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        console.log('trr', this.props)
        return (
            <div className="nm-content">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditProvinceTrans
                                onSubmit={this.submitEditProvinceTrans.bind(this)}
                                editId={this.state.isEditing} provinces={this.props.provinces} languages={this.props.languages} />
                        ) : (
                                <ProvinceTransForm onSubmit={this.submitProvinceTrans.bind(this)} provinces={this.props.provinces} languages={this.props.languages}/>
                            )}

                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-8">
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
                                    <th>Province</th>
                                    <th>Language</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.provincesTrans.length ? (
                                <ProvincesTransList
                                    provincesTrans={this.props.provincesTrans}
                                    onEditProvinceTrans={this.editProvincesTrans}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteProvinceTrans={this.props.requestDeleteProvincesTranslation}
                                    provinces={this.props.provinces}
                                    languages={this.props.languages}
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
        );
    }
};

function mapStateToProps(store) {
    
    return {
        provincesTrans: store.provinceTransState.provincesTrans,
        provinces: store.provincesState.provinces,
        languages: store.languageState.languages,
        fetching: store.provinceTransState.fetching,
        activePage: store.provinceTransState.activePage,
        itemsCountPerPage: store.provinceTransState.itemsCountPerPage,
        totalItemsCount: store.provinceTransState.totalItemsCount,
        pageRangeDisplayed: store.provinceTransState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestProvincesTranslation, requestDeleteProvincesTranslation, requestAddProvincesTranslation, requestUpdateProvincesTranslation, requestLanguages,requestProvinces })(ProvincesTransListContainer);