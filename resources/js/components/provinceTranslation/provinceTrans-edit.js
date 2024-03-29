import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as provinceTransApi from '../../api/provinceTrans-api';

class EditProvinceTrans extends Component {
    componentDidMount() {

        const id = this.props.editId;
        provinceTransApi.getSingleProvincesTrans(id).then((response) => {
            const data = response.data.data;
            
            const provinceTrans = {
                'id': data.id, 
                'province_id': data.province.id, 
                'language_id': data.language.id, 
                'title': data.title
            }
            this.props.initialize(provinceTrans);
        })
    }

    renderInputField({ input, id, label, value, type, placeholder, meta: { touched, error } }) {
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

    renderSelectField({ input, label, meta: { touched, error }, defaultValue, children }) {
        return (
            <div className="form-group">
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
            <div className="row">
                <div className="col-md-12 col-xs-12 col-lg-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Edit Categories Translation</h3>
                        </div>

                        <form className="col s12" onSubmit={handleSubmit} >

                            <div className="card-body">
                                <Field
                                    label="Select Language"
                                    name="language_id"
                                    component={this.renderSelectField}
                                >
                                    <option value="">Choose your option</option>
                                    {this.props.languages.map(language => {
                                        return (
                                             <option key={language.id} value={language.id}>{language.language}</option>
                                        )
                                    })}
                                </Field>
                                
                                <Field
                                    label="Select Province"
                                    name="province_id"
                                    component={this.renderSelectField}
                                >
                                    <option value="">Choose your option</option>
                                    {this.props.provinces.map(province => {
                                        return (
                                            <option key={province.id} value={province.id}>{province.slug}</option>
                                        )
                                    })}
                                </Field>
                                <Field
                                    label="Enter Title"
                                    id="title"
                                    name="title"
                                    type="text"
                                    value="title"
                                    placeholder="Enter Title"
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

    if (!values.title) {
        errors.title = "This field is empty."
    } else if (values.title.length > 100) {
        errors.title = "Must be 100 character or less!"
    }
    if(!values.language_id) {
        errors.language_id = "You must select a option."
    }
    if(!values.province_id) {
        errors.province_id = "You must select a option."
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'EditProvincesTrans'
})(EditProvinceTrans);