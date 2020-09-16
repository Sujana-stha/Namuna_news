import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import EditImagePreviewField from '../editImagePreview';
import * as newsApi from '../../api/news-api'

class EditNews extends Component {
    constructor(props) {
        super(props);
        this.state= {
            newsData : null,
            display: "block"
        };
        this.hideAlert = this.hideAlert.bind(this);
    }
    componentDidMount() {
        const id = this.props.editId;
        newsApi.getSingleNews(id).then((response) => {
            const data = response.data.data;
            if(data.news_translations.length){
                this.setState({
                    newsData : data
                })
            }
            
            const news =  {
                slug: data.slug,
                category_id: data.category == null ? null : { label: data.category.slug, value: data.category.id },
                province_id: data.province == null ? null : { label: data.province.slug, value: data.province.id },
                status: data.status,
                keywords: data.keywords,
                author: data.author,
                news_label: data.news_label,
                featured_image: data.featured_image,
                id: data.id,
                news_translations: data.news_translations
            }
            this.props.initialize(news);
        })
    }

    //function to close alerts
    hideAlert() {
        this.setState({
            display: "none"
        })
    }

    renderInputField({input,id, label, value, type, placeholder, meta: {touched, error}}) {
        return (
            <div className="form-group col-md-6">
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
            <div className="form-group col-md-6 nm-news-select">
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
            <div className="nm-news-edit col-md-12 col-xs-12 col-lg-12 col-sm-12 ">
                {this.state.newsData == null ? (
                    <div className="alert" style={{display: this.state.display}}>
                        <span className="closebtn" onClick={this.hideAlert}>&times;</span> 
                        <strong>Warning!</strong> This news is not active yet. You must add content or translate this news to activate it!
                    </div>
                ):null }
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
                                {this.state.newsData ? ( 
                                    <option value="active">Active</option>
                                ):
                                    <option className="nm-disabled" disabled value="active">Active</option>
                                
                                }
                                <option value="hidden">Hidden</option>
                                <option value="deleted">Deleted</option>
                            </Field>

                            <Field name="category_id"
                                label="Select Categories"
                                itemList={this.props.categories}
                                apiName="categories"
                                component={AutocompleteField}
                            />
                            <Field name="province_id"
                                label="Select Provinces"
                                itemList={this.props.provinces}
                                component={AutocompleteField}
                            />
                            
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
                            <div className="col-md-6">
                                <label>Featured Image</label>
                                <Field value="featured_image" component={EditImagePreviewField} name="featured_image" type="file" />
                            </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Update</button>
                            {this.state.newsData == null ? (
                                <button type="submit" className="translate-btn btn btn-primary">Add News content</button>
                            ):null}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
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
    if(!values.status) {
        errors.status = "You must select a option."
    }
    if(!values.category_id) {
        errors.category_id = "You must select a option."
    }
    if(!values.province_id) {
        errors.province_id = "You must select a option."
    }
    if (!values.featured_image) {
        errors.featured_image = "You must upload a Featured Image!"
    }
    if(!values.news_label) {
        errors.news_label = "You must select a option."
    }
    return errors;
}
EditNews= reduxForm({
    validate,
    form: 'EditNews'
})(EditNews);



export default EditNews;