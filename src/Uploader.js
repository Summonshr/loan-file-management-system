import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

export default (props) => {
  const onDrop = useCallback(acceptedFiles => {
    var formData = new FormData();
    Object.keys(props.match.params).map(k=>{
        formData.set(k, props.match.params[k])
    })
    acceptedFiles.map((f,i)=>{
        formData.append(`image[${i}]`, f);
    })

    axios.post('upload_file', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }}).then(()=>{
        alert('Successfully uploaded');
    }).catch(()=>{
        alert('Failed')
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  console.log(props)
  return <div className="p-2 w-full">
    <div {...getRootProps()} className="p-2 border border-2 border-red-300 border-dashed w-full flex justify-center flex-wrap items-center h-64">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop here {props.match.params.type}, or click to select files</p>
      }
    </div>
  </div>
}