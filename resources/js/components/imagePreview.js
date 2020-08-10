import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

// class ImagePreviewField extends Component {
//   constructor(props) {
//     super(props);
//     this.onDrop = (files) => {
//       this.setState({files});
//       this.props.input.onChange(files);
//     };
//     this.state = {
//       files: []
//     };
//   }

//   render() {
//     const files = this.state.files.map(file => (
//       <li key={file.name}>
//         {file.name} - {file.size} bytes
//       </li>
//     ));

//     return (
//       <Dropzone onDrop={this.onDrop}>
//         {({getRootProps, getInputProps}) => (
//           <section className="container">
//             <div {...getRootProps({className: 'dropzone'})}>
//               <input {...getInputProps()} />
//               <p>Drag 'n' drop some files here, or click to select files</p>
//             </div>
//             <aside>
//               <h4>Files</h4>
//               <ul>{files}</ul>
//             </aside>
//           </section>
//         )}
//       </Dropzone>
//     );
//   }
// }

// export default ImagePreviewField;
class ImagePreviewField extends Component {


    onFileChange (e) {
      console.log(e)
      console.log("p", this.props)
      const targetFile = e.target.files[0]
      if (targetFile) {
        // const val = await this.getBase64(targetFile)
        this.props.input.onChange(targetFile)
      } else {
        this.props.input.onChange(null)
      }
    }

    render() {

      return (
        <input
          type="file"
          name="featured_image"
          onChange={this.onFileChange.bind(this)}
        />
      )
    }
}
export default ImagePreviewField;
