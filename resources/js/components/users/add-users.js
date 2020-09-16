import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group">
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
        <div className="form-group">
            <label>{label}</label>
            <select value={defaultValue} {...input} className={touched && error ? "form-control is-invalid": "form-control"}>
                {children}
            </select>
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}



const AddUser = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Users</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Enter Full Name"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Full Name"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Email"
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter Email"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Password"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                component={renderInputField}
                            />
                            <Field
                                label="Select User Type"
                                name="user_type"
                                component={renderSelectField}
                            >
                                <option value="superuser">Super User</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="member">Member</option>
                            </Field>
                            <Field
                                label="Select Status"
                                name="status"
                                component={renderSelectField}
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

const validate = (values) => {
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

    if(!values.password) {
        errors.password = 'You must have Password'
    } else if(values.password.length > 191) {
        errors.password = "Must be 191 character or less!"
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
    form: 'AddUser'
})(AddUser);