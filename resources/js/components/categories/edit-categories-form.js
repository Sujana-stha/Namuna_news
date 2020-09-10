import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as categoryApi from '../../api/categories-api';

class EditCategory extends Component {
    componentDidMount() {

        const id = this.props.editId;
        categoryApi.getSingleCategories(id).then((response) => {
            const data = response.data.data;
            console.log('data', data)
            this.props.initialize(data);
        })
    }

    renderInputField({ input, id, label, value, type, placeholder, meta: { touched, error } }) {
        return (
            <div className="form-group">
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
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 col-xs-12 col-lg-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Add Categories</h3>
                        </div>

                        <form className="col s12" onSubmit={handleSubmit} >
                            <div className="card-body">
                                <Field
                                    label="Enter Category"
                                    id="categories"
                                    name="slug"
                                    type="text"
                                    value="slug"
                                    placeholder="Enter Catergory"
                                    component={this.renderInputField}
                                />
                                <Field
                                    label="Select Status"
                                    name="display_status"
                                    component={this.renderSelectField}
                                >
                                    <option value="1">Show</option>
                                    <option value="0">Hide</option>
                                </Field>
                                <Field
                                    label="Select Parent Category"
                                    name="parent_id"
                                    component={this.renderSelectField}
                                >
                                    <option value="">Choose your option</option>
                                    <option value="0">Parent Category</option>
                                    {this.props.categories.map(category => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.slug}</option>
                                        )
                                    })}
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
}
function validate(values) {
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
    form: 'EditCategories'
})(EditCategory);