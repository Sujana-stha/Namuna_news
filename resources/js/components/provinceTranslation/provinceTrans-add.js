import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className="form-control" placeholder={placeholder} {...input} />
            <div className="error">
                {touched ? error : ''}
            </div>
        </div>
    )
}


const renderSelectField = ({ input, label, meta: { touched, error }, defaultValue, children }) => {
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



const ProvinceTransForm = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Provinces Translation</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            
                            <Field
                                label="Select Province"
                                name="province_id"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="">Choose your option</option>
                                {props.provinces.map(province => {
                                    return (
                                        <option key={province.id} value={province.id}>{province.slug}</option>
                                    )
                                })}
                            </Field>
                            <Field
                                label="Select Language"
                                name="language_id"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                {props.languages.map(language => {
                                    return (
                                        <option key={language.id} value={language.id}>{language.language}</option>
                                    )
                                })}
                            </Field>
                            <Field
                                label="Translated Title"
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Translated Title"
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
    if (!values.title) {
        errors.title = "This field is empty."
    } else if (values.title.length > 30) {
        errors.title = "Must be 30 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'AddProvincesTrans'
})(ProvinceTransForm);