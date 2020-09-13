import React, { Component } from 'react';
import Select from 'react-select';


class AutocompleteField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: undefined,
            loading: false,
            placeholderText: 'Select one...'
        }
    }
    
    handleFocus(itemList) {
            const option = itemList.map((item) => {
                if(item.language) {
                    return {
                        label:item.language, value:item.id
                    }
                } else {
                    return {
                        label:item.slug, value:item.id
                    }
                }
            })
            this.setState({
                options: option,
                placeholderText: 'Type new here...'
            })
        
    }

    handleBlur() {
        this.setState({
            placeholderText: 'Select one...'
        })
    }
    handleChange(newValue) {
        this.setState({ value: newValue });
        if(newValue) {
            this.props.input.onChange(newValue.value)
        } else {
            this.props.input.onChange(null)
        }
    }
       
    render() {
        const { itemList, input, meta: {touched, error}} = this.props
            return (
                <div className="nm-select-field col-md-6">
                    <label className="">{this.props.label}</label>
                    <div className={ touched && error ? "form-control is-invalid": "form-control"}>
                        <Select
                        {...input}
                        className = "nm-select-box"
                        isClearable
                        placeholder={this.state.placeholderText}
                        onFocus={() => this.handleFocus(itemList)}
                        onBlur={() => this.handleBlur()}
                        isDisabled={this.state.loading}
                        isLoading={this.state.loading}
                        onChange={this.handleChange.bind(this)}
                        options={this.state.options}
                        value={this.state.value ? this.state.value : input.value }
                        />
                    </div>
                    <div className="error text-danger">
                        {touched ? error : ''}
                    </div>
                </div>
            )
    }
}

export default AutocompleteField;