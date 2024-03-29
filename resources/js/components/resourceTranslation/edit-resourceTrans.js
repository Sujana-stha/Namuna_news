import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as resourceTransApi from '../../api/resourcesTrans-api';
import AutocompleteField from '../autocomplete-field';

class EditResource extends Component {
    componentDidMount() {

        const id = this.props.editId;
        resourceTransApi.getSingleResourcesTrans(id).then((response) => {
            const data = response.data.data;
            const resources = {
                description: data.description,
                title: data.title,
                language_id: data.language == null ? null : { label: data.language.language, value: data.language.id },
                resource_id: data.resource.id,
                id: data.id
            }
            this.props.initialize(resources);
        })
    }

    renderInputField({ input, id, label, value, type, placeholder, meta: { touched, error } }) {
        return (
            <div className="form-group col-md-12 col-lg-12 col-sm-12">
                <label htmlFor={id}>{label}</label>
                <input value={value} id={id} type={type} className={ touched && error ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
                <div className="error text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderSelectField({ input, label, meta: { touched, error }, defaultValue, children }) {
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
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Edit Translated Resource</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <div className="form-row">
                            <Field
                                label="Select Resource"
                                name="resource_id"
                                component={this.renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                {this.props.resources.map(resource => {
                                    return (
                                    <option key={resource.id} value={resource.id}>{resource.type}</option>
                                    )
                                })}
                            </Field>
                            <Field name="language_id"
                                label="Choose Languages"
                                itemList={this.props.languages}
                                component={AutocompleteField}
                            />
                            
                            <Field
                                label="Enter Title"
                                id="title"
                                name="title"
                                value="title"
                                type="text"
                                placeholder="Enter Title"
                                component={this.renderInputField}
                            />
                            
                            <Field
                                label="Enter Description"
                                id="description"
                                name="description"
                                value="description"
                                type="text"
                                placeholder="Enter Description"
                                component={this.renderInputField}
                            />
                            </div>
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

    if (!values.title) {
        errors.title = "This field is empty."
    } else if (values.title.length > 100) {
        errors.title = "Must be 100 character or less!"
    }

    if (!values.description) {
        errors.description = "This field is empty."
    } else if (values.description.length > 500) {
        errors.description = "Must be 500 character or less!"
    }

    if(!values.language_id) {
        errors.language_id = "You must select a option."
    }
    if(!values.resource_id) {
        errors.resource_id = "You must select a option."
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'EditResources'
})(EditResource);