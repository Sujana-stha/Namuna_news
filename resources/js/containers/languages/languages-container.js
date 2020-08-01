import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { requestLanguages, requestDeleteLanguages, requestAddLanguages, requestUpdateLanguages } from '../../actions/languages-action';

//COMPONENT
import LanguageForm from '../../components/languages/languages-form';
import EditLanguage from '../../components/languages/edit-languages-form';
import LanguagesList from '../../components/languages/languages';
import Loading from '../../components/loading';

class LanguagesListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            
        }
        this.editLanguage = this.editLanguage.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        this.props.requestLanguages();
        console.log(this.props)

    }

    // submit function for new data
    submitLanguage(values) {
        
        this.props.requestAddLanguages(values);
    }

    // submit function to update data
    submitEditLanguage(values) {
        
        // values.language = values.language.toLowerCase();
        this.props.requestUpdateLanguages(values);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editLanguage(values) {
        this.setState({
            isEditing: values
        })
    }

    deleteLanguageAction(languageId) {
        this.props.requestDeleteLanguages(languageId);
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
        console.log('props', this.props)
        return (
            <div className="nm-content">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditLanguage
                                onSubmit={this.submitEditLanguage.bind(this)}
                                editId={this.state.isEditing} />
                        ) : (
                                <LanguageForm onSubmit={this.submitLanguage.bind(this)} />
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
                                    <th>Added at</th>
                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            
                            {this.props.languages.length ? (
                                <LanguagesList
                                    languages={this.props.languages}
                                    onEditLanguage={this.editLanguage}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteLanguage={this.props.requestDeleteLanguages}
                                    
                                />

                            ) : (
                                    <tbody>
                                        <tr>
                                            <td >No Results Found !</td>
                                        </tr>
                                    </tbody>
                                )}
                        </table>
                        
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(store) {
    return {
        languages: store.languageState.languages,
        fetching: store.languageState.fetching
    }
}

export default connect(mapStateToProps, { requestLanguages, requestDeleteLanguages, requestAddLanguages, requestUpdateLanguages })(LanguagesListContainer);