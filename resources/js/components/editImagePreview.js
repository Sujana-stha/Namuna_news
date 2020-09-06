import React, {Component} from 'react';

class EditImagePreviewField extends Component {
    constructor(props) {
        super(props);
        this.state= {
          files: null
        }
      }

    onFileChange (e) {
      console.log(e)
      const targetFile = e.target.files[0]
      if (targetFile) {
        console.log("p", targetFile)
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
      console.log('prop-image', this.props)
      return (
        <div className="nm-uploader">
        <div className="custom-file">
          <input onChange={this.onFileChange.bind(this)} type="file" className="custom-file-input" id="customFile"/>
          <label className="custom-file-label" htmlFor="customFile">Choose file</label>
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