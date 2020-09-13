// Insert Vehicle

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import TextEditorField from '../texteditor-field';


const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => {
    return (
        <div className="form-group col-md-12 col-lg-12">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className={ touched && error ? "form-control is-invalid": "form-control"} placeholder={placeholder} {...input} />
            <div className="error text-danger">
                {touched ? error : ''}
            </div>
        </div>
    )
}

let InsertNewsTrans = props => {
    const { handleSubmit } = props

    return (
            <div className="col-md-12 col-xs-12 col-lg-12 col-sm-12">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Translate News</h3>
                    </div>

                    <form onSubmit={handleSubmit} >
                        <div className="card-body">
                            <div className="form-row">
                            <Field name="language_id"
                                label="Choose language"
                                itemList={props.languages}
                                component={AutocompleteField}
                            />
                            <Field name="news_id"
                                label="Select News"
                                itemList={props.news}
                                component={AutocompleteField}
                            />
                            <Field
                                label="Enter Title"
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter Title"
                                component={renderInputField}
                            />
                            <Field
                                label="Enter content"
                                id="content"
                                name="content"
                                component={TextEditorField}
                            />
                            </div>
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

InsertNewsTrans = reduxForm({
    form: 'AddNewsTrans',
    validate
})(InsertNewsTrans);



export default InsertNewsTrans;