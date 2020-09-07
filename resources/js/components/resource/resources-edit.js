import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as resourceApi from '../../api/resources-api';

class EditResource extends Component {
    componentDidMount() {

        const id = this.props.editId;
        resourceApi.getSingleResources(id).then((response) => {
            const data = response.data.data;
            console.log('data', data)
            this.props.initialize(data);
        })
    }

    renderInputField({ input, id, label, value, type, placeholder, meta: { touched, error } }) {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input value={value} id={id} type={type} className="form-control" placeholder={placeholder} {...input} />
                <div className="error">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderSelectField({ input, label, meta: { touched, error }, defaultValue, children }) {
        return (
            <div className="form-group">
                <label>{label}</label>
                <select value={defaultValue} {...input} className="form-control">
                    {children}
                </select>
                <div className="error">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Edit Resource</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Select Resource Type"
                                name="type"
                                component={this.renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="video">Video</option>
                                <option value="file">File</option>
                            </Field>
                            <Field
                                label="Enter URL"
                                id="url"
                                name="url"
                                value="url"
                                type="text"
                                placeholder="Enter URL"
                                component={this.renderInputField}
                            />
                            <Field
                                label="Select Status"
                                name="status"
                                component={this.renderSelectField}
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
                                value="views"
                                type="number"
                                placeholder="Enter Views"
                                component={this.renderInputField}
                            />
                            <Field
                                label="Enter Keywords"
                                id="keywords"
                                name="keywords"
                                value="keywords"
                                type="text"
                                placeholder="Enter Keywords"
                                component={this.renderInputField}
                            />
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        
        );
    }
}
function validate(values) {
    const errors = {}

    if (!values.type) {
        errors.type = "This field is empty."
    } else if (values.type.length > 100) {
        errors.type = "Must be 100 character or less!"
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'EditResources'
})(EditResource);