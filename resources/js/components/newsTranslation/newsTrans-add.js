// Insert Vehicle

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutocompleteField from '../autocomplete-field';
import TextEditorField from '../textEditor-field';


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
    if (!values.title) {
        errors.title = "This Field is empty"
    } else if (values.title.length > 100) {
        errors.title = "Must be 100 character or Less!"
    }
    return errors;
}

InsertNewsTrans = reduxForm({
    form: 'AddNewsTrans',
    validate
})(InsertNewsTrans);



export default InsertNewsTrans;