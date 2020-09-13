import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import TextEditorField from '../texteditor-field';
import * as newsTransApi from '../../api/newsTrans-api'

class EditNewsTrans extends Component {
    componentDidMount() {

        const id = this.props.editId;
        newsTransApi.getSingleNewsTrans(id).then((response) => {
            const data = response.data.data;
            
            const newsTrans =  {
                title: data.title,
                news_id: data.news == null ? null : { label: data.news.slug, value: data.news.id },
                language_id: data.language == null ? null : { label: data.language.language, value: data.language.id },
                content: data.content,
                id: data.id
            }
            this.props.initialize(newsTrans);
        })
    }
    renderInputField({input,id, label, value, type, placeholder, meta: {touched, error}}) {
        return (
            <div className="form-group col-md-12 col-lg-12 col-sm-12">
            <label htmlFor={id}>{label}</label>
            <input value={value} id={id} type={type} className={ touched && error ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
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
                        <h3 className="card-title">Edit Translated News</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <div className="form-row">
                            <Field name="language_id"
                                label="Choose language"
                                itemList={this.props.languages}
                                component={AutocompleteField}
                            />
                            <Field name="news_id"
                                label="Select News"
                                itemList={this.props.news}
                                component={AutocompleteField}
                            />
                            <Field
                                label="Enter Title"
                                id="title"
                                name="title"
                                value="title"
                                type="text"
                                placeholder="Enter Translated Title"
                                component={this.renderInputField}
                            />
                            <Field
                                label="Enter content"
                                id="content"
                                name="content"
                                value="content"
                                component={TextEditorField}
                            />
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
    if (!values.title) {
        errors.title = "This Field is empty"
    } else if (values.title.length > 500) {
        errors.title = "Must be 500 character or Less!"
    }
    if(!values.language_id) {
        errors.language_id = "You must select a option."
    }
    if(!values.news_id) {
        errors.news_id = "You must select a option."
    }
    if(!values.content) {
        errors.content = "The Content Field is empty."
    }
    return errors;
}
export default reduxForm({
    validate,
    form: 'EditNewsTrans'
})(EditNewsTrans);
