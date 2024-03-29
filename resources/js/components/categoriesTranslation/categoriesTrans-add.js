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
            <select value={defaultValue} {...input} className={ touched && error ? "form-control is-invalid": "form-control"}>
                {children}
            </select>
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}



const CategoryTransForm = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Translate Categories</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Select Category"
                                name="category_id"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                {props.categories.map(category => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.slug}</option>
                                    )
                                })}
                            </Field>
                            <Field
                                label="Select Language"
                                name="language_id"
                                component={renderSelectField}
                            >
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
    } else if (values.title.length > 100) {
        errors.title = "Must be 100 character or less!"
    }
    if(!values.language_id) {
        errors.language_id = "You must select a option."
    }
    if(!values.category_id) {
        errors.category_id = "You must select a option."
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'AddCategoriesTrans'
})(CategoryTransForm);