import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as provinceApi from '../../api/provinces-api';

class EditProvince extends Component {
    constructor() {
        super();
        this.state = {
            categories: null
        }
    }
    componentDidMount() {

        const id = this.props.editId;
        provinceApi.getSingleProvinces(id).then((response) => {
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
                            <h3 className="card-title">Edit Provinces</h3>
                        </div>

                        <form onSubmit={handleSubmit} >
                            <div className="card-body">
                                <Field
                                    label="Enter Province name"
                                    id="provinces"
                                    name="slug"
                                    type="text"
                                    value="slug"
                                    placeholder="Enter Province name"
                                    component={this.renderInputField}
                                />
                                
                                <Field
                                    label="Select Status0"
                                    name="display_status"
                                    component={this.renderSelectField}
                                >
                                    <option value="">Choose your option</option>
                                    <option value="0">Hide</option>
                                    <option value="1">Show</option>
                                </Field>
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

    if (!values.slug) {
        errors.slug = "This field is empty."
    } else if (values.slug.length > 30) {
        errors.slug = "Must be 30 character or less!"
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'EditCategories'
})(EditProvince);