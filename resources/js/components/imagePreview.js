import React, {Component} from 'react';
// import Dropzone from 'react-dropzone';

// import React, {useEffect, useState} from 'react';
// import {useDropzone} from 'react-dropzone';

// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 16
// };

// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: 'border-box'
// };

// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   overflow: 'hidden'
// };

// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%'
// };


// function ImagePreviewField(props) {
//   const [files, setFiles] = useState([]);
//   const {getRootProps, getInputProps} = useDropzone({
//     accept: 'image/*',
//     onDrop: acceptedFiles => {
//       console.log(acceptedFiles)
//       setFiles(acceptedFiles.map(file => Object.assign(file, {
//         preview: URL.createObjectURL(file)
//       })));
//       props.input.onChange(acceptedFiles);
//     }
//   });
  
//   const thumbs = files.map(file => (
//     <div style={thumb} key={file.name}>
//       <div style={thumbInner}>
//         <img
//           src={file.preview}
//           style={img}
//         />
//       </div>
//     </div>
//   ));

//   useEffect(() => () => {
//     // Make sure to revoke the data uris to avoid memory leaks
//     files.forEach(file => URL.revokeObjectURL(file.preview));
//   }, [files]);

//   return (
//     <section className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop Image here, or click to select an Image</p>
//       </div>
//       <aside style={thumbsContainer}>
//         {thumbs}
//       </aside>
//     </section>
//   );
// }

// {/* <Previews /> */}
// export default ImagePreviewField;

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
          {this.state.files ? (
            <aside className="preview-img">
              {this.state.files.map((file)=> {
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
export default ImagePreviewField;
