import React, { Component } from 'react';
import Select from 'react-select';
// import {requestVehicleAttrCreate} from '../../actions/deals-action';
// import {requestLoggedUser} from '../../actions/users-action';

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
    // componentDidMount() {
    //     this.props.requestLoggedUser();
    // }
    handleFocus(itemList) {
        // const option = Object.keys(itemList).map((item) => ({label:itemList[item], value: item }))
        console.log('items', itemList)
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
        const { itemList, input } = this.props
            return (
                <div className="nm-select-field col-md-6">
                    <label className="">{this.props.label}</label>
                    <div className="">
                        <Select
                        {...input}
                        className="nm-select-box"
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
                </div>
            )
    }
}

export default AutocompleteField;