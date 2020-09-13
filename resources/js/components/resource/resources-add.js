import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group col-md-6 col-lg-6">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className={ touched && error ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}

const renderSelectField = ({ input, label, meta: { touched, error }, defaultValue, children }) => {
    return (
        <div className="form-group col-md-6 col-lg-6">
            <label>{label}</label>
            <select value={defaultValue} {...input} className={ touched && error ? "form-control is-invalid": "form-control"}>
                {children}
            </select>
            <div className="error">
                {touched ? error : ''}
            </div>
        </div>
    )
}

const ResourceForm = props => {
    const { handleSubmit } = props;
    return (
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Resource</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <div className="form-row">
                            <Field
                                label="Select Resource Type"
                                name="type"
                                component={renderSelectField}
                            >
                                <option value="video">Video</option>
                                <option value="file">File</option>
                            </Field>
                            <Field
                                label="Enter URL"
                                id="url"
                                name="url"
                                type="text"
                                placeholder="Enter URL"
                                component={renderInputField}
                            />
                            <Field
                                label="Select Status"
                                name="status"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="hidden">Hidden</option>
                                <option value="deleted">Deleted</option>
                            </Field>
                            <Field
                                label="Enter Views"
                                id="views"
                                name="views"
                                type="text"
                                placeholder="Enter Views"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Keywords"
                                id="keywords"
                                name="keywords"
                                type="text"
                                placeholder="Enter Keywords"
                                component={renderInputField}
                            />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

    );

}

const validate = (values) => {
    const errors = {}
    if (!values.url) {
        errors.url = "This field is empty."
    } else if (values.url.length > 200) {
        errors.url = "Must be 200 character or less!"
    }
    if(!values.type) {
        errors.type = "You must select a option."
    }
    if(!values.status) {
        errors.status = "You must select a option."
    }
    if (!values.views) {
        errors.views = "This field is empty."
    } else if (values.views.length > 200) {
        errors.url = "Must be 200 character or less!"
    }
    if (!values.keywords) {
        errors.keywords = "This field is empty."
    } else if (values.keywords.length > 500) {
        errors.url = "Must be 500 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'AddResources'
})(ResourceForm);