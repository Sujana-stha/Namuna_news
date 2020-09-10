import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className={ touched ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}

const LanguageForm = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Languages</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Enter Language Code"
                                id="language_code"
                                name="code"
                                type="text"
                                placeholder="Enter Language code"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Language"
                                id="language"
                                name="language"
                                type="text"
                                placeholder="Enter Language"
                                component={renderInputField}
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
    form: 'AddLanguages'
})(LanguageForm);