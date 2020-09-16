import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as languageApi from '../../api/languages-api';

class EditLanguages extends Component {
    componentDidMount() {
        const id = this.props.editId;
        languageApi.getSingleLanguages(id).then((response)=> {
            const data =  response.data.data;
            this.props.initialize(data);
        })  
    }

    renderInputField({input,id, label, value, type, placeholder, meta: {touched, error}}) {
        return (
            <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input value={value} id={id} type={type} className={ touched && error ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
        )
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Edit Language</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Enter Language Code"
                                id="language_code"
                                name="code"
                                type="text"
                                value="code"
                                placeholder="Enter Language code"
                                component={this.renderInputField}
                            />
                            <Field
                                label="Enter Language"
                                id="language"
                                name="language"
                                type="text"
                                value="language"
                                placeholder="Enter Language"
                                component={this.renderInputField}
                            />

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}


const validate = (values) => {
    const errors = {}
    if (!values.code) {
        errors.code = "This field is empty."
    } else if (values.code.length > 10) {
        errors.code = "Must be 10 character or less!"
    }
    if (!values.language) {
        errors.language = "This field is empty."
    } else if (values.language.length > 30) {
        errors.language = "Must be 30 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'EditLanguages'
})(EditLanguages);