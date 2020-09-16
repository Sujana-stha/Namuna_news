import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as userApi from '../../api/users-api';

class EditUser extends Component {
    componentDidMount() {

        const id = this.props.editId;
        userApi.getSingleUsers(id).then((response) => {
            console.log(response)
            const data = response.data;
            this.props.initialize(data);
        })
    }

    renderInputField({ input, id, label, value, type, placeholder, meta: { touched, error } }) {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input value={value} id={id} type={type} className={touched && error ? "form-control is-invalid" : "form-control"} placeholder={placeholder} {...input} />
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
                <select value={defaultValue} {...input} className={touched && error ? "form-control is-invalid" : "form-control"}>
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
                            <h3 className="card-title">Edit Users Details</h3>
                        </div>

                        <form className="col s12" onSubmit={handleSubmit} >
                            <div className="card-body">
                                <Field
                                    label="Enter Full Name"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value="name"
                                    placeholder="Enter Full Name"
                                    component={this.renderInputField}
                                />
                                <Field
                                    label="Enter Email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    value="email"
                                    placeholder="Enter Email"
                                    component={this.renderInputField}
                                />
                                
                                <Field
                                    label="Select User Type"
                                    name="user_type"
                                    component={this.renderSelectField}
                                >
                                    <option value="superuser">Super User</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="member">Member</option>
                                </Field>
                                <Field
                                    label="Select Status"
                                    name="status"
                                    component={this.renderSelectField}
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="deleted">Deleted</option>
                                </Field>

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
function validate(values) {
    const errors = {}

    if (!values.name) {
        errors.name = "This field is empty."
    } else if (values.name.length > 200) {
        errors.name = "Must be 200 character or less!"
    }
    if (!values.email) {
        errors.email = 'Email is Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or less!"
    }

    if(!values.status) {
        errors.status = "You must select a option."
    }
    if(!values.user_type) {
        errors.user_type = "You must select a option."
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'EditUsers'
})(EditUser);