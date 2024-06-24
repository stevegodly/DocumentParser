import { useContext, useState,useEffect } from 'react';
import axios from 'axios'
import {UserContext} from './UserContext'
import Loader from './Scanner'

const UploadModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [document,setDocument]=useState(" ")

  const {setEntities}=useContext(UserContext)

  useEffect(() => {
    if (selectedFile) {
      console.log("selected file:", selectedFile);
      sendDataToServer();
    }
  }, [selectedFile]);

  const fetchEntities = async () => {
    setLoading(true)
    const response = await axios.get("http://127.0.0.1:5000/retrieve");
    const data = response.data;
    console.log("data fetched:",data)
    setEntities(data);
    setLoading(false)
    console.log("entities fetched:",data)
  }

  const sendDataToServer = async () => {
    console.log("sentdataserver")
    setLoading(true)
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      
      const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
    setLoading(false)
  }

  const classifyFile = async (ev) => {
    ev.preventDefault();
    setLoading(true)
    if (!selectedFile) {
        console.error("No file selected");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        const response = await fetch("http://127.0.0.1:5000/classify", {
            method: "POST",
            body: formData
        });
        const result=await response.json();
        setDocument(result)
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
    setLoading(false)
    setShowModal(true)
  }

  const handleFileChange = (event) => {
    console.log("reached filechange")
    setSelectedFile(event.target.files[0])
  };


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-[900px] h-[450px]">
        <div className="flex flex-col justify-evenly items-center mb-1">
          <h2 className="text-xl text-slate-400 font-bold">Upload Documents</h2>
          <p className="text-gray-600 mb-4">Add your Documents for Entity Recognition.</p>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-2 text-md text-gray-600">Drag and drop your files here</p>
          
          <div className="mt-4 flex justify-center space-x-4">
            <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Upload File
              <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>
        <div className="mt-7 flex justify-center space-x-4">
            <button onClick={fetchEntities} className="cursor-pointer bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Fetch Entities
              <input type="file" className="hidden" onChange={handleFileChange}/>
            </button>
            <button onClick={classifyFile} className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Classify Document
              <input type="file" className="hidden" onChange={handleFileChange}/>
            </button>
          </div>

      </div>
    </div>
    
  );
};

export default UploadModal;
