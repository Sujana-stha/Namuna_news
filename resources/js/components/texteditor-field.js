import React, { Component } from 'react';
import {Editor} from '@tinymce/tinymce-react';

class TextEditorField extends Component {
    
    handleEditorChange(e) {
        const content = e.target.getContent()
        if(content != "") {
            this.props.input.onChange(content)
        }
        
    }

    render() {
        const {input, meta: {touched, error} } = this.props
        return (
            <div className="col-sm-12 col-md-12 col-lg-12">
                <label>{this.props.label}</label>
                <Editor
                    apiKey='g0c467hlsp38g1c78ypi8w1vgg3g9khumwetg1udqnideku1'
                    initialValue={input.value == "" ? "": input.value}
                    value ={input.value == "" ? "": input.value}
                    init={{
                        height: 450,
                        plugins: 'advlist link image code help lists wordcount insertdatetime',                        
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect | bullist numlist outdent indent | code | help',
                        branding: false
                    }}
                    onChange={this.handleEditorChange.bind(this)}
                />
                <div className="error text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
}

export default TextEditorField;