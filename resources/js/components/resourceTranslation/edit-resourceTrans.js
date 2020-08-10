import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as resourceTransApi from '../../api/resourcesTrans-api';
import AutocompleteField from '../autocomplete-field';

class EditResource extends Component {
    componentDidMount() {

        const id = this.props.editId;
        resourceTransApi.getSingleResourcesTrans(id).then((response) => {
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
            <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Edit Translated Resource</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Select Resource"
                                name="resource_id"
                                component={this.renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                {props.resources.map(resource => {
                                    return (
                                    <option key={resource.id} value={resource.id}>{resource.type}</option>
                                    )
                                })}
                            </Field>
                            <Field name="language_id"
                                label="Choose Languages"
                                itemList={props.languages}
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
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}
function validate(values) {
    const errors = {}

    if (!values.type) {
        errors.type = "This field is empty."
    } else if (values.type.length > 30) {
        errors.type = "Must be 30 character or less!"
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'EditResources'
})(EditResource);