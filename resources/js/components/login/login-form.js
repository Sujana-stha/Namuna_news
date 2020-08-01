import React from 'react';
import {Field, reduxForm} from 'redux-form';

const renderInputField=({input, id, label, placeholder, type, iconName, meta: {touched, error}})=> {
    return(
        <div className="input-group mb-3">
                <label style={{width: '100%'}}>{label}</label>
                <input id={id} className="form-control" type={type} placeholder={placeholder} {...input}/>
                <div className="input-group-append">
                    <div className="input-group-text">
                        <span className={iconName}></span>
                    </div>
                </div>
                
                <div className="error">
                    {touched ? error: ''}
                </div>
        </div>
    )
}
const LoginForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit}>
            <Field
                name="email"
                type="text"
                iconName="fas fa-envelope"
                placeholder="Email"
                id="email"
                label="Email"
                component={renderInputField}
            />
            <Field
                name="password"
                type="password"
                iconName="fas fa-lock"
                placeholder="Password"
                id="password"
                label="Password"
                component={renderInputField}
            />
            
            <div className="row">
                <div className="col-8">
                    <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">
                            Remember Me
                        </label>
                    </div>
                </div>
                {/* <!-- /.col --> */}
                <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
                {/* <!-- /.col --> */}
            </div>
        </form>
    );
};

function validate(values) {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    } else if (values.email.length > 191) {
        errors.email = "Must be 191 character or less!"
    }
    if(!values.password) {
        errors.password = 'You must enter password'
    } else if(values.password.length > 191) {
        errors.password = "Must be 191 character or less!"
    }

}
export default reduxForm({
    validate,
    form: "LoginForm"
})(LoginForm);
// export default LoginForm;