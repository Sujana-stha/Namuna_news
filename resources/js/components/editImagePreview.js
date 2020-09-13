import React, {Component} from 'react';

class EditImagePreviewField extends Component {
    constructor(props) {
        super(props);
        this.state= {
          files: null
        }
      }

    onFileChange (e) {
      const targetFile = e.target.files[0]
      if (targetFile) {
        var files = [targetFile]
        this.setState({
          files: files.map(file=> Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        })
        this.props.input.onChange(targetFile)
      } else {
        this.props.input.onChange(null)
      }
    }

    render() {
      const { meta: {touched, error}} = this.props
      return (
        <div className="nm-uploader">
        <div className="custom-file">
          <input onChange={this.onFileChange.bind(this)} type="file" className={ touched && error? "custom-file-input is-invalid": "custom-file-input"} id="customFile"/>
          <label className="custom-file-label" htmlFor="customFile">Choose file</label>
        </div>
        <div className="error text-danger">
            {touched ? error : ''}
          </div>
          {this.props.input.value ? (
            <aside className="preview-img">
                { typeof this.props.input.value == 'string' ? 
                   
                    <div className="thumbInner">
                        <img src={this.props.input.value} className="thumb-img"/>
                    </div>
                   
                : this.state.files.map((file)=> {
                    return (
                        <div className="thumbInner" key={file.name}>
                            <img src={file.preview} className="thumb-img" />
                        </div>
                    )
                })}
                  
                
            </aside>
          ):null}
          
        
        </div>
      )
    }
}
export default EditImagePreviewField;