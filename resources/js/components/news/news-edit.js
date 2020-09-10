import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import EditImagePreviewField from '../editImagePreview';
import { connect } from 'react-redux';
import * as newsApi from '../../api/news-api'
import {requestUpdateNews} from '../../actions/news-action';

class EditNews extends Component {
    componentDidMount() {

        const id = this.props.editId;
        newsApi.getSingleNews(id).then((response) => {
            const data = response.data.data;
            const news =  {
                slug: data.slug,
                category_id: data.category == null ? null : { label: data.category.slug, value: data.category.id },
                province_id: data.province == null ? null : { label: data.province.slug, value: data.province.id },
                status: data.status,
                keywords: data.keywords,
                author: data.author,
                news_label: data.news_label,
                featured_image: data.featured_image,
                id: data.id
            }
            this.props.initialize(news);
        })
    }
    renderInputField({input,id, label, value, type, placeholder, meta: {touched, error}}) {
        return (
            <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <input value={value} id={id} type={type} className={ touched ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
        )
    }
    renderSelectField({ input, label, meta: { touched, error }, defaultValue, children }) {
        return (
            <div className="form-group col-md-6">
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
            <div className="col-md-12 col-xs-12 col-lg-12 col-sm-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Edit News</h3>
                    </div>

                    <form onSubmit={handleSubmit} encType="x-www-form-urlencoded">
                        <div className="card-body">
                            <div className="form-row">
                            <Field
                                label="Enter Title"
                                id="title"
                                name="slug"
                                value="slug"
                                type="text"
                                placeholder="Enter Title"
                                component={this.renderInputField}
                            />
                            <Field
                                label="Enter Keywords"
                                id="keywords"
                                name="keywords"
                                value="keywords"
                                type="text"
                                placeholder="Enter Keywords"
                                component={this.renderInputField}
                            />

                            <Field
                                label="Select Status"
                                name="status"
                                component={this.renderSelectField}
                            >
                                <option value="">Choose your option</option>
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="hidden">Hidden</option>
                                <option value="deleted">Deleted</option>
                            </Field>
                            <Field name="category_id"
                                label="Categories"
                                itemList={this.props.categories}
                                apiName="categories"
                                component={AutocompleteField}
                            />
                            <Field name="province_id"
                                label="Provinces"
                                itemList={this.props.provinces}
                                component={AutocompleteField}
                            />
                            <div className="col-md-6">
                                <label>Featured Image</label>
                                <Field value="featured_image" component={EditImagePreviewField} name="featured_image" type="file" />
                            </div>
                            <Field
                                label="Select News Label"
                                name="news_label"
                                component={this.renderSelectField}
                            >
                                <option value="">Select News Label</option>
                                <option value="normal">Normal</option>
                                <option value="featured">Featured</option>
                                <option value="breaking">Breaking</option>

                            </Field>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
function validate(values) {
    const errors = {}
    console.log('value', values);
    if (!values.slug) {
        errors.slug = "This Field is empty"
    } else if (values.slug.length > 400) {
        errors.slug = "Must be 400 character or Less!"
    }
    return errors;
}
EditNews= reduxForm({
    validate,
    form: 'EditNews'
})(EditNews);



export default EditNews;