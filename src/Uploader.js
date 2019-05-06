import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';

const sets = (params,setFiles, files)=>{
	return axios.post('http://localhost:3030/file-list', params).then(response => {
		setFiles({...files,[params.type]:response.data})
	})
}

export default (props) => {

	let [files, setFiles] = useState([]);

	const onDrop = useCallback(acceptedFiles => {
		var formData = new FormData();
		
		Object.keys(props.match.params).map(k => {
			return formData.set(k, props.match.params[k])
		})

		acceptedFiles.map((f, i) => {
			return formData.append(`image[${i}]`, f);
		})

		return axios.post('http://localhost:3030/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(() => {
			alert('Successfully uploaded');
			sets(props.match.params, setFiles, files)
		}).catch(() => {
			alert('Failed')
		})

	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	files = (files[props.match.params.type] || [])

	return <div className="p-2 w-full flex flex-wrap justify-between">
		<div {...getRootProps()} className="p-2 w-2/3 border border-2 cursor-pointer border-red-300 border-dashed flex justify-center flex-wrap items-center h-64">
			<input {...getInputProps()} />
			{
				isDragActive ?
					<p>Drop the files here ...</p> :
					<p>Drag 'n' drop here {props.match.params.type}, or click to select files</p>
			}
		</div>
		<div className={"w-1/3 px-2 w-1/3 px-2" + (files.length > 4 && " h-64 overflow-y-scroll")}>
			<h2 className="bg-gray-200 p-2 w-full flex flex-wrap justify-between"><span>Files</span><a href="#st" className="cursor-pointer" onClick={()=>sets(props.match.params, setFiles, files)}>↻</a></h2>	
			<ul>
				{files.map(f => <li className="p-2 hover:bg-green-100 border-b" key={f}><a rel="noopener noreferrer" target="_blank" href={['http://localhost:3030/files', props.match.params.foracid,props.match.params.type,f].join('/')}>{f}</a></li>)}
			</ul>
		</div>
	</div>
}