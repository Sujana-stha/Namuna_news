// Insert Vehicle

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import ImagePreviewField from '../imagePreview';


const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className={touched && error ? "form-control is-invalid" : "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}


const renderSelectField = ({ input, label, meta: { touched, error }, defaultValue, children }) => {
    return (
        <div className="form-group col-md-6">
            <label>{label}</label>
            <select value={defaultValue} {...input} className={touched && error ? "form-control is-invalid" : "form-control"}>
                {children}
            </select>
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}

let InsertNews = props => {
    const { handleSubmit } = props
    return (
        <div className="col-md-12 col-xs-12 col-lg-12 col-sm-12">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add News</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-row">
                            <Field
                                label="Enter Title"
                                id="title"
                                name="slug"
                                type="text"
                                placeholder="Enter Title"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter Keywords"
                                id="keywords"
                                name="keywords"
                                type="text"
                                placeholder="Enter Keywords"
                                component={renderInputField}
                            />

                            <Field
                                label="Select Status"
                                name="status"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="draft">Draft</option>
                                
                                <option value="hidden">Hidden</option>
                                <option value="deleted">Deleted</option>
                            </Field>
                            <Field name="category_id"
                                label="Select Categories"
                                itemList={props.categories}

                                component={AutocompleteField}
                            />
                            <Field name="province_id"
                                label="Select Provinces"
                                itemList={props.provinces}
                                component={AutocompleteField}
                            />
                            
                            <Field
                                label="Select News Label"
                                name="news_label"
                                component={renderSelectField}
                            >
                                <option value="">Select News Label</option>
                                <option value="normal">Normal</option>
                                <option value="featured">Featured</option>
                                <option value="breaking">Breaking</option>

                            </Field>
                            <div className="col-md-6">
                                <label>Featured Image</label>

                                <Field component={ImagePreviewField} name="featured_image" type="file" />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Add News Content</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
function validate(values) {
    const errors = {}

    if (!values.slug) {
        errors.slug = "This Field is empty"
    } else if (values.slug.length > 500) {
        errors.slug = "Must be 500 character or Less!"
    }
    if (!values.keywords) {
        errors.keywords = "Keywords Field is empty"
    } else if (values.keywords.length > 500) {
        errors.keywords = "Must be 500 character or Less!"
    }
    if (!values.status) {
        errors.status = "You must select a option."
    }
    if (!values.category_id) {
        errors.category_id = "You must select a option."
    }
    if (!values.province_id) {
        errors.province_id = "You must select a option."
    }
    if (!values.featured_image) {
        errors.featured_image = "You must upload a Featured Image!"
    }
    if (!values.news_label) {
        errors.news_label = "You must select a option."
    }
    return errors;
}

InsertNews = reduxForm({
    form: 'AddNews',
    validate
})(InsertNews);



export default InsertNews;
