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



const CategoryForm = props => {
    const { handleSubmit } = props;
    return (
        <div className="row">
            <div className="col-md-12 col-xs-12 col-lg-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Add Categories</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <Field
                                label="Enter Category"
                                id="categories"
                                name="slug"
                                type="text"
                                placeholder="Enter Catergory"
                                component={renderInputField}
                            />
                            <Field
                                label="Select Status"
                                name="display_status"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="0">Hide</option>
                                <option value="1">Show</option>
                            </Field>
                            <Field
                                label="Select Parent Category"
                                name="parent_id"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="0">Parent Category</option>
                                {props.categories.map(category => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.slug}</option>
                                    )
                                })}
                                <option value="show">Show</option>
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
    if (!values.slug) {
        errors.slug = "This field is empty."
    } else if (values.slug.length > 30) {
        errors.slug = "Must be 30 character or less!"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'AddCategories'
})(CategoryForm);