// Insert Vehicle

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import TextEditorField from '../textEditor-field';
import ImagePreviewField from '../imagePreview';
import { connect } from 'react-redux';


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

const onFileChange = async (e) => {
    const { input } = this.props
    const targetFile = e.target.files[0]
    if (targetFile) {

      input.onChange(val)
    } else {
      input.onChange(null)
    }
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
                                <option value="active">Active</option>
                                <option value="hidden">Hidden</option>
                                <option value="deleted">Deleted</option>
                            </Field>
                            <Field name="category_id"
                                label="Categories"
                                itemList={props.categories}
                                apiName="categories"
                                component={AutocompleteField}
                            />
                            <Field name="province_id"
                                label="Provinces"
                                itemList={props.provinces}
                                component={AutocompleteField}
                            />
                            {/* <Field name="featured_image"
                                component={ImagePreviewField}
                            /> */}
                            <div>
                                <label>Featured Image</label>
                            
                            <Field component={ImagePreviewField} name="featured_image" type="file" />
                            </div>
                            <Field
                                label="Select News Label"
                                name="news_label"
                                component={renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="featured">Featured</option>
                                <option value="breaking">Breaking</option>
                                
                            </Field>
                            
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
    )

}
function validate(values) {
    const errors = {}
    console.log('value', values);
    if (!values.slug) {
        errors.slug = "This Field is empty"
    } else if (values.slug.length > 300) {
        errors.slug = "Must be 300 character or Less!"
    }
    return errors;
}

InsertNews = reduxForm({
    form: 'AddNews',
    validate
})(InsertNews);



export default InsertNews;
